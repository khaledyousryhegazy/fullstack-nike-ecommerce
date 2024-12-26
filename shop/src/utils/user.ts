const storedUser =
  typeof window !== "undefined" ? localStorage.getItem("user") || null : null;

export const user = storedUser ? JSON.parse(storedUser) : null;
