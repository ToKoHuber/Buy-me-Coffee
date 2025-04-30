"use client";
import { useUser } from "@/app/_context/UserContext";
import { UserType } from "@/utils/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { imageUpload } from "@/utils/imageUpload";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";

export const BackgroundImage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bgImagePreview, setBgImagePreview] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  const { user, loggedUser } = useUser() as {
    user: UserType | null;
    loggedUser: { id: number } | null;
  };

  useEffect(() => {
    if (user !== null) {
      setIsLoading(false);
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBgImagePreview(imageUrl);
    }
    setFile(file || null);
  };

  const handleImageUpload = async () => {
    if (!file) return;
    const imageURL = await imageUpload(file);

    const response = await axios.patch("/api/profile", {
      backgroundImage: imageURL,
      userId: loggedUser?.id,
    });
    if (response.status !== 201) {
      toast.error(response.data.message);
      return;
    }
    toast(response.data.message);

    setBgImagePreview(null);
    setFile(null);
    router.refresh();
  };

  const cancelImageUpload = () => {
    setBgImagePreview(null);
  };

  const canEdit = user && loggedUser?.id === user.id;

  return (
    <div className="flex justify-center items-center w-full relative">
      {bgImagePreview ? (
        <div className="relative w-full">
          <Image
            alt="cover"
            src={bgImagePreview}
            width={1920}
            height={1080}
            style={{ width: "100vw", height: "320px", objectFit: "cover" }}
          />
          <div className="flex gap-4 absolute right-10 top-20">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={handleImageUpload}
            >
              Save changes
            </Button>
            <Button className="cursor-pointer" onClick={cancelImageUpload}>
              Cancel
            </Button>
          </div>
        </div>
      ) : user?.profile.backgroundImage ? (
        <div className="relative w-full">
          <Image
            alt="cover"
            src={user.profile.backgroundImage}
            width={1920}
            height={1080}
            style={{ width: "100vw", height: "320px", objectFit: "cover" }}
          />
          {canEdit && (
            <div className="absolute right-10 top-20 w-[150px] h-12  group">
              <Button className="w-full h-full flex items-center justify-center gap-2 pointer-events-none">
                <Camera />
                <p>Change cover</p>
              </Button>

              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
            </div>
          )}
        </div>
      ) : canEdit ? (
        <div className="bg-[#4FBDA1] h-[320px] w-full flex justify-center items-center">
          <div className="relative w-[150px]">
            <Button className="w-full h-12">Add a cover image</Button>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <div className="bg-[#4FBDA1] h-[320px] w-full" />
      )}
    </div>
  );
};
