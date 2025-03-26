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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months } from "@/lib/monthData";
import { years } from "@/lib/yearData";

// let data = await fetch("https://api.first.org/data/v1/countries");
// let countries = await data.json();
// console.log("printing country data", countries);

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
  FirstName: z.string().min(2, "Hamgiin bagadaa 2 usegtei baina shuu"),
  LastName: z.string().min(2, "Hamgiin bagadaa 2 usegtei baina shuu"),
  CardNumber: z.string().min(2, "Hamgiin bagadaa 2 usegtei baina shuu"),
  Expires: z.string().min(2, "Hamgiin bagadaa 2 usegtei baina shuu"),
  Year: z.string().min(2, "Hamgiin bagadaa 2 usegtei baina shuu"),
  CVC: z.string().min(2, "Hamgiin bagadaa 2 usegtei baina shuu"),
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

export function PaymentInfo() {
  const [foods, setFoods] = useState([]);
  const [foodImageFile, setFoodImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      FirstName: "",
      LastName: "",
      CardNumber: "",
      image: "",
      Expires: "",
      Year: "",
      CVC: "",
    },
  });

  const [data, setData] = useState<any>(null);

  // Use effect to fetch data asynchronously
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name"
        );
        const result = await response.json();
        setData(result);
        console.log("Printing data of countries", result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function inside the useEffect
  }, []); //

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setFoodImageFile(file);

    const tempImageUrl = URL.createObjectURL(file);
    setPreviewUrl(tempImageUrl);
    form.setValue("image", "uploaded");
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
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
        className="flex flex-col max-w-[510px] mt-[53px]"
      >
        <div className="flex flex-col gap-[6px] py-6">
          <h2 className="text-[24px] font-semibold leading-8">
            How would you like to be paid?
          </h2>
          <p>Enter location and payment details</p>
        </div>

        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select country</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {data.map((country) => {
                        return (
                          <SelectItem
                            value={country.name.common}
                            key={country.name.common}
                          >
                            {country.name.common}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {/* <Input placeholder="Enter your name here" {...field} /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="FirstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="LastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="CardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter card number</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4 justify-between">
            <FormField
              control={form.control}
              name="Expires"
              render={({ field }) => (
                <FormItem className="w-[100%]">
                  <FormLabel>Expires</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-[159px]">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => {
                          return <SelectItem value="month">{month}</SelectItem>;
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="Year"
              render={({ field }) => (
                <FormItem className="w-[100%]">
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger className="w-[159px]">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => {
                          return <SelectItem value={year}>{year}</SelectItem>;
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="CVC"
              render={({ field }) => (
                <FormItem className="w-[100%]">
                  <FormLabel>CVC</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="CVC"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
