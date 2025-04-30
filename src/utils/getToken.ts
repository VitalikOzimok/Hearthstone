export const getToken = (): string | null => {
  try {
    const authData = localStorage.getItem("auth");
    if (!authData) return null;

    const parsed = JSON.parse(authData);
    return parsed.token || null;
  } catch {
    return null;
  }
};
