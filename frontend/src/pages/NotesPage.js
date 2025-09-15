// src/pages/NotesPage.js
import React, { useState, useEffect } from "react";
import Notes from "../components/Notes";
import Upgrade from "../components/Upgrade";
import "../styles/NotesPage.css";


const NotesPage = ({ token, onLogout }) => {
  const [notes, setNotes] = useState([]);
  const [tenantSlug, setTenantSlug] = useState("");
  const [plan, setPlan] = useState("free");
  const [upgradeNeeded, setUpgradeNeeded] = useState(false);

  const fetchNotes = async () => {
    const res = await fetch("http://localhost:4000/notes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setNotes(data);
    if (data.length >= 3 && plan === "free") setUpgradeNeeded(true);
  };

  const fetchUserInfo = () => {
    const payload = JSON.parse(atob(token.split(".")[1] || "{}"));
    setTenantSlug(payload.tenantSlug || "acme");
    setPlan(payload.tenantPlan || "free");
  };

  const handleCreate = async (title, content) => {
    const res = await fetch("http://localhost:4000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) fetchNotes();
    else setUpgradeNeeded(true);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/notes/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    fetchNotes();
  };

  const handleUpgrade = async (slug) => {
    await fetch(`http://localhost:4000/tenants/${slug}/upgrade`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    setPlan("pro");
    setUpgradeNeeded(false);
  };

  useEffect(() => {
    fetchUserInfo();
    fetchNotes();
  }, []);

  return (
    <>
      <style></style>

      <div className="notes-container">
        <header className="notes-header">
          <span>Tenant: {tenantSlug} ({plan})</span>
          <button onClick={onLogout}>Logout</button>
        </header>

        {upgradeNeeded && plan === "free" && (
          <div className="upgrade-banner">
            <span>You have reached the Free plan limit. Upgrade to Pro to add more notes.</span>
            <button onClick={() => handleUpgrade(tenantSlug)}>Upgrade to Pro</button>
          </div>
        )}

        <Notes notes={notes} onCreate={handleCreate} onDelete={handleDelete} upgradeNeeded={upgradeNeeded && plan === "free"} />
      </div>
    </>
  );
};

export default NotesPage;