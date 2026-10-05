import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  FolderOpen,
  CheckSquare,
  Star,
  FileText,
  LayoutGrid,
} from "lucide-react";
import { getAdminOverview } from "@/services/adminService";

const AdminDashboard = () => {
  const nav = useNavigate();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const response = await getAdminOverview();
        setOverview(response.overview);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadOverview();
  }, []);

  const stats = overview
    ? [
        {
          label: "Total Users",
          value: overview.totals.users,
          icon: <Users size={20} />,
          grad: "#059669",
        },
        {
          label: "Total Payments",
          value: overview.totals.payments,
          icon: <FolderOpen size={20} />,
          grad: "linear-gradient(135deg,#0d7a52,#1dbf86)",
        },
        {
          label: "Paid Payments",
          value: overview.totals.totalpaidPayments,
          icon: <CheckSquare size={20} />,
          grad: "linear-gradient(135deg,#b45309,#f59e0b)",
        },
        {
          label: "Certificates",
          value: overview.totals.certificates,
          icon: <FileText size={20} />,
          grad: "linear-gradient(135deg,#be185d,#f472b6)",
        },
      ]
    : [];

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Credify Admin Dashboard</h1>
        <p>Full control of the Credify platform.</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {loading ? (
          <div
            style={{
              gridColumn: "1 / -1",
              padding: 24,
              textAlign: "center",
              color: "#4a6080",
            }}
          >
            Loading admin overview...
          </div>
        ) : (
          stats.map((c) => (
            <div
              key={c.label}
              className="stat-card"
              style={{ background: c.grad }}
            >
              <div style={{ marginBottom: 10 }}>{c.icon}</div>
              <div className="stat-card-value">{c.value}</div>
              <div className="stat-card-label">{c.label}</div>
            </div>
          ))
        )}
      </div>

      <div className="card" style={{ padding: "24px", border: "1px solid #e2e8f0" }}>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 800,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#0f172a",
          }}
        >
          <LayoutGrid size={18} style={{ color: "#059669" }} /> Platform Management Panel
        </h3>
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14 }}
        >
          {[
            {
              icon: <FolderOpen size={20} />,
              label: "Manage Projects",
              desc: "Review and approve/reject company-submitted projects",
              path: "/admin/projects",
              badge: "Approval Required",
            },
            {
              icon: <Users size={20} />,
              label: "Manage Users",
              desc: "Inspect, manage, and suspend user accounts",
              path: "/admin/users",
              badge: "Access Control",
            },
            {
              icon: <FileText size={20} />,
              label: "Review Submissions",
              desc: "Grade student work submissions and issue ratings",
              path: "/admin/submissions",
              badge: "Evaluation",
            },
            {
              icon: <Star size={20} />,
              label: "Ratings Manager",
              desc: "Oversee rating records and student performance reviews",
              path: "/admin/ratings",
              badge: "Quality Audit",
            },
            {
              icon: <CheckSquare size={20} />,
              label: "Certificates Approval",
              desc: "Verify and approve issued achievement certificates",
              path: "/admin/certificates",
              badge: "Verification",
            },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => nav(item.path)}
              className="card-hover"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: "18px 20px",
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                background: "#ffffff",
                cursor: "pointer",
                textAlign: "left",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#059669", fontWeight: 700 }}>
                  {item.icon}
                  <span style={{ fontSize: 15, color: "#0f172a", fontWeight: 700 }}>{item.label}</span>
                </div>
                <span className="pill pill-green" style={{ fontSize: 10, padding: "2px 8px" }}>{item.badge}</span>
              </div>
              <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
