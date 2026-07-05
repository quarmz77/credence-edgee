import { useNavigate } from "react-router-dom";
import { SkillTag } from "@/components/badge/RatingBadge";
import ProjectStatusBadge from "@/components/project/ProjectStatusBadge";
import useProjects from "@/hooks/useProjects";
import { Plus } from "lucide-react";

const CompanyProjects = () => {
  const nav = useNavigate();
  const { projects } = useProjects();
  const companyProjects = projects.slice(0, 4);

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
        {companyProjects.map((p) => (
          <div key={p.id} className="card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <SkillTag skill={p.skill} />
              <ProjectStatusBadge status={p.status} />
              <span className="pill pill-yellow">Pending Approval</span>
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
            <p style={{ fontSize: 13.5, color: "#4a6080" }}>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyProjects;
