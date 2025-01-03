"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { NumberInput } from "@/components/number-input";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImSpinner } from "react-icons/im";
import Cookies from "js-cookie";
import { useUser } from "@/app/ctx/userContext";
import { FaCircleInfo } from "react-icons/fa6";
import { Role } from "@/lib/types";

const TreeValidation = z.object({
  startingNumber: z.number().or(
    z.string().transform((val) => {
      const num = Number(val);
      if (isNaN(num)) throw new Error("Invalid number");
      if (num < -1000000)
        throw new Error("Number must be greater than -1000000");
      if (num > 1000000) throw new Error("Number must be less than 1000000");
      return num;
    })
  ),
});

const CreateTree = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, startTransition] = useTransition();
  const { user } = useUser();

  const form = useForm<z.infer<typeof TreeValidation>>({
    resolver: zodResolver(TreeValidation),
    defaultValues: {
      startingNumber: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof TreeValidation>) {
    try {
      const token = Cookies.get("jwt");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL_PROD}/trees`,
        {
          startingNumber: values.startingNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Tree created successfully!",
        });
        router.push("/");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create tree",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex w-full items-center justify-center bg-dark-1">
      <div className="w-full min-w-lg max-w-lg space-y-8 rounded-xl bg-dark-2 p-8">
        {user?.role !== Role.REGISTERED ? (
          <div className="p-4 rounded-lg bg-dark-3 border border-gray-700">
            <span className="text-gray-500 flex items-center gap-2">
              <FaCircleInfo />
              Register to create new thread
            </span>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-light-1">
                Start New Thread
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Enter a number to begin your thread
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-8 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="startingNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base-semibold text-light-2">
                        Starting Number
                      </FormLabel>
                      <FormControl>
                        <NumberInput
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Enter a number"
                          className="rounded-lg border border-gray-700 bg-dark-3 px-4 py-3 text-light-1 focus:border-primary-500 focus:ring-primary-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={loading}
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    startTransition(() => onSubmit(form.getValues()));
                  }}
                  className="w-full rounded-lg bg-primary-500 py-3 text-light-1 hover:bg-primary-600 transition-colors"
                >
                  Create Thread{" "}
                  {loading && <ImSpinner className="animate-spin" />}
                </Button>
              </form>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateTree;
