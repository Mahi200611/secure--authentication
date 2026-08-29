import "./Dashboard.css";

function Dashboard({ user, onLogout }) {
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="dashboard-logo">
          🔐 SecureAuth
        </div>

        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </nav>

      <main className="dashboard-content">
        <div className="welcome-card">
          <div>
            <p className="small-title">SECURE DASHBOARD</p>

            <h1>
              Welcome, {user?.name || "User"} 👋
            </h1>

            <p>
              You have successfully logged in to your secure account.
            </p>
          </div>

          <div className="security-badge">
            🛡️ Secure
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="info-card">
            <div className="card-icon">👤</div>
            <h3>Profile</h3>
            <p>{user?.name || "User"}</p>
          </div>

          <div className="info-card">
            <div className="card-icon">📧</div>
            <h3>Email</h3>
            <p>{user?.email || "Not available"}</p>
          </div>

          <div className="info-card">
            <div className="card-icon">🔒</div>
            <h3>Authentication</h3>
            <p>JWT Protected</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;