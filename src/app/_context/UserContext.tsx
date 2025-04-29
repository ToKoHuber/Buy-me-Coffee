"use client";
import type { UserType } from "@/utils/types";
import { useParams, useRouter } from "next/navigation";
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import router from "next/router";

type UserContextType = {
  loginUser: (email: string, password: string) => void;
  users: UserType[];
  loggedUser: UserType | null;
  logoutHandler: () => void;
  user: UserType | null;
  setLoggedUser: Dispatch<SetStateAction<UserType | null>>;
};

const userContext = createContext<UserContextType>({} as UserContextType);
export const useUser = () => useContext(userContext);

const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [user, setUser] = useState<UserType | null>(null);
  const [loggedUser, setLoggedUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams<{ userId: string }>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("userId");

      const fetchLoggedUser = async () => {
        if (storedUser) {
          try {
            const response = await fetch(`/api/users/${storedUser}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (!response.ok) {
              throw new Error("Failed to fetch user data");
            }

            const data = await response.json();
            console.log("Fetch user data by ID: ", data.data);

            if (data.error) {
              console.error(data.error);
              localStorage.removeItem("userId");
              router.replace("/signin");
            } else {
              setLoggedUser(data.data);
            }
          } catch (error) {
            console.error("Error fetching user:", error);

            if (error instanceof Error && error.message !== "Failed to fetch") {
              localStorage.removeItem("userId");
              router.replace("/signin");
            }
          } finally {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      };

      fetchLoggedUser();

      const fetchAllUsers = async () => {
        try {
          const response = await fetch("/api/users", {
            method: "GET",
          });

          if (response.ok) {
            const data = await response.json();
            setUsers(data || []);
          }
        } catch (error) {
          console.error("Error fetching all users:", error);
        }
      };

      fetchAllUsers();
    }
  }, [router]);

  useEffect(() => {
    const fetchUserById = async () => {
      if (!params?.userId) return;

      try {
        const response = await fetch(`/api/users/${params.userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        if (data.error) {
          console.error(data.error);
          setUser(null);
        } else {
          setUser(data.foundUser || data.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };
    if (params?.userId) {
      fetchUserById();
    }
  }, [params]);

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userId", data.user.id);

        setLoggedUser(data.user);

        if (!data.user.profile) {
          if (!data.user.bankcards[0]) {
            router.push("/createprofile?step=1");
            return;
          }
          router.push("/createprofile?step=0");
          return;
        }

        router.push("/dashboard/user/" + data.user.id);
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userId");
    setLoggedUser(null);
    router.push("/signin");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <userContext.Provider
      value={{
        loginUser,
        users,
        user,
        loggedUser,
        logoutHandler,
        setLoggedUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UsersProvider;
