"use client";
import { BankCardType, DonationType, ProfileType, UserType } from "@/util/type";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

export default function Home() {
  const [profiles, setProfile] = useState<ProfileType[] | null>(null);
  const [users, setUser] = useState<UserType[] | null>(null);
  const [donaitons, setDonation] = useState<DonationType[] | null>(null);
  const [bankCards, setBankCards] = useState<BankCardType[] | null>(null);
  useEffect(() => {
    fetch("api/profile")
      .then((data) => data.json())
      .then((json) => setProfile(json.data));
    fetch("api/auth")
      .then((data) => data.json())
      .then((json) => setUser(json.data));
    fetch("api/donation")
      .then((data) => data.json())
      .then((json) => setDonation(json.data));
    fetch("api/bank-card")
      .then((data) => data.json())
      .then((json) => setBankCards(json.data));
    // fetch("api/bank-card")
    //   .then((data) => data.json())
    //   .then((json) => setBankCards(json.data));
  }, []);
  // console.log("Printing profile data", profiles);
  // console.log("Printing user data", users);
  console.log("Printing donation data", donaitons);
  const user = users?.[0];
  console.log("Printing user data", user);
  console.log("Printing user id", user?.id);
  const [totalDonation, setTotalDonation] = useState<number>(0);
  function getDonationTotal() {
    setTotalDonation(0);
    donaitons?.map((donation) => {
      if (donation.recipientId === user?.id) {
        setTotalDonation((prevTotal) => prevTotal + donation.amount);
      }
    });
  }
  useEffect(() => {
    getDonationTotal();
  }, [donaitons, user?.id]);

  console.log("Printing total", totalDonation);

  // console.log("Printing bankCards data", bankCards);
  return (
    <div>
      {/* <Navigation /> */}
      {/* <CreateProfile /> */}
    </div>
  );
}
