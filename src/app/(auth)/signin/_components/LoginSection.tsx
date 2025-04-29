"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useUser } from "@/app/_context/UserContext";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string(),
});

const LoginSection = () => {
  const { loginUser } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    loginUser(values.email, values.password);
  }

  return (
    <div className="w-[50%] flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 py-[16px]"
        >
          <div className="w-[400px] flex flex-col gap-4">
            {" "}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-[24px]">
                    Welcome back
                  </FormLabel>

                  <FormControl>
                    <div className="flex flex-col">
                      <p>Email</p>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
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
                    <div className="flex flex-col">
                      <p>Password</p>
                      <Input
                        type="Password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <br />
          <Link
            href="/forgot"
            className="underline decoration-solid text-[14px] text-[#18181B]"
          >
            Forgot password?
          </Link>

          <Button
            variant="default"
            type="submit"
            className="w-full  hover:opacity-100"
          >
            Submit
          </Button>
          <div className="flex gap-4 justify-center">
            <p>Don't have an account?</p>
            <Link href="/signup" className="text-[#2563EB]">
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginSection;
