import { useMemo, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [token, setToken] = useState(
    localStorage.getItem("googleToken") || null,
  );
  const navigate = useNavigate();

  const login = (newToken: string) => {
    localStorage.setItem("googleToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("googleToken");
    setToken(null);
    navigate("/login");
  };

  const value = useMemo(
    () => ({ isAuthenticated: !!token, token, login, logout }),
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
