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
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export function Signup({ userName }: { userName: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, username: userName }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Submission failed");

      return { success: true, message: "User registered successfully" };
    } catch (error) {
      return { success: false, message: "aldaa garlaa" };
    }
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await handleSubmit(values); // Wait for the form submission to complete

      if (response?.success) {
        console.log("Form submitted successfully:", values);
        localStorage.setItem("email", values.email);
        localStorage.setItem("password", values.password);
        localStorage.setItem("username", userName);
        router.push("/create-profile"); // Navigate only if submission succeeds
      } else {
        console.error("Submission failed:", response?.message);
        alert(response?.message || "Form submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div>
          <h2 className="text-[24px] font-semibold leading-8 text-[#09090B]">
            Welcome, {userName}
          </h2>
          <h3 className="text-[14px] font-normal leading-5 text-[#71717A]">
            Connect email and set a password
          </h3>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-6">
              <div>
                <FormLabel>Email</FormLabel>
                <FormDescription></FormDescription>
              </div>

              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter email here"
                  {...field}
                  className="max-w-[414px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-6">
              <div>
                <FormLabel>Password</FormLabel>
                <FormDescription></FormDescription>
              </div>

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
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Form>
  );
}
