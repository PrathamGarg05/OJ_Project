import { createContext, useState, useEffect } from "react";
import { logout, myProfile } from "../services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await myProfile();
        if (res) {
          const data = res.data.data;
          console.log(data);
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const userLogout = async() => {
    await logout();
    setUser(null);
  }

//   const logout = async () => {
//     await fetch("/api/logout", {
//       method: "POST",
//       credentials: "include",
//     });
//     setUser(null);
//   };

  return (
    <AuthContext.Provider value={{ user,setUser, loading ,userLogout, setLoading}}>
      {children}
    </AuthContext.Provider>
  );
};
