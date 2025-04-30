import { useUser } from "@/app/_context/UserContext";
import { DonationType, UserType } from "./types";

export const sumEarnings = (timeRange: string) => {
  const { user } = useUser() as {
    user: UserType | null;
  };

  if (!user || !Array.isArray(user.donations)) {
    return 0;
  }

  const timeFilteredUsers = user?.donations?.filter(
    (donation: DonationType) => {
      const donationDate = new Date(donation.createdAt);
      const currentDate = new Date();

      const timeDifference = currentDate.getTime() - donationDate.getTime();

      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

      if (timeRange === "30days") {
        return daysDifference <= 30;
      } else if (timeRange === "90days") {
        return daysDifference <= 90;
      } else {
        return true;
      }
    }
  );

  const allEarnings = timeFilteredUsers?.reduce(
    (acc: number, donation: DonationType) => {
      return acc + donation.amount;
    },
    0
  );
  return allEarnings;
};
