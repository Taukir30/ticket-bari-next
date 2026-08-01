"use client";

import React from "react";
import { Card, Avatar, Spinner } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import { UpdateUserProfile } from "@/components/UpdateProfile";

const ProfilePage = () => {
  const { data, isPending, error } = useSession();
  const user = data?.user;

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spinner label="Loading profile..." color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-4">
        <Card className="border border-danger bg-danger-50 text-danger text-center p-4">
          Failed to load profile. Please try again.
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-10 p-4">
        <Card className="text-center p-6">
          <p className="text-default-600 font-medium">You are not logged in.</p>
        </Card>
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <Card className="p-8 md:p-10 shadow-md border border-default-100">
        <Card.Content className="flex flex-col items-center gap-6 text-center">
          <Avatar className="w-28 h-28 md:w-40 md:h-40 rounded-xl overflow-hidden">
            <Avatar.Image
              alt={user?.name || "User Avatar"}
              src={user?.image}
              referrerPolicy="no-referrer"
              className="object-cover"
            />
            <Avatar.Fallback>{user?.name?.charAt(0) || "U"}</Avatar.Fallback>
          </Avatar>

          <div className="space-y-3">
            <p className="bg-emerald-40 text-base text-default-700 px-3 py-2.5 rounded-md uppercase tracking-wider shadow-sm"> Role: {user?.role}</p>
            <h1 className="text-2xl font-bold text-foreground">
              Name: {user?.name || "User"}
            </h1>
            <p className="text-base text-default-500"> Email: {user?.email}</p>
          </div>

          <div className="pt-2">
            <UpdateUserProfile user={user} />
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ProfilePage;
