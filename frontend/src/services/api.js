const BASE_URL = "https://note-backend-gamma.vercel.app"; // Change to your Vercel backend URL after deployment

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const getNotes = async (token) => {
  const res = await fetch(`${BASE_URL}/notes`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const createNote = async (token, title, content) => {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, content })
  });
  return res.json();
};

export const deleteNote = async (token, id) => {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const upgradeTenant = async (token, tenantSlug) => {
  const res = await fetch(`${BASE_URL}/tenants/${tenantSlug}/upgrade`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};
