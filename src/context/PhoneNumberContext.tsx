"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface PhoneNumberContextType {
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
}

const PhoneNumberContext = createContext<PhoneNumberContextType | undefined>(undefined);

export const PhoneNumberProvider = ({ children }: { children: ReactNode }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  return (
    <PhoneNumberContext.Provider value={{ phoneNumber, setPhoneNumber }}>
      {children}
    </PhoneNumberContext.Provider>
  );
};

export const usePhoneNumber = (): PhoneNumberContextType => {
  const context = useContext(PhoneNumberContext);
  if (!context) {
    throw new Error("usePhoneNumber must be used within a PhoneNumberProvider");
  }
  return context;
};
