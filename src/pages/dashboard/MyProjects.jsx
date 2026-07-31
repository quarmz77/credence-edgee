import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProjects from "@/hooks/useProjects";
import { SkillTag } from "@/components/badge/RatingBadge";
import RatingBadge from "@/components/badge/RatingBadge";
import EmptyState from "@/components/common/EmptyState";
import Modal from "@/components/common/Modal";
import toast from "react-hot-toast";
import {
  Building,
  Pin,
  UploadCloud,
  Link,
  CalendarClock,
  AlertOctagon,
  Eye,
  FileText,
  Code2,
  Github,
  FolderArchive,
  Clock,
  MapPin,
  Building2,
} from "lucide-react";
import { createSubmission, updateSubmission } from "@/services/submissionService";
import CountdownTimer from "@/components/common/CountdownTimer";

const MyProjects = () => {
  const { myProjects, submissionsLoading } = useProjects();
  const [filter, setFilter] = useState("All");
  const [submitModal, setSubmitModal] = useState(null); // project being submitted
  const [detailsModal, setDetailsModal] = useState(null); // project details & requirements modal
  const [submitForm, setSubmitForm] = useState({
    title: "",
    content: "",
    githubRepoUrl: "",
    zipFileUrl: "",
    zipFileName: "",
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
      zipFileName: project.zipFileName || "",
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

    const hasUrl =
      submitForm.githubRepoUrl.trim() ||
      submitForm.zipFileUrl.trim();

    if (!hasUrl) {
      toast.error("Please provide a GitHub repository URL or a folder/archive link — at least one is required.");
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
          zipFileName: submitForm.zipFileName,
          attachments: attachmentsList,
        });
      } else {
        await createSubmission({
          projectId: submitModal.projectId,
          title: submitForm.title || submitModal.title,
          content: submitForm.content,
          githubRepoUrl: submitForm.githubRepoUrl,
          zipFileUrl: submitForm.zipFileUrl,
          zipFileName: submitForm.zipFileName,
          attachments: attachmentsList,
        });
      }

      toast.success(`Work submitted for "${submitModal.title}" on Credify!`);
      setSubmitModal(null);
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit work. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Helper: is a deadline date in the past?
  const isDeadlinePassed = (deadline) => deadline && new Date() > new Date(deadline);

  // Helper: format deadline for display
  const fmtDeadline = (deadline) =>
    new Date(deadline).toLocaleDateString("en-GB", {
      day: "numeric", month: "short", year: "numeric",
    });

  // Helper: days remaining until deadline
  const daysLeft = (deadline) =>
    Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));

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
        <p>Track your project progress, review requirements, and submit your work.</p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
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
          {shown.map((p) => {
            const past = isDeadlinePassed(p.deadline);
            const left = p.deadline && !past ? daysLeft(p.deadline) : null;

            return (
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
                  {/* Left: info */}
                  <div style={{ flex: 1 }}>
                    {/* Badges row */}
                    <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                      <SkillTag skill={p.skill} />
                      <span className="pill pill-gray">{p.status}</span>
                      {p.rating && <RatingBadge rating={p.rating} />}
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: "'Clash Display', sans-serif",
                        fontSize: 16,
                        fontWeight: 700,
                        marginBottom: 6,
                        color: "#0d1f35",
                      }}
                    >
                      {p.title}
                    </h3>

                    {/* Company */}
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12.5,
                        color: "#7a9ec0",
                        marginBottom: 10,
                      }}
                    >
                      <Building size={12} /> {p.company}
                    </p>

                    {/* Live Countdown Timer */}
                    <div style={{ marginBottom: p.feedback ? 10 : 0 }}>
                      <CountdownTimer
                        deadline={p.deadline}
                        createdAt={p.createdAt}
                        duration={p.duration}
                      />
                    </div>

                    {/* Reviewer feedback */}
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
                        <strong>Feedback:</strong> {p.feedback}
                      </div>
                    )}
                  </div>

                  {/* Right: action buttons */}
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => setDetailsModal(p)}
                      style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
                    >
                      <Eye size={13} /> View Requirements
                    </button>

                    {p.status === "In Progress" && (
                      past ? (
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "6px 12px",
                            background: "#fee2e2",
                            color: "#991b1b",
                            borderRadius: 8,
                            fontSize: 12.5,
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}
                        >
                          <AlertOctagon size={13} /> Deadline Passed
                        </div>
                      ) : (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => openSubmitModal(p)}
                        >
                          <UploadCloud size={14} /> Submit Work →
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Project Details & Requirements Modal */}
      <Modal
        isOpen={!!detailsModal}
        onClose={() => setDetailsModal(null)}
        title="Project Details & Requirements"
        size="md"
      >
        {detailsModal && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Badges */}
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <SkillTag skill={detailsModal.skill} />
              <span className="pill pill-gray">{detailsModal.status}</span>
              {detailsModal.deadline && (
                <span
                  style={{
                    fontSize: 11.5,
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: 20,
                    background: "#f0f9ff",
                    color: "#0369a1",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <CalendarClock size={11} />
                  Deadline: {fmtDeadline(detailsModal.deadline)}
                </span>
              )}
            </div>

            {/* Title & Metadata */}
            <div>
              <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 20, fontWeight: 700, color: "#0d1f35", marginBottom: 8 }}>
                {detailsModal.title}
              </h2>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 13, color: "#7a9ec0" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Building2 size={14} /> {detailsModal.company}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Clock size={14} /> {detailsModal.duration}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <MapPin size={14} /> {detailsModal.type}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#0d1f35", marginBottom: 6 }}>Description</h4>
              <p style={{ fontSize: 14, color: "#4a6080", lineHeight: 1.6 }}>
                {detailsModal.description}
              </p>
            </div>

            {/* Instructions */}
            {detailsModal.instructions && (
              <div style={{ background: "#f8faff", border: "1px solid #e1ecf8", borderRadius: 10, padding: "16px" }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "#0d1f35", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  <FileText size={15} style={{ color: "#1565c0" }} /> Project Requirements & Instructions
                </h4>
                <div style={{ fontSize: 13.5, color: "#2a4a6a", lineHeight: 1.65, whiteSpace: "pre-line" }}>
                  {detailsModal.instructions}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 8 }}>
              <button className="btn btn-outline btn-sm" onClick={() => setDetailsModal(null)}>
                Close
              </button>
              {detailsModal.status === "In Progress" && !isDeadlinePassed(detailsModal.deadline) && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    const p = detailsModal;
                    setDetailsModal(null);
                    openSubmitModal(p);
                  }}
                >
                  <UploadCloud size={14} /> Submit Work →
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Submit Work Modal */}
      <Modal
        isOpen={!!submitModal}
        onClose={() => setSubmitModal(null)}
        title="Submit Your Project Work"
        size="md"
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
              {submitting ? "Submitting Work..." : "Confirm & Submit Work →"}
            </button>
          </>
        }
      >
        {submitModal && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <p style={{ fontSize: 14, color: "#4a6080" }}>
              Submitting work for <strong>{submitModal.title}</strong>.
            </p>

            {/* Deadline notice in modal */}
            {submitModal.deadline && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  padding: "10px 12px",
                  background: "#fef9c3",
                  border: "1px solid #fde68a",
                  borderRadius: 8,
                  fontSize: 13,
                  color: "#854d0e",
                }}
              >
                <CalendarClock size={14} style={{ marginTop: 1, flexShrink: 0 }} />
                <span>
                  <strong>Submission Cutoff:</strong> {fmtDeadline(submitModal.deadline)}
                </span>
              </div>
            )}

            {/* Instruction Banner */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "12px 14px",
                background: "#f0f9ff",
                border: "1px solid #bae6fd",
                borderRadius: 8,
                fontSize: 13,
                color: "#0369a1",
              }}
            >
              <Link size={16} style={{ marginTop: 2, flexShrink: 0 }} />
              <div style={{ lineHeight: 1.5 }}>
                <strong>Submission Requirement:</strong> You must provide either a <strong>GitHub Repository URL</strong> or a <strong>Folder/Archive Download Link</strong> (Google Drive, Dropbox, OneDrive, etc.) so your reviewer can inspect your project.
              </div>
            </div>

            {/* GitHub Repo Field */}
            <div className="form-group">
              <label className="form-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Github size={14} />
                GitHub Repository URL
                <span
                  style={{
                    marginLeft: 6,
                    fontSize: 10,
                    fontWeight: 700,
                    background: "#fee2e2",
                    color: "#991b1b",
                    padding: "1px 6px",
                    borderRadius: 4,
                  }}
                >
                  REQUIRED (or Folder link)
                </span>
              </label>
              <input
                className="form-input"
                value={submitForm.githubRepoUrl}
                onChange={(e) => setSubmitForm((f) => ({ ...f, githubRepoUrl: e.target.value }))}
                placeholder="https://github.com/username/repository-name"
              />
            </div>

            {/* Folder / Archive URL or Local File Upload Field */}
            <div className="form-group">
              <label className="form-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <FolderArchive size={14} />
                Folder / Archive Upload (Link or File)
                <span
                  style={{
                    marginLeft: 6,
                    fontSize: 10,
                    fontWeight: 700,
                    background: "#fee2e2",
                    color: "#991b1b",
                    padding: "1px 6px",
                    borderRadius: 4,
                  }}
                >
                  REQUIRED (or GitHub link)
                </span>
              </label>

              {/* Cloud Share Link Input */}
              <input
                className="form-input"
                style={{ marginBottom: 8 }}
                value={submitForm.zipFileUrl}
                onChange={(e) => setSubmitForm((f) => ({ ...f, zipFileUrl: e.target.value }))}
                placeholder="Paste cloud link (e.g. https://drive.google.com/... or https://dropbox.com/...)"
              />

              {/* Local File Picker Fallback */}
              <div
                style={{
                  border: "1px dashed #cbd5e1",
                  borderRadius: 8,
                  padding: "10px 14px",
                  background: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div style={{ fontSize: 12.5, color: "#64748b" }}>
                  {submitForm.zipFileName ? (
                    <span style={{ color: "#0f766e", fontWeight: 600 }}>
                      Selected file: {submitForm.zipFileName}
                    </span>
                  ) : (
                    "Or upload a local file (.zip, .rar, .7z, .pdf)"
                  )}
                </div>
                <input
                  type="file"
                  id="archiveFileInput"
                  accept=".zip,.rar,.7z,.tar,.gz,.pdf"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (uploadEv) => {
                        setSubmitForm((f) => ({
                          ...f,
                          zipFileUrl: uploadEv.target.result,
                          zipFileName: file.name,
                        }));
                        toast.success(`Attached local file: ${file.name}`);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-outline"
                  onClick={() => document.getElementById("archiveFileInput")?.click()}
                  style={{ fontSize: 12, padding: "4px 10px" }}
                >
                  Browse File
                </button>
              </div>
            </div>

            {/* Submission Title */}
            <div className="form-group">
              <label className="form-label">Submission Title (optional)</label>
              <input
                className="form-input"
                value={submitForm.title}
                onChange={(e) => setSubmitForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Final Submission v1.0"
              />
            </div>

            {/* Work Summary / Description */}
            <div className="form-group">
              <label className="form-label">Work Summary / Notes for Reviewer</label>
              <textarea
                className="form-input"
                rows={3}
                value={submitForm.content}
                onChange={(e) => setSubmitForm((f) => ({ ...f, content: e.target.value }))}
                placeholder="Describe what you built, key technical decisions, setup instructions..."
                style={{ resize: "vertical" }}
              />
            </div>

            {/* Additional Attachments */}
            <div className="form-group">
              <label className="form-label">Additional Links / Attachments (comma-separated)</label>
              <input
                className="form-input"
                value={submitForm.attachments}
                onChange={(e) => setSubmitForm((f) => ({ ...f, attachments: e.target.value }))}
                placeholder="https://my-live-demo.vercel.app, https://figma.com/file/..."
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyProjects;
