import { useEffect, useState } from "react";
import { SkillTag } from "@/components/badge/RatingBadge";
import ProjectStatusBadge from "@/components/project/ProjectStatusBadge";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, Building2 } from "lucide-react";
import { getProjects, updateProjectApproval } from "@/services/adminService";

const pillMap = {
  pending: "pill-yellow",
  approved: "pill-green",
  rejected: "pill-red",
};

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { projects } = await getProjects();
        setProjects(projects);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const setApproval = async (id, approvalStatus) => {
    try {
      await updateProjectApproval(id, approvalStatus);
      setProjects((ps) =>
        ps.map((p) => (p._id === id ? { ...p, approvalStatus } : p)),
      );
      approvalStatus === "approved"
        ? toast.success("Project approved and live on Credify!")
        : toast.error("Project rejected.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Manage Credify Projects</h1>
        <p>Review and approve company-submitted projects.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {loading ? (
          <div style={{ padding: 32, textAlign: "center", color: "#4a6080" }}>
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div style={{ padding: 32, textAlign: "center", color: "#4a6080" }}>
            No projects found.
          </div>
        ) : (
          projects.map((p) => (
            <div
              key={p._id}
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
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <SkillTag skill={p.skill} />
                  <ProjectStatusBadge status={p.status} />
                  <span className={`pill ${pillMap[p.approvalStatus]}`}>
                    {p.approvalStatus}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Clash Display',sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
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
                  }}
                >
                  <Building2 size={12} /> {p.company}
                </p>
              </div>
              {p.approvalStatus === "pending" && (
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className="btn btn-sm"
                    style={{
                      background: "#dcfce7",
                      color: "#166534",
                      border: "none",
                    }}
                    onClick={() => setApproval(p._id, "approved")}
                  >
                    <CheckCircle size={13} /> Approve
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{
                      background: "#fee2e2",
                      color: "#991b1b",
                      border: "none",
                    }}
                    onClick={() => setApproval(p._id, "rejected")}
                  >
                    <XCircle size={13} />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageProjects;
