"use client";

import React from "react";
import { Card, Avatar, Spinner } from "@heroui/react";
import { useSession } from "@/lib/auth-client";

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
    <div className="max-w-md mx-auto my-16 px-4">
      <Card className="p-8 shadow-sm border border-default-100">
        <Card.Content className="flex flex-col items-center gap-4 text-center">
          <Avatar className="w-24 h-24 md:w-44 md:h-44 rounded-full overflow-hidden">
            <Avatar.Image
              alt="Sabbir Ahmed"
              src={user?.image}
              referrerPolicy="no-referrer"
              className="object-cover"
            />
            <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
          </Avatar>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground">
              {user.name || "User"}
            </h1>
            <p className="text-sm text-default-500">{user.email}</p>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ProfilePage;
