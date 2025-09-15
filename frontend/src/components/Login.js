// src/components/Login.js
import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.message || "Login failed");
      else onLogin(data.token);
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <>
      <style>{`
        .login-form {
          max-width: 400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .login-form input {
          padding: 14px 18px;
          font-size: 16px;
          border: 1.5px solid #cbd5e1;
          border-radius: 6px;
          outline-offset: 3px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          font-weight: 500;
          color: #1f2937;
          background-color: #f9fafb;
        }

        .login-form input::placeholder {
          color: #9ca3af;
          font-weight: 400;
        }

        .login-form input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 8px rgba(79, 70, 229, 0.4);
          background-color: #fff;
          outline: none;
        }

        .login-form button {
          padding: 14px 18px;
          background: #4f46e5;
          color: #ffffff;
          font-size: 17px;
          font-weight: 700;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          user-select: none;
        }

        .login-form button:hover {
          background: #4338ca;
          box-shadow: 0 6px 16px rgba(67, 56, 202, 0.6);
        }

        .login-error {
          margin-top: 12px;
          color: #dc2626;
          font-weight: 600;
          font-size: 15px;
          text-align: center;
          background-color: #fee2e2;
          padding: 10px 15px;
          border-radius: 6px;
          box-shadow: inset 0 0 5px rgba(220, 38, 38, 0.3);
        }
      `}</style>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <div className="login-error">{error}</div>}
      </form>
    </>
  );
};

export default Login;