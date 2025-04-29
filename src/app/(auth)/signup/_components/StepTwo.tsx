"use client";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must include at least one uppercase letter.",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must include at least one lowercase letter.",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must include at least one number.",
    }),
});

export const StepTwo = ({ currentStep }: { currentStep: number }) => {
  const [isView, setIsView] = useState(false);
  const router = useRouter();

  const username = localStorage.getItem("username");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await axios.post("/api/signup", {
      username: username,
      email: values.email,
      password: values.password,
    });

    if (response.status !== 201) {
      toast.error(response.data.message);
      return;
    }
    if (response.status === 201) {
      toast.success(response.data.message);
      router.push("/signin");
    }
  }

  const goBack = () => {
    router.push(`?step=${currentStep - 1}`);
  };

  const showHidePass = () => {
    setIsView(!isView);
  };

  return (
    <Form {...form}>
      <Button
        onClick={goBack}
        size="icon"
        variant={"outline"}
        className="w-8 h-8"
      >
        {" "}
        <ChevronLeft className="w-[15px] h-[15px]" />
      </Button>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[400px]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4">
              <div className="flex flex-col ">
                <FormLabel className="font-bold text-[24px]">
                  Welcome, {username}
                </FormLabel>
                <FormDescription className="text-[16px] text-[#71717A]">
                  Connect email and set a password
                </FormDescription>
              </div>
              <FormControl>
                <div>
                  <p>Email</p>
                  <Input
                    type="email"
                    placeholder="Enter email here"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <p>Password</p>
                  <Input
                    type={isView ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-2">
          <Checkbox
            id="password"
            className="opacity-50"
            onCheckedChange={showHidePass}
          />
          <label
            htmlFor="password"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed text-[#71717A]"
          >
            Show password
          </label>
        </div>

        <Button type="submit" className="w-full ">
          Submit
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
