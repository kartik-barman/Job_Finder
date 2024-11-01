import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import NavBar from "../../../components/NavBar";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://job-finder-one.vercel.app/api/users/");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users.");
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/delete/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      toast.success("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };

  return (
    <>
      <NavBar />
      <div style={{ padding: "2rem" }}>
        <header style={{
          backgroundColor: "#343a40",
          color: "#fff",
          padding: "1rem 2rem",
          borderRadius: "8px",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}>
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Admin Dashboard</h1>
        </header>

        <div style={{ overflowX: "auto" }}>
          <table className="table table-striped table-bordered table-hover" style={{
            borderRadius: "8px",
            border: "1px solid #dee2e6",
            marginBottom: 0,
          }}>
            <thead style={{
              backgroundColor: "#f8f9fa",
              color: "#495057",
              fontWeight: "bold",
            }}>
              <tr>
                <th style={{ minWidth: "100px", textAlign: "center" }}>Sl No</th>
                <th style={{ minWidth: "200px", textAlign: "center" }}>Name</th>
                <th style={{ minWidth: "250px", textAlign: "center" }}>Email</th>
                <th style={{ minWidth: "150px", textAlign: "center" }}>Role</th>
                <th style={{ minWidth: "150px", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td style={{ textAlign: "center" }}>{user.role}</td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      style={{
                        backgroundColor: "#ffc107",
                        border: "none",
                        color: "#fff",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginRight: "0.5rem",
                        transition: "background-color 0.3s",
                      }}
                      onClick={() => console.log(`Edit ${user.username}`)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      style={{
                        backgroundColor: "#dc3545",
                        border: "none",
                        color: "#fff",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                      }}
                      onClick={() => deleteUser(user._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div style={{ textAlign: "center", marginTop: "1rem", color: "#6c757d" }}>
            No users found.
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
