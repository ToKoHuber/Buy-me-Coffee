"use client";
import { ProfileType } from "@/util/type";
import { useEffect, useState } from "react";

export default function Home() {
  const [profiles, setProfile] = useState<ProfileType[] | null>(null);
  const [users, setUser] = useState<ProfileType[] | null>(null);
  useEffect(() => {
    fetch("api/profile")
      .then((data) => data.json())
      .then((json) => setProfile(json.data));
    fetch("api/auth")
      .then((data) => data.json())
      .then((json) => setUser(json.data));
  }, []);
  console.log(profiles);
  console.log(users);
  return <div className="flex"></div>;
}
