import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const token = localStorage.getItem("token");

    return token ? "dashboard" : "login";
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setCurrentPage("login");
  };

  return (
    <>
      {currentPage === "login" && (
        <Login
          goToRegister={() => setCurrentPage("register")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentPage === "register" && (
        <Register
          goToLogin={() => setCurrentPage("login")}
        />
      )}

      {currentPage === "dashboard" && (
        <Dashboard
          user={user}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

export default App;