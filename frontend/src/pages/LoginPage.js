// src/pages/LoginPage.js
import React from "react";
import Login from "../components/Login";
import "../styles/LoginPage.css";

const sampleAccounts = [
  { email: "admin@acme.test", role: "Admin", tenant: "Acme" },
  { email: "user@acme.test", role: "Member", tenant: "Acme" },
  { email: "admin@globex.test", role: "Admin", tenant: "Globex" },
  { email: "user@globex.test", role: "Member", tenant: "Globex" },
];

const LoginPage = ({ onLogin }) => {
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Notes SaaS App</h2>

        <div className="sample-accounts">
          <h4>Sample Accounts:</h4>
          <ul>
            {sampleAccounts.map((acc, idx) => (
              <li key={idx}>
                <strong>{acc.email}</strong> ({acc.role}, {acc.tenant})
              </li>
            ))}
          </ul>
          <p>Password for all: <strong>password</strong></p>
        </div>

        <Login onLogin={onLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
