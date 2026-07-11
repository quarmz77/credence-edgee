import { useEffect, useState } from "react";
import { SkillTag } from "@/components/badge/RatingBadge";
import ProjectStatusBadge from "@/components/project/ProjectStatusBadge";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, Building2, Trash2 } from "lucide-react";
import { getProjects, updateProjectApproval, deleteProject } from "@/services/adminService";

const pillMap = {
  pending: "pill-yellow",
  approved: "pill-green",
  rejected: "pill-red",
};

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");

  const load = async (status) => {
    setLoading(true);
    try {
      const data = await getProjects(status === "all" ? undefined : status);
      // backend returns array directly (not wrapped in { projects })
      const list = Array.isArray(data) ? data : (data?.projects ?? []);
      setProjects(list);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(filter);
  }, [filter]);

  const setApproval = async (id, approvalStatus) => {
    try {
      await updateProjectApproval(id, approvalStatus);
      setProjects((ps) =>
        ps.map((p) => (getId(p) === id ? { ...p, approvalStatus } : p)),
      );
      approvalStatus === "approved"
        ? toast.success("Project approved and live on Credify!")
        : toast.error("Project rejected.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project permanently?")) return;
    try {
      await deleteProject(id);
      setProjects((ps) => ps.filter((p) => getId(p) !== id));
      toast.success("Project deleted.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  const getId = (p) => p.id || p._id;

  const FILTERS = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "all", label: "All" },
  ];

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Manage Credify Projects</h1>
        <p>Review and approve company-submitted projects.</p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`btn btn-sm ${filter === f.value ? "btn-primary" : "btn-outline"}`}
            style={{ borderRadius: 20 }}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {loading ? (
          <div style={{ padding: 32, textAlign: "center", color: "#4a6080" }}>
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div style={{ padding: 32, textAlign: "center", color: "#4a6080" }}>
            No {filter !== "all" ? filter : ""} projects found.
          </div>
        ) : (
          projects.map((p) => (
            <div
              key={getId(p)}
              className="card"
              style={{
                padding: "22px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                  <SkillTag skill={p.skill || p.techStack?.[0] || "General"} />
                  <ProjectStatusBadge status={p.status} />
                  <span className={`pill ${pillMap[p.approvalStatus] || "pill-yellow"}`}>
                    {p.approvalStatus || "pending"}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Clash Display',sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {p.title}
                </h3>
                {p.description && (
                  <p style={{ fontSize: 13, color: "#4a6080", marginBottom: 6, lineHeight: 1.5 }}>
                    {p.description.length > 120 ? p.description.slice(0, 120) + "…" : p.description}
                  </p>
                )}
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12.5,
                    color: "#7a9ec0",
                  }}
                >
                  <Building2 size={12} /> {p.company || "—"}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                {p.approvalStatus === "pending" && (
                  <>
                    <button
                      className="btn btn-sm"
                      style={{ background: "#dcfce7", color: "#166534", border: "none" }}
                      onClick={() => setApproval(getId(p), "approved")}
                    >
                      <CheckCircle size={13} /> Approve
                    </button>
                    <button
                      className="btn btn-sm"
                      style={{ background: "#fee2e2", color: "#991b1b", border: "none" }}
                      onClick={() => setApproval(getId(p), "rejected")}
                    >
                      <XCircle size={13} /> Reject
                    </button>
                  </>
                )}
                <button
                  className="btn btn-sm"
                  style={{ background: "#f1f5f9", color: "#64748b", border: "none" }}
                  onClick={() => handleDelete(getId(p))}
                  title="Delete project"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageProjects;
