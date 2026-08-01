"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowLeft, Eye, EyeClosed } from "@gravity-ui/icons";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { GrGoogle } from "react-icons/gr";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function LoginPage() {
  const router = useRouter();

  const [passToggle, setPassToggle] = useState(true);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    console.log("Form submitted with:", userData);

    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
      rememberMe: true,
      callbackURL: "/",
    });
    console.log("sign in response:", { data, error });

    if (data) {
      toast.success("Log in Successful!");
      router.push("/");
      router.refresh();
    }

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: error.message || "Invalid email or password.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log("Google sign in triggered", data);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 bg-background transition-colors duration-200">
      <Card className="border border-divider shadow-xl mx-auto w-full max-w-md p-6 md:p-8 rounded-2xl bg-card">
        <div className="text-center mb-6">
          <h1 className="text-xl md:text-3xl font-extrabold tracking-tight bg-linear-to-r from-neutral-900 to-green-600 dark:from-white dark:to-green-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-sm font-medium text-default-500 mt-2">
            Log in to manage your tickets
          </p>
        </div>

        <Button
          onClick={handleGoogleSignIn}
          variant="bordered"
          radius="md"
          className="w-full font-medium border-divider text-default-700 hover:bg-default-100 flex items-center justify-center gap-2 h-11"
        >
          <GrGoogle className="text-base text-[#4285F4]" />
          Continue with Google
        </Button>

        <div className="relative flex py-4 items-center w-full">
          <div className="grow border-t border-divider"></div>
          <span className="shrink mx-4 text-xs text-default-400 font-medium">
            OR
          </span>
          <div className="grow border-t border-divider"></div>
        </div>

        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold text-default-600">
              Email
            </Label>
            <Input
              placeholder="john@example.com"
              className="mt-1"
              variant="bordered"
              radius="md"
            />
            <FieldError className="text-xs text-danger mt-1" />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
            className="w-full"
          >
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-default-600">
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="w-full relative">
              <Input
                placeholder="Enter your password"
                className="mt-1 w-full"
                variant="bordered"
                radius="md"
                type={passToggle? 'password' : 'text'}
              />
              <Button onClick={() => setPassToggle(!passToggle)} isIconOnly variant="secondary" className="absolute right-1 bg-transparent">
                {passToggle ? <EyeClosed></EyeClosed> : <Eye></Eye>}
              </Button>
            </div>
            <FieldError className="text-xs text-danger mt-1" />
          </TextField>

          <div className="flex gap-3 mt-4 w-full">
            <Button
              type="submit"
              className="flex-1 font-semibold bg-gradient-to-r from-neutral-900 to-green-600 dark:from-zinc-800 dark:to-green-600 text-white shadow-md hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
              radius="md"
            >
              <Check className="w-4 h-4" />
              Log In
            </Button>
            <Button
              type="reset"
              variant="flat"
              className="font-medium text-default-600 hover:bg-default-200"
              radius="md"
            >
              Reset
            </Button>
          </div>
        </Form>

        <div className="mt-6 text-center border-t border-divider pt-4">
          <p className="text-xs text-default-500">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-default-400 hover:text-foreground mt-4 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>
      </Card>
    </div>
  );
}
