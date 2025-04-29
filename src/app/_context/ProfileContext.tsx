"use client";
import axios from "axios";
import { createContext, type ReactNode, useContext } from "react";
import { toast } from "sonner";

type profileContextType = {
  completeProfileData: (values: {
    name: string;
    about: string;
    avatarImage: string;
    socialMediaURL: string;
    userId: string;
  }) => Promise<void>;
};

const profileContext = createContext<profileContextType>(
  {} as profileContextType
);
export const useProfile = () => useContext(profileContext);

const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const completeProfileData = async (values: {
    name: string;
    about: string;
    avatarImage: string;
    socialMediaURL: string;
    userId: string;
  }) => {
    const response = await axios.put(`/api/profile`, values);
    if (response.status !== 201) {
      toast.error(response.data.message);
      return;
    }
    toast(response.data.message);
  };

  return (
    <profileContext.Provider value={{ completeProfileData }}>
      {children}
    </profileContext.Provider>
  );
};

export default ProfileProvider;
