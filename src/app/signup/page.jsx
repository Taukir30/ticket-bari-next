"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowLeft } from "@gravity-ui/icons";
import { Radio, RadioGroup } from "@heroui/react";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Swal from "sweetalert2";

export default function SignUpPage() {
  const router = useRouter();

  const [role, setRole] = useState('user');

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const profileImg = formData.get("photo");

    console.log({
      name,
      email,
      password,
      role,
      profileImg,
    });

    // Validate image
    if (!(profileImg instanceof File) || profileImg.size === 0) {
      Swal.fire({
        icon: "error",
        title: "Photo Required",
        text: "Please select a profile photo.",
      });
      return;
    }

    // getting image data form the form
    const imageFormData = new FormData();
    imageFormData.append("image", profileImg);

    const image_API_URL = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;  //imgbb upload url

    // Upload image to ImgBB
    const imageResponse = await fetch(image_API_URL, {
      method: "POST",
      body: imageFormData,
    });

    const imageData = await imageResponse.json();

    if (!imageData.success) {
      throw new Error("Image upload failed");
    }

    const photoURL = imageData.data.url;

    console.log("Uploaded photo URL:", photoURL);

    const { data, error } = await authClient.signUp.email({
      name: name,
      email: email,
      password: password,
      image: photoURL,
      role,
      // isFraud: false,
      callbackURL: "/",
    });

    console.log("signup response:", { data, error });

    if (data) {
      Swal.fire({
        title: "Registration Successful!",
        text: "Welcome aboard! Redirecting you to home...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        router.push("/");
        router.refresh();
      });
    }

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error signing up!",
        text: error.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 bg-background transition-colors duration-200">
      <Card className="border border-divider shadow-xl mx-xl w-full max-w-md p-6 md:p-8 rounded-2xl bg-card">
        <div className="text-center mb-6">
          <h1 className="text-xl md:text-3xl font-extrabold tracking-tight bg-linear-to-r from-neutral-900 to-green-600 dark:from-white dark:to-green-400 bg-clip-text text-transparent">
            Create an Account
          </h1>
          <p className="text-sm font-bold text-default-600 mt-2">
            Join us to book tickets seamlessly
          </p>
        </div>

        <Form className="flex flex-col gap-5" onSubmit={onSubmit}>

          {/* name field */}
          <TextField isRequired name="name" type="text" className="w-full">
            <Label className="text-xs font-semibold text-default-600">
              Name
            </Label>

            <Input placeholder="Enter your full name" className="mt-1" variant="bordered" radius="md" />

            <FieldError className="text-xs text-danger mt-1" />
          </TextField>

          {/* 2. Photo Upload Field (Standalone Input) */}
          <div className="w-full">
            <label className="text-xs font-semibold text-default-600 block mb-1">
              Profile Photo <span className="text-danger">*</span>
            </label>
            <Input isrequired="true" name="photo" type="file" accept="image/*" variant="bordered" radius="md" className="w-full file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-default-100 file:text-default-700 hover:file:bg-default-200 cursor-pointer" />
            <p className="text-[10px] text-default-400 mt-1 leading-normal">
              Upload an image file (PNG, JPG, WebP up to 5MB).
            </p>
          </div>

          {/* email filed */}
          <TextField isRequired name="email" type="email" className="w-full"
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

            <Input placeholder="Enter your email address" className="mt-1" variant="bordered" radius="md" />

            <FieldError className="text-xs text-danger mt-1" />
          </TextField>

          {/* password field */}
          <TextField isRequired minLength={8} name="password" type="password" className="w-full"
            validate={(value) => {
              if (value.length < 8)
                return "Password must be at least 8 characters";
              if (!/[A-Z]/.test(value))
                return "Must contain at least one uppercase letter";
              if (!/[0-9]/.test(value))
                return "Must contain at least one number";
              return null;
            }}
          >
            <Label className="text-xs font-semibold text-default-600">
              Password
            </Label>

            <Input placeholder="Create a strong password" className="mt-1" variant="bordered" radius="md" />

            <Description className="text-[10px] text-default-400 mt-1 leading-normal">
              Must be at least 8 characters with 1 uppercase and 1 number.
            </Description>

            <FieldError className="text-xs text-danger mt-1" />
          </TextField>

          <div className="flex flex-col gap-4">
            <Label>I want to join as a</Label>
            
            <RadioGroup onChange={ value => setRole(value)} defaultValue="user" name="plan-orientation" orientation="horizontal">
              <Radio value="user">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  User
                </Radio.Content>
              </Radio>

              <Radio value="vendor">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  Vendor
                </Radio.Content>
              </Radio>
              
            </RadioGroup>
          </div>

          <div className="flex gap-3 mt-4 w-full">

            <Button type="submit" className="flex-1 font-semibold bg-linear-to-r from-neutral-900 to-green-600 dark:from-zinc-800 dark:to-green-600 text-white shadow-md hover:opacity-90 hover:scale-[1.02] transition-all duration-200" radius="md"  >
              <Check className="w-4 h-4" />
              Sign Up
            </Button>

            <Button type="reset" variant="flat" className="font-medium text-default-600 hover:bg-default-200" radius="md"   >
              Reset
            </Button>

          </div>
        </Form>

        <div className="mt-6 text-center border-t border-divider pt-4">
          <p className="text-xs text-default-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              Log In
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
