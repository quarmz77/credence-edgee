import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  FolderOpen,
  CheckSquare,
  Star,
  Building2,
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
          grad: "linear-gradient(135deg,#1565c0,#42a5f5)",
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

      <div className="card" style={{ padding: "24px" }}>
        <h3
          style={{
            fontFamily: "'Clash Display',sans-serif",
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <LayoutGrid size={18} /> Control Panel
        </h3>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          {[
            [
              <FolderOpen size={20} key="projects" />,
              "Manage Projects",
              "/admin/projects",
            ],
            [<Users size={20} key="users" />, "Manage Users", "/admin/users"],
            [
              <FileText size={20} key="submissions" />,
              "Review Submissions",
              "/admin/submissions",
            ],
            [
              <Star size={20} key="ratings" />,
              "Ratings Manager",
              "/admin/ratings",
            ],
            [
              <FileText size={20} key="certificates" />,
              "Certificates",
              "/admin/certificates",
            ],
            [
              <Building2 size={20} key="companies" />,
              "Approve Companies",
              "/admin/companies",
            ],
          ].map(([icon, label, path]) => (
            <button
              key={label}
              onClick={() => nav(path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 16px",
                borderRadius: 10,
                border: "1px solid #e1ecf8",
                background: "#fff",
                cursor: "pointer",
                fontSize: 13.5,
                fontWeight: 600,
                color: "#0d1f35",
                textAlign: "left",
              }}
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                {icon}
              </span>{" "}
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
