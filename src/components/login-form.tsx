"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const formSchema = z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email address" }),
    password: z.string().min(4, {
      message: "Password needs 4 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL_DEV}/auth/login`,
        {
          email: values.email,
          password: values.password,
        }
      );

      if (response.data.status === "success") {
        Cookies.set("jwt", response.data.token, {
          path: "/",
        });

        toast({
          title: "Account created successfully",
          description: "Welcome to the application!",
          variant: "default",
        });

        router.push("/");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription className="text-sm text-gray-1">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-2">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            className="account-form_input"
                            placeholder="example@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is your public email.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            className="account-form_input"
                            placeholder="****"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full bg-primary-500">
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center text-sm text-gray-1">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
