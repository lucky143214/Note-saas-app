import React, { useState } from "react";
import LoginPage from "./pages/LoginPage.js";
import NotesPage from "./pages/NotesPage.js";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div>
      {token ? (
        <NotesPage token={token} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
