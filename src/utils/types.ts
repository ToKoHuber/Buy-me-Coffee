export type DonationType = {
  reduce(
    arg0: (acc: number, donation: DonationType) => number,
    arg1: number
  ): unknown;
  id: number;
  donorName: string;
  amount: number;
  donorImage: string;
  specialMessage: string;
  socialURLOrBuyMeACoffee: string;
  donorId: number;
  recipientid: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Profile = {
  id: number;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
  backgroundImage: string;
  userId: number;
  successMessage: string;
  coverImg: string;
};

export type BankCard = {
  expiryYear: string | undefined;
  expiryMonth: string | undefined;
  id: number;
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: string;
  userId: number;
  cvc: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserType = {
  id: number;
  email: string;
  password: string;
  username: string;
  donations: DonationType[] | null;
  profile: Profile;
  bankcard: BankCard;
};
