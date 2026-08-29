import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard({ user, onLogout }) {
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfile(response.data.user);
      } catch (error) {
        console.error("Profile error:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        onLogout();
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [onLogout]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Loading your secure dashboard...</p>
      </div>
    );
  }

  const userName = profile?.name || "User";
  const userEmail = profile?.email || "Not available";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="sidebar-logo">
          <span>🔐</span>
          SecureAuth
        </div>

        <div className="sidebar-menu">

          {/* DASHBOARD */}
          <div
            className={`menu-item ${
              activeSection === "dashboard" ? "active" : ""
            }`}
            onClick={() => setActiveSection("dashboard")}
          >
            <span>📊</span>
            Dashboard
          </div>

          {/* PROFILE */}
          <div
            className={`menu-item ${
              activeSection === "profile" ? "active" : ""
            }`}
            onClick={() => setActiveSection("profile")}
          >
            <span>👤</span>
            My Profile
          </div>

          {/* SECURITY */}
          <div
            className={`menu-item ${
              activeSection === "security" ? "active" : ""
            }`}
            onClick={() => setActiveSection("security")}
          >
            <span>🔒</span>
            Security
          </div>

          {/* SETTINGS */}
          <div
            className={`menu-item ${
              activeSection === "settings" ? "active" : ""
            }`}
            onClick={() => setActiveSection("settings")}
          >
            <span>⚙️</span>
            Settings
          </div>

        </div>

        {/* SIDEBAR USER */}
        <div className="sidebar-bottom">

          <div className="sidebar-user">

            <div className="user-avatar">
              {userInitial}
            </div>

            <div>
              <strong>{userName}</strong>
              <small>{userEmail}</small>
            </div>

          </div>

          <button
            className="sidebar-logout"
            onClick={onLogout}
          >
            🚪 Logout
          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* ================= DASHBOARD ================= */}

        {activeSection === "dashboard" && (
          <div>

            <header className="top-header">

              <div>
                <p className="header-label">
                  OVERVIEW
                </p>

                <h1>
                  Dashboard
                </h1>
              </div>

              <div className="header-profile">

                <div className="header-avatar">
                  {userInitial}
                </div>

                <div>
                  <strong>
                    {userName}
                  </strong>

                  <span>
                    Authenticated User
                  </span>
                </div>

              </div>

            </header>

            {/* WELCOME */}
            <section className="welcome-banner">

              <div>

                <span className="welcome-tag">
                  ● ACCOUNT ACTIVE
                </span>

                <h2>
                  Welcome back, {userName} 👋
                </h2>

                <p>
                  Your account is protected and your session
                  is securely authenticated.
                </p>

              </div>

              <div className="shield-icon">
                🛡️
              </div>

            </section>

            {/* STATISTICS */}
            <section className="stats-grid">

              <div className="stat-card">

                <div className="stat-icon blue">
                  🔐
                </div>

                <div>
                  <span>
                    Security Status
                  </span>

                  <h3>
                    Protected
                  </h3>
                </div>

              </div>

              <div className="stat-card">

                <div className="stat-icon green">
                  ✓
                </div>

                <div>
                  <span>
                    Authentication
                  </span>

                  <h3>
                    Verified
                  </h3>
                </div>

              </div>

              <div className="stat-card">

                <div className="stat-icon purple">
                  👤
                </div>

                <div>
                  <span>
                    Account
                  </span>

                  <h3>
                    Active
                  </h3>
                </div>

              </div>

            </section>

            {/* ACCOUNT + SECURITY */}
            <section className="content-grid">

              <div className="profile-card">

                <div className="section-title">

                  <h2>
                    Account Information
                  </h2>

                  <span>
                    ✓ Verified
                  </span>

                </div>

                <div className="profile-details">

                  <div className="large-avatar">
                    {userInitial}
                  </div>

                  <div className="profile-info">

                    <div>
                      <label>
                        Full Name
                      </label>

                      <p>
                        {userName}
                      </p>
                    </div>

                    <div>
                      <label>
                        Email Address
                      </label>

                      <p>
                        {userEmail}
                      </p>
                    </div>

                  </div>

                </div>

              </div>

              <div className="security-card">

                <div className="section-title">

                  <h2>
                    Security
                  </h2>

                  <span>
                    🛡️
                  </span>

                </div>

                <div className="security-item">

                  <span>
                    JWT Authentication
                  </span>

                  <strong>
                    Active
                  </strong>

                </div>

                <div className="security-item">

                  <span>
                    Password Protection
                  </span>

                  <strong>
                    Enabled
                  </strong>

                </div>

                <div className="security-item">

                  <span>
                    Account Status
                  </span>

                  <strong>
                    Secure
                  </strong>

                </div>

              </div>

            </section>

            {/* ACTIVITY */}
            <section className="activity-card">

              <div className="section-title">

                <h2>
                  Recent Activity
                </h2>

                <span>
                  Today
                </span>

              </div>

              <div className="activity-item">

                <div className="activity-icon">
                  🔑
                </div>

                <div>

                  <strong>
                    Successful login
                  </strong>

                  <p>
                    Your account was successfully authenticated.
                  </p>

                </div>

                <span className="activity-status">
                  Completed
                </span>

              </div>

              <div className="activity-item">

                <div className="activity-icon">
                  🛡️
                </div>

                <div>

                  <strong>
                    Security verification
                  </strong>

                  <p>
                    Your JWT token was verified successfully.
                  </p>

                </div>

                <span className="activity-status">
                  Secure
                </span>

              </div>

            </section>

          </div>
        )}

        {/* ================= PROFILE ================= */}

        {activeSection === "profile" && (
          <div className="profile-page">

            <div className="top-header">

              <div>
                <p className="header-label">
                  ACCOUNT
                </p>

                <h1>
                  My Profile
                </h1>
              </div>

            </div>

            <div className="profile-page-card">

              <div className="profile-big-avatar">
                {userInitial}
              </div>

              <h2>
                {userName}
              </h2>

              <p>
                {userEmail}
              </p>

              <div className="profile-info-box">

                <div>
                  <span>
                    Full Name
                  </span>

                  <strong>
                    {userName}
                  </strong>
                </div>

                <div>
                  <span>
                    Email Address
                  </span>

                  <strong>
                    {userEmail}
                  </strong>
                </div>

                <div>
                  <span>
                    Account Status
                  </span>

                  <strong>
                    ✓ Verified
                  </strong>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ================= SECURITY ================= */}

        {activeSection === "security" && (
          <div className="profile-page">

            <div className="top-header">

              <div>
                <p className="header-label">
                  PROTECTION
                </p>

                <h1>
                  Security
                </h1>
              </div>

            </div>

            <div className="profile-page-card">

              <div className="security-large-icon">
                🛡️
              </div>

              <h2>
                Your Account is Secure
              </h2>

              <p>
                Your SecureAuth account is protected with
                modern authentication methods.
              </p>

              <div className="profile-info-box">

                <div>
                  <span>
                    JWT Authentication
                  </span>

                  <strong>
                    ✓ Active
                  </strong>
                </div>

                <div>
                  <span>
                    Password Protection
                  </span>

                  <strong>
                    ✓ Enabled
                  </strong>
                </div>

                <div>
                  <span>
                    Account Status
                  </span>

                  <strong>
                    ✓ Secure
                  </strong>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ================= SETTINGS ================= */}

        {activeSection === "settings" && (
          <div className="profile-page">

            <div className="top-header">

              <div>
                <p className="header-label">
                  PREFERENCES
                </p>

                <h1>
                  Settings
                </h1>
              </div>

            </div>

            <div className="profile-page-card">

              <h2>
                Account Settings
              </h2>

              <p>
                Your SecureAuth account settings.
              </p>

              <div className="profile-info-box">

                <div>
                  <span>
                    Account
                  </span>

                  <strong>
                    ✓ Active
                  </strong>
                </div>

                <div>
                  <span>
                    Authentication
                  </span>

                  <strong>
                    ✓ Enabled
                  </strong>
                </div>

                <div>
                  <span>
                    Session
                  </span>

                  <strong>
                    🛡️ Secure
                  </strong>
                </div>

              </div>

            </div>

          </div>
        )}

      </main>

    </div>
  );
}

export default Dashboard;