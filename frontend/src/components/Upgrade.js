// src/components/Upgrade.js
import React from "react";
import "../styles/NotesPage.css";

const Upgrade = ({ tenantSlug, onUpgrade }) => {
  return (
    <div className="upgrade-banner">
      <span>You have reached the Free plan limit. Upgrade to Pro to add more notes.</span>
      <button onClick={() => onUpgrade(tenantSlug)}>Upgrade to Pro</button>
    </div>
  );
};

export default Upgrade;
