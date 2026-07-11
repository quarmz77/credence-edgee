import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAdminUsers, updateAdminUser } from "@/services/adminService";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null); // id of user being updated

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await getAdminUsers();
        setUsers(response.users);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const toggleSuspend = async (user) => {
    const newStatus = user.isSuspended ? false : true;
    setUpdating(user._id);
    try {
      await updateAdminUser(user._id, { isSuspended: newStatus });
      setUsers((us) =>
        us.map((u) =>
          u._id === user._id ? { ...u, isSuspended: newStatus } : u,
        ),
      );
      toast.success(
        newStatus
          ? `${user.name} suspended.`
          : `${user.name} reactivated.`,
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setUpdating(null);
    }
  };

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
            gridTemplateColumns: "1.5fr 1.5fr 1fr 1fr 1fr 1fr",
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
          <div>Actions</div>
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
              key={u._id ?? u.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1.5fr 1.5fr 1fr 1fr 1fr 1fr",
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
                  u.isSuspended
                    ? "pill pill-red"
                    : u.emailVerified
                      ? "pill pill-green"
                      : "pill pill-yellow"
                }
                style={{ textTransform: "capitalize" }}
              >
                {u.isSuspended
                  ? "Suspended"
                  : u.emailVerified
                    ? "Verified"
                    : "Pending"}
              </span>
              <div style={{ fontSize: 12, color: "#4a6080" }}>
                {new Date(u.createdAt).toLocaleDateString()}
              </div>
              <div>
                {u.role !== "admin" && (
                  <button
                    className="btn btn-sm"
                    disabled={updating === (u._id ?? u.id)}
                    style={{
                      background: u.isSuspended ? "#dcfce7" : "#fee2e2",
                      color: u.isSuspended ? "#166534" : "#991b1b",
                      border: "none",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      opacity: updating === (u._id ?? u.id) ? 0.6 : 1,
                    }}
                    onClick={() => toggleSuspend(u)}
                  >
                    {updating === (u._id ?? u.id)
                      ? "..."
                      : u.isSuspended
                        ? "Reactivate"
                        : "Suspend"}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
