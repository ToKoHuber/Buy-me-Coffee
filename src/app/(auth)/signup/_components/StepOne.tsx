"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const usernameValidation = z
  .string()
  .min(6, { message: "Username must be at least 6 char longs" })
  .max(20, { message: "Username cannot exceed 20 characters" })
  .regex(
    /^[a-z0-9]{6,20}$/,
    "Username must not contain special characters or uppercase letters"
  );

const formSchema = z.object({
  username: usernameValidation,
});

export const StepOne = ({ currentStep }: { currentStep: number }) => {
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const defaultVal = localStorage.getItem("username");
    if (defaultVal) setUsername(defaultVal);
  }, []);

  console.log(username);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: username,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem("username", values.username);
    router.push(`?step=${currentStep + 1}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[400px]"
      >
        <FormField
          control={form.control}
          name="username"
          defaultValue={username}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-[24px]">
                Create your account
              </FormLabel>
              <FormDescription className="text-[16px] text-[#71717A]">
                Choose a username for your page
              </FormDescription>
              <FormControl>
                <Input placeholder="Enter username here" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full ">
          Continue
        </Button>
        <div className="flex gap-4 justify-center">
          <p>Already have an account?</p>
          <Link href="/signin" className="text-[#2563EB]">
            Log in
          </Link>
        </div>
      </form>
    </Form>
  );
};
