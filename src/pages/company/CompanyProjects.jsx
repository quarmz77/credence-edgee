import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SkillTag } from "@/components/badge/RatingBadge";
import ProjectStatusBadge from "@/components/project/ProjectStatusBadge";
import useAuth from "@/hooks/useAuth";
import { getProjects } from "@/services/projectService";
import { Plus, Clock, MapPin } from "lucide-react";
import toast from "react-hot-toast";

const pillMap = {
  pending: { bg: "#fef9c3", color: "#854d0e", label: "Pending Approval" },
  approved: { bg: "#dcfce7", color: "#166534", label: "Approved" },
  rejected: { bg: "#fee2e2", color: "#991b1b", label: "Rejected" },
};

const CompanyProjects = () => {
  const nav = useNavigate();
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    const load = async () => {
      try {
        // Fetch only this company's projects
        const res = await getProjects({ ownerId: user.id });
        const items = res?.data?.data?.items ?? [];
        setProjects(items);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.id]);

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1>My Credify Projects</h1>
            <p>Manage all your posted projects.</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => nav("/company/projects/add")}
          >
            <Plus size={15} /> Add Project
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {loading ? (
          <div style={{ padding: 32, textAlign: "center", color: "#4a6080" }}>
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="card" style={{ padding: 32, textAlign: "center", color: "#4a6080" }}>
            <p style={{ marginBottom: 16 }}>No projects yet. Add your first project to get started.</p>
            <button className="btn btn-primary btn-sm" onClick={() => nav("/company/projects/add")}>
              <Plus size={14} /> Add Project
            </button>
          </div>
        ) : (
          projects.map((p) => {
            const approval = pillMap[p.approvalStatus] || pillMap.pending;
            return (
              <div key={p.id || p._id} className="card" style={{ padding: "24px" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                  <SkillTag skill={p.skill || p.techStack?.[0] || "General"} />
                  <ProjectStatusBadge status={p.status} />
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "2px 10px",
                      borderRadius: 20,
                      background: approval.bg,
                      color: approval.color,
                    }}
                  >
                    {approval.label}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Clash Display',sans-serif",
                    fontSize: 17,
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: 13.5, color: "#4a6080", marginBottom: 10 }}>{p.description}</p>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  {p.duration && (
                    <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "#7a9ec0" }}>
                      <Clock size={13} /> {p.duration}
                    </span>
                  )}
                  {p.type && (
                    <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "#7a9ec0" }}>
                      <MapPin size={13} /> {p.type}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CompanyProjects;
