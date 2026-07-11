import { useEffect, useState } from "react";
import { SkillTag } from "@/components/badge/RatingBadge";
import RatingBadge from "@/components/badge/RatingBadge";
import { User, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { getRatings, deleteRating } from "@/services/adminService";

const RatingsManager = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getRatings();
        // data may be { ratings: [...] } or an array directly
        setRatings(Array.isArray(data) ? data : data.ratings ?? []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load ratings");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteRating(id);
      setRatings((rs) => rs.filter((r) => r._id !== id));
      toast.success("Rating deleted.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Ratings Manager</h1>
        <p>View and remove all issued Credify ratings.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {loading ? (
          <div style={{ padding: 32, textAlign: "center", color: "#4a6080" }}>
            Loading ratings...
          </div>
        ) : ratings.length === 0 ? (
          <div style={{ padding: 32, textAlign: "center", color: "#4a6080" }}>
            No ratings found.
          </div>
        ) : (
          ratings.map((r) => (
            <div
              key={r._id}
              className="card"
              style={{
                padding: "22px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <SkillTag skill={r.submissionId?.skill ?? r.skill} />
                  <RatingBadge rating={r.rating} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Clash Display',sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  {r.submissionId?.title ?? r.project ?? "—"}
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
                  <User size={12} />
                  {r.userId?.name ?? r.student ?? "—"}
                </p>
              </div>
              <button
                className="btn btn-sm"
                style={{
                  background: "#fee2e2",
                  color: "#991b1b",
                  border: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
                onClick={() => handleDelete(r._id)}
              >
                <Trash2 size={13} /> Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RatingsManager;
