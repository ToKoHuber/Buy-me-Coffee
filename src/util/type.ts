export type ProfileType = {
  id: number;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
  backgroundImage: string;
  successMessage: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type BankCardType = {
  id: number; // Unique identifier for the bank card
  country: string; // The country where the card was issued
  firstName: string; // First name on the card
  lastName: string; // Last name on the card
  cardNumber: number; // Card number (typically masked or encrypted in real applications)
  expiryDate: string; // Expiry date of the card (formatted as "MM/YY")
  userId: number; // The ID of the user who owns the card
  createdAt: Date; // Date when the card record was created
  updatedAt: Date; // Date when the card record was last updated
};

export type UserType = {
  id: number;
  email: string;
  password: string;
  username: string;
  receivedDonations: number;
  profile: Profile | null; // Profile is optional or can be null if not linked
  bankCard: BankCard | null; // BankCard is optional or can be null if not linked
  createdAt: Date;
  updatedAt: Date;
};

export type DonationType = {
  id: number; // Unique identifier for the donation
  amount: number; // The donation amount
  specialMessage: string; // A special message from the donor (optional)
  socialURLOrBuyMeACoffee: string; // URL to social media or BuyMeACoffee page
  donorId: number; // The ID of the donor (User who made the donation)
  recipientId: number; // The ID of the recipient (User who received the donation)
  createdAt: Date; // The date when the donation was made
  updatedAt: Date; // The date when the donation record was last updated
};

export type UserDataType = {
  email: string;
  password: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  profile: {
    name: string;
    about: string;
    avatarImage: string;
    socialMediaURL: string;
    backgroundImage: string;
    successMessage: string;
    createdAt: Date;
    updatedAt: Date;
  };
  bankCard: {
    country: string;
    firstName: string;
    lastName: string;
    cardNumber: string;
    expiryDate: Date;
    createdAt: Date;
    updatedAt: Date;
  };
  receivedDonations: {
    amount: number;
    specialMessage: string;
    socialURLOrBuyMeACoffee: string;
    donorId: number;
    recipientId: number;
    createdAt: Date;
    updatedAt: Date;
  };
};
