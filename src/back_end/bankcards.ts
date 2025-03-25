import { BankCardType } from "@/util/type";

export const getBankCards = async (): Promise<BankCardType[]> => {
  return [
    {
      id: 1,
      country: "Mongolia",
      firstName: "altantogoo",
      lastName: "batbold",
      cardNumber: 1234567890,
      expiryDate: Date(),
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      country: "USA",
      firstName: "john",
      lastName: "doe",
      cardNumber: 2345678901,
      expiryDate: Date(),
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      country: "Germany",
      firstName: "anna",
      lastName: "schmidt",
      cardNumber: 3456789012,
      expiryDate: Date(),
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      country: "France",
      firstName: "lucas",
      lastName: "dubois",
      cardNumber: 4567890123,
      expiryDate: Date(),
      userId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      country: "Japan",
      firstName: "sakura",
      lastName: "tanaka",
      cardNumber: 5678901234,
      expiryDate: Date(),
      userId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 6,
      country: "India",
      firstName: "arjun",
      lastName: "sharma",
      cardNumber: 6789012345,
      expiryDate: Date(),
      userId: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
};
