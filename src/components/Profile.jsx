import { useState, useEffect } from "react";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("about");

  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (email) {
      fetch(`/api/user/${email}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(() => setMessage("Error fetching user"));
    }
  }, [email]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/user/${email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
        }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Error updating user");
    }
  };

  if (!email) return <p>Please log in first.</p>;

  return (
    <div className="profile-container">
      <h2>Welcome, {user.username || "User"} 👋</h2>

      {/* 🔹 Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "about" ? "active" : ""}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
        <button
          className={activeTab === "forms" ? "active" : ""}
          onClick={() => setActiveTab("forms")}
        >
          Saved Forms
        </button>
        <button
          className={activeTab === "favorites" ? "active" : ""}
          onClick={() => setActiveTab("favorites")}
        >
          Favorites
        </button>
        <button
          className={activeTab === "settings" ? "active" : ""}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </div>

      {/* 🔹 Tab content */}
      <div className="tab-content">
        {activeTab === "about" && (
          <form className="profile-form">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
            />

            <label>Email:</label>
            <input type="email" value={user.email} readOnly />

            <label>Password:</label>
            <input
              type="text"
              name="password"
              value={user.password}
              onChange={handleChange}
            />

            <button type="button" onClick={handleSave}>
              Save Changes
            </button>

            <p className="message">{message}</p>
          </form>
        )}

        {activeTab === "forms" && (
          <div className="placeholder">
            <h3>Saved Forms</h3>
            <p>Here you’ll see your saved forms once this feature is added.</p>
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="placeholder">
            <h3>Favorite Games / Items</h3>
            <p>No favorites yet — stay tuned for this feature!</p>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="placeholder">
            <h3>Account Settings</h3>
            <p>Future options like theme, notifications, and more will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
