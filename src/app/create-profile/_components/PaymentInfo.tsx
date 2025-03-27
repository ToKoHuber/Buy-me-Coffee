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

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months } from "@/lib/monthData";
import { years } from "@/lib/yearData";
import { CountryDropdown } from "./CountryDropdown";
import { useRouter } from "next/navigation";

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
  country: z.string().nonempty("Select coutnry to continue"),
  FirstName: z.string().nonempty("First name must match"),
  LastName: z.string().nonempty("Last name must match"),
  CardNumber: z.string().nonempty("Invalide card number"),
  Expires: z.string().nonempty("Invalide month"),
  Year: z.string().nonempty("Invalid year"),
  CVC: z
    .string()
    .length(3, "CVC must be exactly 3 digits")
    .regex(/^\d+$/, "CVC must contain only numbers"),
});

export function PaymentInfo({ onClick }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      FirstName: "",
      LastName: "",
      CardNumber: "",
      Expires: "",
      Year: "",
      CVC: "",
    },
  });

  const router = useRouter();
  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push("/home");
    console.log("values", values);
    // createFood(values);
  }

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
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select country</FormLabel>
                <CountryDropdown
                  placeholder="Country"
                  defaultValue={field.value}
                  onChange={(country) => {
                    field.onChange(country.alpha3);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="FirstName"
              render={({ field }) => (
                <FormItem className="w-[50%]">
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
                <FormItem className="w-[50%]">
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
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-[159px]">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month, index) => {
                          return (
                            <SelectItem key={index} value={month}>
                              {month}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Year"
              render={({ field }) => (
                <FormItem className="w-[100%]">
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-[159px]">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => {
                          return (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

        <Button type="submit" className="mt-6" variant="secondary">
          Continue
        </Button>
      </form>
    </Form>
  );
}
