import { useState, useMemo, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { changePassword, resendVerification } from "@/services/authService";
import toast from "react-hot-toast";
import {
  User,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Camera,
  Globe,
  Github,
  Linkedin,
  Plus,
  X,
  KeyRound,
  Lock,
  RefreshCw,
  ExternalLink,
  Check,
} from "lucide-react";

// Preset Avatar Gradients & Icons for quick avatar selection
const PRESET_AVATARS = [
  "linear-gradient(135deg, #1565c0 0%, #10a070 100%)",
  "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
  "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
  "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)",
  "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
];

const SKILL_SUGGESTIONS = [
  "React",
  "Node.js",
  "JavaScript",
  "Python",
  "TypeScript",
  "UI/UX Design",
  "Tailwind CSS",
  "MongoDB",
  "PostgreSQL",
  "Git",
  "Docker",
  "Data Analysis",
  "Machine Learning",
  "Figma",
  "Cybersecurity",
];

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [activeTab, setActiveTab] = useState("personal"); // 'personal' | 'professional' | 'security' | 'activity'

  // Form State
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    university: user?.university || "",
    programme: user?.programme || "",
    graduationYear: user?.graduationYear || "",
    companyName: user?.companyName || "",
    industry: user?.industry || "",
    headline: user?.headline || "",
    description: user?.description || "",
    skills: Array.isArray(user?.skills) ? user.skills : [],
    avatarUrl: user?.avatarUrl || "",
    portfolioUrl: user?.portfolioUrl || "",
    githubUrl: user?.githubUrl || "",
    linkedinUrl: user?.linkedinUrl || "",
  });

  // Sync form state when user finishes loading from auth context
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        university: user.university || "",
        programme: user.programme || "",
        graduationYear: user.graduationYear || "",
        companyName: user.companyName || "",
        industry: user.industry || "",
        headline: user.headline || "",
        description: user.description || "",
        skills: Array.isArray(user.skills) ? user.skills : [],
        avatarUrl: user.avatarUrl || "",
        portfolioUrl: user.portfolioUrl || "",
        githubUrl: user.githubUrl || "",
        linkedinUrl: user.linkedinUrl || "",
      }));
    }
  }, [user]);

  const [avatarPreset, setAvatarPreset] = useState(PRESET_AVATARS[0]);
  const [newSkillInput, setNewSkillInput] = useState("");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // Security Form State
  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [resendingVerification, setResendingVerification] = useState(false);

  const setField = (k) => (e) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  // Profile Completion Meter Calculation
  const completionStats = useMemo(() => {
    const fields = [
      { key: "name", label: "Full Name", filled: !!form.name },
      { key: "email", label: "Email Address", filled: !!form.email },
      { key: "location", label: "Location", filled: !!form.location },
      { key: "university", label: "University", filled: !!form.university },
      { key: "programme", label: "Programme", filled: !!form.programme },
      { key: "headline", label: "Headline", filled: !!form.headline },
      { key: "description", label: "Bio / Description", filled: !!form.description },
      { key: "skills", label: "Skills (At least 1)", filled: form.skills.length > 0 },
      { key: "githubUrl", label: "GitHub Profile", filled: !!form.githubUrl },
      { key: "linkedinUrl", label: "LinkedIn Profile", filled: !!form.linkedinUrl },
    ];

    const filledCount = fields.filter((f) => f.filled).length;
    const percentage = Math.round((filledCount / fields.length) * 100);
    const missingFields = fields.filter((f) => !f.filled);

    return { percentage, filledCount, total: fields.length, missingFields };
  }, [form]);

  // Skill Handlers
  const handleAddSkill = (skillToAdd) => {
    const trimmed = (skillToAdd || newSkillInput).trim();
    if (!trimmed) return;
    if (form.skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      toast.error(`"${trimmed}" is already added.`);
      return;
    }
    setForm((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
    setNewSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  // Save Profile Handler
  const handleSaveProfile = async () => {
    setSavingProfile(true);
    try {
      await updateUser(form);
      toast.success("Credify profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  // Password Change Handler
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!securityForm.currentPassword || !securityForm.newPassword) {
      toast.error("Please fill in current and new password");
      return;
    }
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (securityForm.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }

    setChangingPassword(true);
    try {
      await changePassword({
        currentPassword: securityForm.currentPassword,
        newPassword: securityForm.newPassword,
      });
      toast.success("Password changed successfully!");
      setSecurityForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setChangingPassword(false);
    }
  };

  // Resend Email Verification Handler
  const handleResendVerification = async () => {
    setResendingVerification(true);
    try {
      const res = await resendVerification({ email: user?.email });
      toast.success(res.message || "Verification email sent!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend email verification");
    } finally {
      setResendingVerification(false);
    }
  };

  // Password strength gauge
  const passwordStrength = useMemo(() => {
    const pwd = securityForm.newPassword;
    if (!pwd) return { score: 0, label: "", color: "#ccc" };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score: 1, label: "Weak", color: "#ef4444" };
    if (score === 2 || score === 3) return { score: 2, label: "Medium", color: "#f59e0b" };
    return { score: 3, label: "Strong", color: "#10b981" };
  }, [securityForm.newPassword]);

  return (
    <div className="animate-fade-up" style={{ paddingBottom: 40 }}>
      {/* Page Title Header */}
      <div className="dash-header" style={{ marginBottom: 24 }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: 10 }}>
          My Credify Profile
          <span
            className="pill pill-blue"
            style={{ fontSize: 12, textTransform: "capitalize" }}
          >
            {user?.role || "Student"}
          </span>
        </h1>
        <p>Keep your professional credentials and account details updated.</p>
      </div>

      {/* Main Profile Header Banner Card */}
      <div
        className="card"
        style={{
          padding: "28px",
          marginBottom: 24,
          background: "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          {/* Avatar & User Details */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ position: "relative" }}>
              <div
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                title="Click to edit avatar"
                style={{
                  width: 86,
                  height: 86,
                  borderRadius: "50%",
                  background: form.avatarUrl
                    ? `url(${form.avatarUrl}) center/cover no-repeat`
                    : avatarPreset,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Clash Display', sans-serif",
                  fontWeight: 800,
                  fontSize: 32,
                  color: "#fff",
                  boxShadow: "0 8px 24px rgba(15, 52, 96, 0.18)",
                  cursor: "pointer",
                  border: "3px solid #fff",
                  transition: "transform 0.2s",
                }}
              >
                {!form.avatarUrl && (user?.name?.charAt(0) || "U")}
              </div>
              <button
                type="button"
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#0f3460",
                  color: "#fff",
                  border: "2px solid #fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
                title="Change Avatar"
              >
                <Camera size={14} />
              </button>
            </div>

            <div>
              <h2
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#0d1f35",
                  marginBottom: 2,
                }}
              >
                {form.name || user?.name || "User Name"}
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "#4a6080",
                  marginBottom: 6,
                  fontWeight: 500,
                }}
              >
                {form.headline || (form.university ? `${form.programme} @ ${form.university}` : form.email)}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                {user?.emailVerified ? (
                  <span className="pill pill-green">
                    <CheckCircle2 size={12} /> Verified Email
                  </span>
                ) : (
                  <span className="pill pill-yellow">
                    <AlertCircle size={12} /> Unverified Email
                  </span>
                )}
                {form.location && (
                  <span style={{ fontSize: 13, color: "#7a9ec0" }}>
                    📍 {form.location}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Profile Save Action Button */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              className="btn btn-primary"
              onClick={handleSaveProfile}
              disabled={savingProfile}
              style={{ padding: "10px 24px" }}
            >
              {savingProfile ? (
                <>
                  <RefreshCw size={16} className="spin" /> Saving…
                </>
              ) : (
                <>
                  <Check size={16} /> Save Profile Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal/Dropdown for Avatar Customization */}
        {showAvatarPicker && (
          <div
            className="animate-fade-up"
            style={{
              marginTop: 20,
              paddingTop: 16,
              borderTop: "1px solid #e1ecf8",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#0d1f35" }}>
                Choose Profile Avatar:
              </span>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setShowAvatarPicker(false)}
                style={{ padding: "2px 8px" }}
              >
                <X size={14} /> Close
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: "#4a6080" }}>Preset Colors:</span>
              {PRESET_AVATARS.map((bg, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setAvatarPreset(bg);
                    setForm((prev) => ({ ...prev, avatarUrl: "" }));
                  }}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: bg,
                    cursor: "pointer",
                    border: avatarPreset === bg && !form.avatarUrl ? "3px solid #0f3460" : "2px solid #fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                />
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                className="form-input"
                placeholder="Or enter Image URL (e.g. https://github.com/username.png)"
                value={form.avatarUrl}
                onChange={setField("avatarUrl")}
                style={{ fontSize: 13 }}
              />
            </div>
          </div>
        )}

        {/* Profile Completion Meter Card */}
        <div
          style={{
            marginTop: 24,
            paddingTop: 18,
            borderTop: "1px solid #e1ecf8",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#0d1f35", display: "flex", alignItems: "center", gap: 6 }}>
              <Sparkles size={15} color="#1565c0" /> Profile Strength: {completionStats.percentage}%
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#4a6080" }}>
              {completionStats.filledCount} of {completionStats.total} sections filled
            </span>
          </div>

          <div
            style={{
              width: "100%",
              height: 8,
              borderRadius: 4,
              background: "#e1ecf8",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${completionStats.percentage}%`,
                height: "100%",
                background:
                  completionStats.percentage === 100
                    ? "linear-gradient(90deg, #10b981, #059669)"
                    : "linear-gradient(90deg, #1565c0, #10a070)",
                transition: "width 0.4s ease",
              }}
            />
          </div>

          {completionStats.missingFields.length > 0 && (
            <div style={{ fontSize: 12, color: "#7a9ec0", marginTop: 2 }}>
              💡 Boost your profile visibility by adding:{" "}
              <strong>{completionStats.missingFields.map((f) => f.label).join(", ")}</strong>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 20,
          borderBottom: "1px solid #e1ecf8",
          paddingBottom: 4,
          overflowX: "auto",
        }}
      >
        <button
          className={`btn ${activeTab === "personal" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setActiveTab("personal")}
          style={{ borderRadius: 10, padding: "9px 18px", fontSize: 13.5 }}
        >
          <User size={16} /> Personal & Education
        </button>
        <button
          className={`btn ${activeTab === "professional" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setActiveTab("professional")}
          style={{ borderRadius: 10, padding: "9px 18px", fontSize: 13.5 }}
        >
          <Briefcase size={16} /> Professional & Skills
        </button>
        <button
          className={`btn ${activeTab === "security" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setActiveTab("security")}
          style={{ borderRadius: 10, padding: "9px 18px", fontSize: 13.5 }}
        >
          <Lock size={16} /> Security & Account
        </button>
        <button
          className={`btn ${activeTab === "activity" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setActiveTab("activity")}
          style={{ borderRadius: 10, padding: "9px 18px", fontSize: 13.5 }}
        >
          <Award size={16} /> Activity & Badges
        </button>
      </div>

      {/* TAB 1: PERSONAL & EDUCATION */}
      {activeTab === "personal" && (
        <div
          className="card animate-fade-up"
          style={{ padding: "28px", display: "flex", flexDirection: "column", gap: 20 }}
        >
          <h3
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#0d1f35",
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderBottom: "1px solid #e1ecf8",
              paddingBottom: 12,
            }}
          >
            <User size={18} color="#1565c0" /> Personal Details & Academic Background
          </h3>

          <div className="grid-2" style={{ gap: 18 }}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                className="form-input"
                value={form.name}
                onChange={setField("name")}
                placeholder="Your full name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address (Read-only)</label>
              <input
                className="form-input"
                type="email"
                value={form.email}
                disabled
                style={{ background: "#f8faff", color: "#4a6080" }}
              />
            </div>
          </div>

          <div className="grid-2" style={{ gap: 18 }}>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                className="form-input"
                value={form.phone}
                onChange={setField("phone")}
                placeholder="+233 24 000 0000"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Location / Country</label>
              <input
                className="form-input"
                value={form.location}
                onChange={setField("location")}
                placeholder="e.g. Accra, Ghana"
              />
            </div>
          </div>

          <div
            style={{
              marginTop: 10,
              paddingTop: 16,
              borderTop: "1px solid #e1ecf8",
            }}
          >
            <h4
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#0d1f35",
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <GraduationCap size={18} color="#10a070" /> Education & University
            </h4>

            <div className="grid-2" style={{ gap: 18, marginBottom: 18 }}>
              <div className="form-group">
                <label className="form-label">University / Institution</label>
                <input
                  className="form-input"
                  value={form.university}
                  onChange={setField("university")}
                  placeholder="e.g. University of Ghana, Legon"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Programme / Major</label>
                <input
                  className="form-input"
                  value={form.programme}
                  onChange={setField("programme")}
                  placeholder="e.g. BSc Computer Science"
                />
              </div>
            </div>

            <div className="grid-2" style={{ gap: 18 }}>
              <div className="form-group">
                <label className="form-label">Expected / Actual Graduation Year</label>
                <input
                  className="form-input"
                  value={form.graduationYear}
                  onChange={setField("graduationYear")}
                  placeholder="e.g. 2026"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Company / Organization (Optional)</label>
                <input
                  className="form-input"
                  value={form.companyName}
                  onChange={setField("companyName")}
                  placeholder="Company name if applicable"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROFESSIONAL & SKILLS */}
      {activeTab === "professional" && (
        <div
          className="card animate-fade-up"
          style={{ padding: "28px", display: "flex", flexDirection: "column", gap: 24 }}
        >
          <h3
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#0d1f35",
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderBottom: "1px solid #e1ecf8",
              paddingBottom: 12,
            }}
          >
            <Briefcase size={18} color="#1565c0" /> Professional Headline, Bio & Verified Skills
          </h3>

          <div className="form-group">
            <label className="form-label">Professional Headline</label>
            <input
              className="form-input"
              value={form.headline}
              onChange={setField("headline")}
              placeholder="e.g. Full-Stack Developer | Passionate about FinTech & AI"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Bio / Overview</label>
            <textarea
              className="form-input"
              rows={4}
              value={form.description}
              onChange={setField("description")}
              placeholder="Write a brief overview of your experience, career goals, and background..."
              style={{ resize: "vertical" }}
            />
          </div>

          {/* Interactive Skills Chips Manager */}
          <div
            style={{
              background: "#f8faff",
              padding: 20,
              borderRadius: 12,
              border: "1px solid #e1ecf8",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label className="form-label" style={{ fontSize: 14, fontWeight: 700, color: "#0d1f35" }}>
                Key Technical Skills & Competencies
              </label>
              <span style={{ fontSize: 12, color: "#7a9ec0" }}>
                {form.skills.length} skills added
              </span>
            </div>

            {/* Added Skill Chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, minHeight: 36 }}>
              {form.skills.length === 0 ? (
                <span style={{ fontSize: 13, color: "#7a9ec0", fontStyle: "italic" }}>
                  No skills added yet. Add your top skills below!
                </span>
              ) : (
                form.skills.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      background: "#1565c0",
                      color: "#fff",
                      padding: "5px 12px",
                      borderRadius: 20,
                      fontSize: 13,
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      boxShadow: "0 2px 6px rgba(21, 101, 192, 0.2)",
                    }}
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#fff",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                      title={`Remove ${skill}`}
                    >
                      <X size={13} />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Custom Skill Input */}
            <div style={{ display: "flex", gap: 10 }}>
              <input
                className="form-input"
                placeholder="Type a skill (e.g. React, Python, Product Design) and press Add"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleAddSkill()}
                style={{ padding: "0 20px" }}
              >
                <Plus size={16} /> Add Skill
              </button>
            </div>

            {/* Suggested Skill Pills */}
            <div style={{ marginTop: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#4a6080", marginBottom: 6, display: "block" }}>
                Suggested Skills (Click to add):
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {SKILL_SUGGESTIONS.filter(
                  (s) => !form.skills.some((existing) => existing.toLowerCase() === s.toLowerCase())
                ).map((suggested, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddSkill(suggested)}
                    className="btn btn-ghost btn-sm"
                    style={{
                      background: "#fff",
                      border: "1px solid #c3d8f0",
                      padding: "3px 10px",
                      fontSize: 12,
                      borderRadius: 16,
                      color: "#1565c0",
                    }}
                  >
                    + {suggested}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div style={{ borderTop: "1px solid #e1ecf8", paddingTop: 18 }}>
            <h4
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#0d1f35",
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Globe size={18} color="#1565c0" /> Portfolio & Social Links
            </h4>

            <div className="grid-3" style={{ gap: 16 }}>
              <div className="form-group">
                <label className="form-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Globe size={14} /> Personal Portfolio / Website
                </label>
                <input
                  className="form-input"
                  value={form.portfolioUrl}
                  onChange={setField("portfolioUrl")}
                  placeholder="https://yourportfolio.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Github size={14} /> GitHub Profile
                </label>
                <input
                  className="form-input"
                  value={form.githubUrl}
                  onChange={setField("githubUrl")}
                  placeholder="https://github.com/username"
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Linkedin size={14} /> LinkedIn Profile
                </label>
                <input
                  className="form-input"
                  value={form.linkedinUrl}
                  onChange={setField("linkedinUrl")}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SECURITY & ACCOUNT */}
      {activeTab === "security" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Email Verification Card */}
          <div
            className="card animate-fade-up"
            style={{ padding: "28px", display: "flex", flexDirection: "column", gap: 16 }}
          >
            <h3
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: "#0d1f35",
                display: "flex",
                alignItems: "center",
                gap: 8,
                borderBottom: "1px solid #e1ecf8",
                paddingBottom: 12,
              }}
            >
              <ShieldCheck size={18} color="#10a070" /> Email Verification Status
            </h3>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
                background: user?.emailVerified ? "#f0fdf4" : "#fffbeb",
                border: user?.emailVerified ? "1px solid #bbf7d0" : "1px solid #fef3c7",
                padding: 18,
                borderRadius: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {user?.emailVerified ? (
                  <CheckCircle2 size={24} color="#166534" />
                ) : (
                  <AlertCircle size={24} color="#b45309" />
                )}
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: "#0d1f35" }}>
                    {user?.emailVerified ? "Email Address Verified" : "Email Address Pending Verification"}
                  </h4>
                  <p style={{ fontSize: 13, color: "#4a6080" }}>
                    Account email: <strong>{user?.email}</strong>
                  </p>
                </div>
              </div>

              {!user?.emailVerified && (
                <button
                  className="btn btn-outline btn-sm"
                  onClick={handleResendVerification}
                  disabled={resendingVerification}
                >
                  {resendingVerification ? "Sending..." : "Resend Verification Email"}
                </button>
              )}
            </div>
          </div>

          {/* Change Password Form Card */}
          <div
            className="card animate-fade-up"
            style={{ padding: "28px", display: "flex", flexDirection: "column", gap: 20 }}
          >
            <h3
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: "#0d1f35",
                display: "flex",
                alignItems: "center",
                gap: 8,
                borderBottom: "1px solid #e1ecf8",
                paddingBottom: 12,
              }}
            >
              <KeyRound size={18} color="#1565c0" /> Change Account Password
            </h3>

            <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div className="form-group">
                <label className="form-label">Current Password *</label>
                <input
                  className="form-input"
                  type="password"
                  value={securityForm.currentPassword}
                  onChange={(e) =>
                    setSecurityForm((prev) => ({ ...prev, currentPassword: e.target.value }))
                  }
                  placeholder="Enter your current password"
                />
              </div>

              <div className="grid-2" style={{ gap: 18 }}>
                <div className="form-group">
                  <label className="form-label">New Password *</label>
                  <input
                    className="form-input"
                    type="password"
                    value={securityForm.newPassword}
                    onChange={(e) =>
                      setSecurityForm((prev) => ({ ...prev, newPassword: e.target.value }))
                    }
                    placeholder="Min. 8 characters"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Confirm New Password *</label>
                  <input
                    className="form-input"
                    type="password"
                    value={securityForm.confirmPassword}
                    onChange={(e) =>
                      setSecurityForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
                    }
                    placeholder="Re-enter new password"
                  />
                </div>
              </div>

              {/* Password strength bar */}
              {securityForm.newPassword && (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ flex: 1, height: 6, borderRadius: 3, background: "#e1ecf8", overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${(passwordStrength.score / 3) * 100}%`,
                        height: "100%",
                        background: passwordStrength.color,
                        transition: "all 0.3s",
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </span>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={changingPassword}
                  style={{ padding: "10px 24px" }}
                >
                  {changingPassword ? "Updating Password..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 4: ACTIVITY & CREDENTIALS */}
      {activeTab === "activity" && (
        <div className="card animate-fade-up" style={{ padding: "28px" }}>
          <h3
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#0d1f35",
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderBottom: "1px solid #e1ecf8",
              paddingBottom: 12,
              marginBottom: 20,
            }}
          >
            <Award size={18} color="#1565c0" /> Verified Credentials & Activity Summary
          </h3>

          <div className="stat-grid" style={{ marginBottom: 24 }}>
            <div className="stat-card" style={{ background: "linear-gradient(135deg,#0f3460,#1565c0)" }}>
              <div className="stat-card-value">{form.skills.length}</div>
              <div className="stat-card-label">Verified Skills Listed</div>
            </div>
            <div className="stat-card" style={{ background: "linear-gradient(135deg,#0d7a52,#10b981)" }}>
              <div className="stat-card-value">{completionStats.percentage}%</div>
              <div className="stat-card-label">Profile Strength</div>
            </div>
            <div className="stat-card" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
              <div className="stat-card-value" style={{ textTransform: "capitalize" }}>
                {user?.role || "Student"}
              </div>
              <div className="stat-card-label">Account Tier</div>
            </div>
            <div className="stat-card" style={{ background: "linear-gradient(135deg,#f59e0b,#ef4444)" }}>
              <div className="stat-card-value">
                {user?.createdAt ? new Date(user.createdAt).getFullYear() : "2026"}
              </div>
              <div className="stat-card-label">Member Since</div>
            </div>
          </div>

          <div
            style={{
              background: "#f8faff",
              border: "1px solid #e1ecf8",
              borderRadius: 12,
              padding: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: "#0d1f35", marginBottom: 4 }}>
                Credify Verified Badges & Portfolio
              </h4>
              <p style={{ fontSize: 13, color: "#4a6080" }}>
                Submit project solutions and complete assessments to earn verified skill badges visible to employers.
              </p>
            </div>
            <a href="/student-dashboard/projects" className="btn btn-outline btn-sm">
              Explore Projects <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
