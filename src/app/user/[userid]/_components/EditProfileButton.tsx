"use client";
import { useUser } from "@/app/_context/UserContext";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  about: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  socialMediaURL: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export const EditProfilebutton = () => {
  const { loggedUser } = useUser();
  const [open, setOpen] = useState(false);
  if (!loggedUser) return;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: loggedUser.profile.name,
      about: loggedUser.profile.about,
      socialMediaURL: loggedUser.profile.socialMediaURL,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Values:", values);
    if (!loggedUser) return;
    const response = await axios.patch(`/api/profile/`, {
      name: values.name,
      about: values.about,
      socialMediaURL: values.socialMediaURL,
      userId: loggedUser.id,
    });
    if (response.status !== 201) {
      toast.error(response.data.message);
      return;
    }
    toast(response.data.message);

    setOpen(false);
    form.reset();
    setOpen(false);
  }

  const closeEditProfile = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Edit page</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialMediaURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social media URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                type="button"
                onClick={closeEditProfile}
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
