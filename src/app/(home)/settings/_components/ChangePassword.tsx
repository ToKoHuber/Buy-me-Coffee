"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
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
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Нууц үгүүдийг өөр өөрөөр бичсэн байна",
    path: ["confirm"], // path of error
  });

export const ChangePassword = () => {
  const [isView, setIsView] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await axios.patch("/api/password", values);
    if (response.status !== 201) {
      toast.error(response.data.message);
      return;
    }

    toast(response.data.message);
  }

  const showHidePass = () => {
    setIsView(!isView);
  };

  return (
    <div className="max-w-[650px] border-1 rounded-md p-4 flex flex-col gap-4">
      <h2>Set a new password </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px]">New password</FormLabel>
                <FormControl>
                  <Input
                    type={isView ? "text" : "password"}
                    placeholder="Enter new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px]">Confirm password</FormLabel>
                <FormControl>
                  <Input
                    type={isView ? "text" : "password"}
                    placeholder="Confirm password"
                    {...field}
                  />
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
          <Button type="submit" className="w-full">
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
};
