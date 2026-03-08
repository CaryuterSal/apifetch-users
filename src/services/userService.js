const BASE = "https://fakestoreapi.com";

const fetchWithData = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return { data };
};

export const loginService = (username, password) =>
  fetchWithData(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

export const getAllUsers = () => fetchWithData(`${BASE}/users`);

export const getUserById = (id) => fetchWithData(`${BASE}/users/${id}`);

export const deleteUser = (id) =>
  fetchWithData(`${BASE}/users/${id}`, { method: "DELETE" });

export const createUser = (userData) =>
  fetchWithData(`${BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
