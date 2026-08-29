import { useState } from "react";
import axios from "axios";
import "./Auth.css";

function Login({ goToRegister,onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
localStorage.setItem("user", JSON.stringify(response.data.user));

onLoginSuccess(response.data.user);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="logo">🔐 SecureAuth</div>

        <div className="welcome-content">
          <h1>Welcome Back!</h1>

          <p>
            Access your secure account and manage your information safely.
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
          <h1>Sign In</h1>

          <p className="subtitle">
            Enter your details to access your account
          </p>

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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="options">
            <label className="remember">
              <input type="checkbox" />
              Remember me
            </label>

            <span className="forgot">Forgot password?</span>
          </div>

          <button onClick={handleLogin}>
            Sign In
          </button>

          <p className="switch-page">
            Don't have an account?{" "}
            <span onClick={goToRegister}>
              Register Now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;