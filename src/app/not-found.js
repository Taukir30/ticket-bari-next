"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-background text-foreground transition-colors duration-200">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-extrabold tracking-tight text-default-900">
          4 <span className="text-danger animate-pulse">0</span> 4
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-default-800">
          Page Not Found
        </h2>

        <p className="mt-3 text-sm text-default-500 leading-relaxed">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6">
          {/* সমাধান: legacyBehavior ও passHref সম্পূর্ণ ফেলে দেওয়া হয়েছে */}
          <Link href="/">
            <Button
              color="primary"
              variant="solid"
              className="font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 px-6"
            >
              Return Home
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-xs text-default-400">
          If you think this is a mistake, check the URL or go back to homepage.
        </p>
      </div>
    </div>
  );
}
