import { useEffect, useState } from "react";
import { getCompany, updateCompany } from "../../services/companyService";
import toast from "react-hot-toast";
import { ShieldCheck } from "lucide-react";

const CompanyProfile = () => {
  const [form, setForm] = useState({
    name: "",
    industry: "",
    supportEmail: "",
    website: "",
    description: "",
    paymentProvider: "",
    paymentCurrency: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);

        const response = await getCompany();
        const profile = response?.data?.profile || response?.data || {};

        setForm({
          name: profile.name || "",
          industry: profile.industry || "",
          supportEmail: profile.supportEmail || "",
          website: profile.website || "",
          description: profile.description || "",
          paymentProvider: profile.paymentProvider || "",
          paymentCurrency: profile.paymentCurrency || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load company profile");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await updateCompany(form);
      const profile = response?.data?.profile || response?.data || form;
      setForm({
        name: profile.name || "",
        industry: profile.industry || "",
        supportEmail: profile.supportEmail || "",
        website: profile.website || "",
        description: profile.description || "",
        paymentProvider: profile.paymentProvider || "",
        paymentCurrency: profile.paymentCurrency || "",
      });
      toast.success("Credify company profile updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Company Profile</h1>
        <p>
          Keep your Credify profile updated. Admin verification required
          to go live.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: 12,
          padding: "14px 18px",
          marginBottom: 24,
        }}
      >
        <ShieldCheck size={18} />
        <p style={{ fontSize: 13.5, color: "#166534" }}>
          Your Credify company profile has been submitted for review.
        </p>
        <span className="pill pill-yellow" style={{ marginLeft: "auto" }}>
          Under Review
        </span>
      </div>

      <div
        className="card"
        style={{
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          maxWidth: 600,
        }}
      >
        <div className="form-group">
          <label className="form-label">Company Name</label>
          <input
            className="form-input"
            value={form.name}
            onChange={set("name")}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Industry</label>
          <select
            className="form-input"
            value={form.industry}
            onChange={set("industry")}
          >
            {[
              "Technology",
              "Marketing",
              "Finance",
              "Logistics",
              "Healthcare",
              "Other",
            ].map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Support Email</label>
          <input
            className="form-input"
            type="email"
            value={form.supportEmail}
            onChange={set("supportEmail")}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Website</label>
          <input
            className="form-input"
            value={form.website}
            onChange={set("website")}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Payment Provider</label>
          <input
            className="form-input"
            value={form.paymentProvider}
            onChange={set("paymentProvider")}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Payment Currency</label>
          <input
            className="form-input"
            value={form.paymentCurrency}
            onChange={set("paymentCurrency")}
          />
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
        <button
          className="btn btn-primary btn-block"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving…" : "Save Profile →"}
        </button>
      </div>
    </div>
  );
};

export default CompanyProfile;
