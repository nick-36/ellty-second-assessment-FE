"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";

const ErrorPage = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.log(error);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center  w-full min-h-screen gap-4">
      <h2 className="text-destructive text-3xl">Something Went Wrong!</h2>
      <Button asChild>
        <Link href={"/"}>Go Back To Home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
