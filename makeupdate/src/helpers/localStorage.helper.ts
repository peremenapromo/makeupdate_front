export async function getTokenFromLocalStorage(): Promise<string> {
  try {
    const data = localStorage.getItem("accessToken");
    return data ? JSON.parse(data) : "";
  } catch (error) {
    console.error("Error getting token from localStorage:", error);
    return "";
  }
}

export async function setTokenToLocalStorage(
  key: string,
  token: string,
): Promise<void> {
  try {
    localStorage.setItem(key, JSON.stringify(token));
  } catch (error) {
    console.error("Error setting token to localStorage:", error);
  }
}

export async function removeTokenFromLocalStorage(
  key: string,
): Promise<void> {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing token from localStorage:", error);
  }
}
