import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    university: user?.university || "",
    programme: user?.programme || "",
    companyName: user?.companyName || "",
    location: user?.location || "",
    phone: user?.phone || "",
    email: user?.email || "",
    industry: user?.industry || "",
    description: user?.description || "",
  });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUser(form);
      toast.success("Credify profile updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>My Credify Profile</h1>
        <p>Keep your profile up to date.</p>
      </div>

      <div
        className="card"
        style={{
          padding: "28px",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#0f3460,#0d7a52)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Clash Display',sans-serif",
            fontWeight: 800,
            fontSize: 30,
            color: "#fff",
          }}
        >
          {user?.name?.charAt(0)}
        </div>
        <div style={{ flex: 1 }}>
          <h2
            style={{
              fontFamily: "'Clash Display',sans-serif",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {user?.name}
          </h2>
          <p style={{ fontSize: 14, color: "#4a6080" }}>{user?.email}</p>
          <span
            className="pill pill-blue"
            style={{
              textTransform: "capitalize",
              marginTop: 6,
              display: "inline-block",
            }}
          >
            {user?.role}
          </span>
        </div>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving…" : "Save Changes"}
        </button>
      </div>

      <div
        className="card"
        style={{
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div className="grid-2" style={{ gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              value={form.name}
              onChange={set("name")}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              className="form-input"
              value={form.location}
              onChange={set("location")}
              placeholder="e.g. Accra, Ghana"
            />
          </div>
        </div>
        <div className="grid-2" style={{ gap: 16 }}>
          <div className="form-group">
            <label className="form-label">University</label>
            <input
              className="form-input"
              value={form.university}
              onChange={set("university")}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Programme</label>
            <input
              className="form-input"
              value={form.programme}
              onChange={set("programme")}
            />
          </div>
        </div>
        <div className="grid-2" style={{ gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input
              className="form-input"
              value={form.companyName}
              onChange={set("companyName")}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Industry</label>
            <input
              className="form-input"
              value={form.industry}
              onChange={set("industry")}
            />
          </div>
        </div>
        <div className="grid-2" style={{ gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              value={form.email}
              onChange={set("email")}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              className="form-input"
              value={form.phone}
              onChange={set("phone")}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-input"
            rows={3}
            value={form.description}
            onChange={set("description")}
            style={{ resize: "vertical" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
