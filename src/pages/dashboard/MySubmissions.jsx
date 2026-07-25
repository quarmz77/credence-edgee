import useProjects from "@/hooks/useProjects";
import { SkillTag } from "@/components/badge/RatingBadge";
import RatingBadge from "@/components/badge/RatingBadge";
import EmptyState from "@/components/common/EmptyState";
import { Building, UploadCloud } from "lucide-react";

const MySubmissions = () => {
  const { myProjects, submissionsLoading } = useProjects();
  const submissions = myProjects.filter(
    (p) => p.status === "Submitted" || p.status === "In Review" || p.status === "Reviewed",
  );

  if (submissionsLoading) {
    return (
      <div className="animate-fade-up">
        <div className="dash-header">
          <h1>My Submissions</h1>
        </div>
        <div style={{ padding: "40px", textAlign: "center", color: "#7a9ec0" }}>
          Loading your submissions...
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>My Submissions</h1>
        <p>Track the status of work you've submitted on Credify.</p>
      </div>

      {submissions.length === 0 ? (
        <EmptyState
          icon={<UploadCloud size={52} />}
          title="No submissions yet"
          description="Submit work on an active Credify project to see it here."
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {submissions.map((p) => (
            <div key={p.id} className="card" style={{ padding: "24px" }}>
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
                  marginBottom: 10,
                }}
              >
                <Building size={12} /> {p.company} {p.submittedAt ? `· Submitted ${p.submittedAt}` : ""}
              </p>
              {p.feedback && (
                <div
                  style={{
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
          ))}
        </div>
      )}
    </div>
  );
};

export default MySubmissions;
