"use client";

import { useState, useEffect, useTransition } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import { ImSpinner } from "react-icons/im";
import { useUser } from "@/app/ctx/userContext";
import { Role } from "@/lib/types";

export default function ProfilePage() {
  const { user, refreshUser } = useUser();
  const [loading, startTransition] = useTransition();
  const { toast } = useToast();
  const token = Cookies.get("jwt");

  const handleRegister = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL_PROD}/auth/register`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      refreshUser();
      toast({
        title: "Success",
        description: "Successfully registered as user",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-1">
      <div className="w-full max-w-2xl mx-auto p-8">
        <div className="bg-dark-2 rounded-xl p-8">
          <h1 className="text-2xl font-bold text-light-1 mb-6">Profile</h1>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-2  items-center">
                <p className="text-light-2">Username :</p>
                <p className="text-light-1 font-medium">{user?.username}</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2  items-center">
                <p className="text-light-2">Role : </p>
                <p className="text-light-1 font-medium">{user?.role}</p>
              </div>

              {user?.role === Role.UNREGISTERED && (
                <Button
                  disabled={loading}
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    startTransition(handleRegister);
                  }}
                  className="bg-primary-500 hover:bg-primary-600"
                >
                  Register as User{" "}
                  {loading && <ImSpinner className="animate-spin" />}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
