"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Image } from "lucide-react";

// const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
// const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = "food-delivery-app";
const CLOUD_NAME = "794588517496998";

const uploadImage = async (file: File | null) => {
  if (!file) {
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("api_key", CLOUD_NAME);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();

    return result.secure_url;
  } catch (error: unknown) {
    return { error: "failed to upload image" };
  }
};

const formSchema = z.object({
  Name: z.string().min(2, "Hamgiin bagadaa 2 usegtei baina shuu"),
  About: z.string().min(2, "Hamgiin bagadaa 2 usegtei baina shuu"),
  // About: z.number(),
  image: z.string().nonempty("Zuragaa oruulna uu"),
  SocialmediaURL: z
    .string()
    .min(10, {
      message: "SocialmediaURL must be at least 10 characters.",
    })
    .max(160, {
      message: "SocialmediaURL must not be longer than 160 characters.",
    }),
});

export function ProfileInfo({ onClick }) {
  const [foods, setFoods] = useState([]);
  const [foodImageFile, setFoodImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      About: "",
      image: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setFoodImageFile(file);

    const tempImageUrl = URL.createObjectURL(file);
    setPreviewUrl(tempImageUrl);
    form.setValue("image", "uploaded");
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    onClick();
    console.log("values", values);
    // createFood(values);
  }
  // const filteredDishesCategoryId = filteredDishes[0].category._id;

  //   const getFoods = async () => {
  //     const data = await fetch("http://localhost:4000/food");
  //     // console.log("data printing", data);
  //     const jsonData = await data.json();
  //     setFoods(jsonData.getFoods || []);
  //     console.log("jsonData printing", jsonData);
  //   };
  //   useEffect(() => {
  //     getFoods();
  //   }, []);

  //   const createFood = async (values: z.infer<typeof formSchema>) => {
  //     const imageUrl = await uploadImage(foodImageFile);

  //     const data = await fetch("http://localhost:4000/food", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         Name: values.Name,
  //         price: values.About,
  //         image: imageUrl,
  //         SocialmediaURL: values.SocialmediaURL,
  //         category: `${category._id}`,
  //       }),
  //     });
  //     const jsonData = await data.json();

  //     console.log("data", jsonData);
  //     getFoods();
  //   };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 max-w-[510px] mt-[53px]"
      >
        <h2 className="text-[24px] font-semibold leading-8">
          Complete your profile page
        </h2>
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem className="flex flex-col gap-3">
              <FormLabel>Add photo</FormLabel>
              <FormControl>
                <div>
                  <label htmlFor="addNewDishImage">
                    {previewUrl ? (
                      <img
                        className="w-[100%] max-h-[138px] object-contain"
                        src={previewUrl}
                        alt=""
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-3 size-[160px] rounded-full border-[2px] border-dashed border-[#E4E4E7]">
                        <Camera className="size-7" />
                      </div>
                    )}
                  </label>
                  <Input
                    placeholder="image"
                    id="addNewDishImage"
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                    {...rest}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="Name"
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
            name="About"
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
            name="SocialmediaURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social media URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" variant="secondary">
          Continue
        </Button>
      </form>
    </Form>
  );
}
