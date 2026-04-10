import { useEffect, useState } from "react";
import axios from "axios";

export default function Account() {
  const [user, setUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch Profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      setEditName(res.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Update Name
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/profile/name",
        { name: editName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(res.data);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div
      className="d-flex justify-content-center align-items-center border rounded p-4"
      style={{ height: "100vh", backgroundColor: "#1c1c1c" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "500px", backgroundColor: "#2e2e2e", color: "white" }}
      >
        <h3 className="text-center mb-4">My Account</h3>

        {/* Name Field */}
        <div className="mb-3">
          <label className="form-label text-secondary">Name</label>
          {isEditing ? (
            <div className="d-flex">
              <input
                type="text"
                className="form-control bg-dark text-white"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <button
                className="btn btn-success ms-2"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-between">
              <span>{user.name}</span>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <hr className="border-secondary" />

        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Status:</strong> {user.isActive ? "Active" : "Inactive"}</p>
      </div>
    </div>
  );
}