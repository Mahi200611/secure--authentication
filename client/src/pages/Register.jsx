import { useState } from "react";
import axios from "axios";
import "./Auth.css";

function Register({ goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(response.data.message || "Registration successful!");

      goToLogin();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="logo">🔐 SecureAuth</div>

        <div className="welcome-content">
          <h1>Create Account!</h1>

          <p>
            Create your secure account and protect your information safely.
          </p>

          <div className="features">
            <p>✓ Secure Authentication</p>
            <p>✓ Protected Account</p>
            <p>✓ Encrypted Passwords</p>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="form-container">
          <h1>Register</h1>

          <p className="subtitle">
            Create your account to get started
          </p>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleRegister}>
            Create Account
          </button>

          <p className="switch-page">
            Already have an account?{" "}
            <span onClick={goToLogin}>
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;