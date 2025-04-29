"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUser } from "@/app/_context/UserContext";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  successMessage: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
  userId: z.string(),
});

export const ChangeSuccessMessage = () => {
  const { loggedUser } = useUser();
  if (!loggedUser) return;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      successMessage: loggedUser.profile.successMessage || "",
      userId: JSON.stringify(loggedUser.id),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await axios.patch("/api/message", values);
    if (response.status !== 201) {
      toast.error(response.data.message);
      return;
    }

    toast(response.data.message);
  }

  return (
    <div className="max-w-[650px] border-1 rounded-md p-4 flex flex-col gap-4">
      <h2 className="font-semibold text-[16px]">Success page</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="successMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px]">
                  Confirmation message
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="Success message" {...field} />
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
