import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProjects from "@/hooks/useProjects";
import { SkillTag } from "@/components/badge/RatingBadge";
import RatingBadge from "@/components/badge/RatingBadge";
import EmptyState from "@/components/common/EmptyState";
import Modal from "@/components/common/Modal";
import toast from "react-hot-toast";
import { Building, Pin, UploadCloud } from "lucide-react";
import { createSubmission, updateSubmission } from "@/services/submissionService";

const MyProjects = () => {
  const { myProjects, submissionsLoading, setMyProjects } = useProjects();
  const [filter, setFilter] = useState("All");
  const [submitModal, setSubmitModal] = useState(null); // project to submit
  const [submitForm, setSubmitForm] = useState({
    title: "",
    content: "",
    githubRepoUrl: "",
    zipFileUrl: "",
    attachments: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const nav = useNavigate();

  const filters = ["All", "In Progress", "Submitted", "In Review", "Reviewed"];
  const shown =
    filter === "All"
      ? myProjects
      : myProjects.filter((p) => p.status === filter);

  const openSubmitModal = (project) => {
    setSubmitForm({
      title: project.title,
      content: project.content || "",
      githubRepoUrl: project.githubRepoUrl || "",
      zipFileUrl: project.zipFileUrl || "",
      attachments: (project.attachments || []).join(", "),
    });
    setSubmitModal(project);
  };

  const handleSubmit = async () => {
    if (!submitModal) return;
    if (!submitModal.projectId) {
      toast.error("Cannot submit — project ID is missing. Please reload the page.");
      return;
    }

    const hasWorkProvided =
      submitForm.content.trim() ||
      submitForm.githubRepoUrl.trim() ||
      submitForm.zipFileUrl.trim();

    if (!hasWorkProvided) {
      toast.error("Please provide a description, GitHub repo, or zip folder link before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const attachmentsList = submitForm.attachments
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean);

      if (submitModal.submissionId) {
        await updateSubmission(submitModal.submissionId, {
          title: submitForm.title || submitModal.title,
          content: submitForm.content,
          githubRepoUrl: submitForm.githubRepoUrl,
          zipFileUrl: submitForm.zipFileUrl,
          attachments: attachmentsList,
        });
      } else {
        await createSubmission({
          projectId: submitModal.projectId,
          title: submitForm.title || submitModal.title,
          content: submitForm.content,
          githubRepoUrl: submitForm.githubRepoUrl,
          zipFileUrl: submitForm.zipFileUrl,
          attachments: attachmentsList,
        });
      }

      toast.success(`Work submitted for "${submitModal.title}" on Credify!`);
      setSubmitModal(null);
      // Refresh submissions by reloading the page data
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit work. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submissionsLoading) {
    return (
      <div className="animate-fade-up">
        <div className="dash-header">
          <h1>My Credify Projects</h1>
        </div>
        <div style={{ padding: "40px", textAlign: "center", color: "#7a9ec0" }}>
          Loading your projects...
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>My Credify Projects</h1>
        <p>
          Track your project progress and reviewer feedback. All private to you.
        </p>
      </div>

      <div
        style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}
      >
        {filters.map((f) => (
          <button
            key={f}
            className={`btn btn-sm ${filter === f ? "btn-primary" : "btn-outline"}`}
            onClick={() => setFilter(f)}
            style={{ borderRadius: 20 }}
          >
            {f}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <EmptyState
          icon={<Pin size={52} />}
          title="No projects here"
          description="Browse the Credify project board to get started."
          action={
            <button
              className="btn btn-primary btn-sm"
              onClick={() => nav("/projects")}
            >
              Browse Projects →
            </button>
          }
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {shown.map((p) => (
            <div key={p.id} className="card" style={{ padding: "24px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      marginBottom: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <SkillTag skill={p.skill} />
                    <span className="pill pill-gray">{p.status}</span>
                    {p.rating && <RatingBadge rating={p.rating} />}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Clash Display',sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      marginBottom: 6,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 12.5,
                      color: "#7a9ec0",
                      marginBottom: p.feedback ? 10 : 0,
                    }}
                  >
                    <Building size={12} /> {p.company}
                  </p>
                  {p.feedback && (
                    <div
                      style={{
                        marginTop: 10,
                        padding: "10px 12px",
                        background: "#f0fdf4",
                        borderRadius: 8,
                        borderLeft: "3px solid #0d7a52",
                        fontSize: 13,
                        color: "#166534",
                      }}
                    >
                      {p.feedback}
                    </div>
                  )}
                </div>
                {p.status === "In Progress" && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => openSubmitModal(p)}
                  >
                    <UploadCloud size={14} /> Submit Work →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submit Work Modal */}
      <Modal
        isOpen={!!submitModal}
        onClose={() => setSubmitModal(null)}
        title="Submit Your Work"
        size="sm"
        footer={
          <>
            <button
              className="btn btn-outline"
              onClick={() => setSubmitModal(null)}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Work →"}
            </button>
          </>
        }
      >
        {submitModal && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontSize: 14, color: "#4a6080" }}>
              Submitting work for <strong>{submitModal.title}</strong>.
            </p>
            <div className="form-group">
              <label className="form-label">Submission Title</label>
              <input
                className="form-input"
                value={submitForm.title}
                onChange={(e) => setSubmitForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Brief title for your submission"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description / Work Summary *</label>
              <textarea
                className="form-input"
                rows={4}
                value={submitForm.content}
                onChange={(e) => setSubmitForm((f) => ({ ...f, content: e.target.value }))}
                placeholder="Describe what you built, key decisions, and any notes for the reviewer..."
                style={{ resize: "vertical" }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">GitHub Repository URL</label>
              <input
                className="form-input"
                value={submitForm.githubRepoUrl}
                onChange={(e) => setSubmitForm((f) => ({ ...f, githubRepoUrl: e.target.value }))}
                placeholder="https://github.com/username/repo"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Zip Folder / Archive URL</label>
              <input
                className="form-input"
                value={submitForm.zipFileUrl}
                onChange={(e) => setSubmitForm((f) => ({ ...f, zipFileUrl: e.target.value }))}
                placeholder="https://drive.google.com/... or https://dropbox.com/..."
              />
            </div>
            <div className="form-group">
              <label className="form-label">Additional Links / Attachments (comma-separated)</label>
              <input
                className="form-input"
                value={submitForm.attachments}
                onChange={(e) => setSubmitForm((f) => ({ ...f, attachments: e.target.value }))}
                placeholder="https://example.com/demo, https://docs.example.com/..."
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyProjects;
