"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

type BankCardContextType = {
  completeBankCardData: (values: {
    country: string;
    firstName: string;
    lastName: string;
    cardNumber: string;
    month: string;
    year: string;
    cvc: string;
  }) => Promise<void>;
};

const bankCardContext = createContext<BankCardContextType>(
  {} as BankCardContextType
);
export const useBankCard = () => useContext(bankCardContext);

const BankCardProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [storedUserId, setStoredUserId] = useState<string | null>(null);

  useEffect(() => {
    setStoredUserId(localStorage.getItem("userId"));
  }, []);

  const completeBankCardData = async (values: {
    country: string;
    firstName: string;
    lastName: string;
    cardNumber: string;
    month: string;
    year: string;
    cvc: string;
  }) => {
    const response = await axios.post("api/bankcard", {
      ...values,
      storedUserId,
    });

    if (response.status !== 201) {
      toast.error(response.data.message);
      return;
    }
    if (response.status === 201) {
      toast.success(response.data.message);
      router.push("/");
    }
  };

  return (
    <bankCardContext.Provider value={{ completeBankCardData }}>
      {children}
    </bankCardContext.Provider>
  );
};

export default BankCardProvider;
