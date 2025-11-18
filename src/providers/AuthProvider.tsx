import { useMemo, useState } from "react";
import { AuthContext } from "../contexts/authContext";

export default function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [token, setToken] = useState(
    localStorage.getItem("googleToken") || null,
  );

  const login = (newToken: string) => {
    localStorage.setItem("googleToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("googleToken");
    setToken(null);
  };

  const value = useMemo(
    () => ({ isAuthenticated: !!token, token, login, logout }),
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
