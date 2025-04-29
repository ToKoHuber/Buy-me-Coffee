"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import { imageUpload } from "@/utils/imageUpload";
import { useProfile } from "@/app/_context/ProfileContext";
import { useUser } from "@/app/_context/UserContext";

const formSchema = z.object({
  avatarImage: z.string({
    message: "Please enter image",
  }),
  name: z.string().min(2).max(50),
  about: z.string(),
  socialMediaURL: z.string(),
  userId: z.string(),
});

export const ChangePersonalInfo = () => {
  const { loggedUser } = useUser();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, SetFile] = useState<File | null>(null);

  const { completeProfileData } = useProfile();

  if (!loggedUser) return;

  useEffect(() => {
    setImagePreview(loggedUser.profile.avatarImage);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatarImage: loggedUser.profile?.avatarImage || "",
      name: loggedUser.profile.name,
      about: loggedUser.profile.about,
      socialMediaURL: loggedUser.profile.socialMediaURL,
      userId: JSON.stringify(loggedUser.id),
    },
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!imagePreview && !e.target.files) {
      return alert("Та зургаа сонгоно уу 1");
    }
    if (e.target.files && e.target.files[0]) {
      const imageURL = URL.createObjectURL(e.target.files[0]);
      setImagePreview(imageURL);
      SetFile(e.target.files[0]);
    }
  };

  const deletePreview = () => {
    setImagePreview(null);
    SetFile(null);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const imageURL = await imageUpload(file);
    values.avatarImage = imageURL;
    completeProfileData({
      ...values,
    });
  }

  return (
    <div className="max-w-[650px] text-[24px] flex flex-col gap-4 border-1 rounded-md p-4">
      <h1 className="font-semibold">Personal Info</h1>{" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="avatarImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add photo</FormLabel>
                <FormControl>
                  <div className="rounded-full border-2 border-dashed w-[160px] h-[160px] flex justify-center items-center overflow-hidden">
                    {imagePreview ? (
                      <div className="flex justify-center items-center">
                        <Image
                          alt=""
                          src={imagePreview}
                          width={160}
                          height={160}
                          className=" object-cover"
                          priority
                        ></Image>
                        <Button
                          className="absolute bg-white rounded-full w-[30px] h-[30px]"
                          onClick={deletePreview}
                        >
                          <X className="absolute" color="red" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center">
                        <Input
                          type="file"
                          className="rounded-full w-full h-full border-0 opacity-0 z-200"
                          onChange={inputHandler}
                        />
                        <Camera className="absolute opacity-30" />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write about yourself here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="socialMediaURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social media URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
};
