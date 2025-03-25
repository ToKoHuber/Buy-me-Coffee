"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "At least one uppercase letter")
    .regex(/[a-z]/, "At least one lowercase letter")
    .regex(/\d/, "At least one number")
    .regex(/[@$!%*?&]/, "At least one special character (@$!%*?&)"),
});

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push("/");
    console.log(values);
  }
  // ...

  return (
    <div className="w-[50%] v-[100vh] flex justify-center items-center relative">
      <Button
        className="absolute top-[32px] right-[108px]"
        onClick={() => router.push("/signup")}
      >
        Sign up
      </Button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <h2 className="text-[24px] font-semibold leading-8 text-[#09090B]">
            Welcome back
          </h2>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel>Email</FormLabel>
                  <FormDescription></FormDescription>
                </div>

                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="button"
            className=" text-gray-500"
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          >
            {showPassword ? (
              <div className="flex gap-2 items-center">
                <EyeOff size={16} />
                <p> Hide password</p>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <Eye size={16} />
                <p>Show Password</p>
              </div>
            )}
          </button>
          <Button type="submit">Continue</Button>
        </form>
      </Form>
    </div>
  );
}
