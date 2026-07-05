import { useEffect, useState } from "react";
import { getAdminUsers } from "@/services/adminService";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await getAdminUsers();
        setUsers(response.users);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Manage Credify Users</h1>
        <p>View and manage all students, graduates, companies and admins.</p>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1.5fr 1fr 1fr 1fr",
            gap: 0,
            padding: "16px 24px",
            borderBottom: "1px solid #e1ecf8",
            fontWeight: 700,
            fontSize: 13,
            color: "#0d1f35",
            background: "#f8fbff",
          }}
        >
          <div>Name</div>
          <div>Email</div>
          <div>Role</div>
          <div>Status</div>
          <div>Joined</div>
        </div>
        {loading ? (
          <div
            style={{ padding: "32px", textAlign: "center", color: "#4a6080" }}
          >
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div
            style={{ padding: "32px", textAlign: "center", color: "#4a6080" }}
          >
            No users found.
          </div>
        ) : (
          users.map((u, i) => (
            <div
              key={u.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1.5fr 1.5fr 1fr 1fr 1fr",
                gap: 0,
                padding: "16px 24px",
                borderBottom:
                  i < users.length - 1 ? "1px solid #e1ecf8" : "none",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{u.name}</div>
                <div style={{ fontSize: 12, color: "#7a9ec0" }}>
                  {u.companyName || u.university || "-"}
                </div>
              </div>
              <div style={{ fontSize: 13, color: "#0d1f35" }}>{u.email}</div>
              <span
                className="pill pill-blue"
                style={{ textTransform: "capitalize" }}
              >
                {u.role}
              </span>
              <span
                className={
                  u.emailVerified ? "pill pill-green" : "pill pill-yellow"
                }
                style={{ textTransform: "capitalize" }}
              >
                {u.emailVerified ? "Verified" : "Pending Verification"}
              </span>
              <div style={{ fontSize: 12, color: "#4a6080" }}>
                {new Date(u.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
