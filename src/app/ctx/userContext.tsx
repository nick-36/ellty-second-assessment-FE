"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface User {
  id: number;
  username: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  error: null,
  refreshUser: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const token = Cookies.get("jwt");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL_PROD}/auth/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data?.user);
    } catch (err) {
      setError("Failed to fetch user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [fetchUser, user]);

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      error,
      refreshUser: fetchUser,
    }),
    [user, loading, error, fetchUser]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
