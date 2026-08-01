"use client";

import { useSession } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';
import LoadingSpinner from '../LoadingSpinner';

const UserAction = ({ user }) => {

    const router = useRouter();
    const { data, isPending } = useSession();
    const currentUser = data?.user;

    if (isPending) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (!currentUser) {
        return <h2>Unauthorized!</h2>
    }

    // console.log(user.email)

    // make admin button fuction
    const makeAdmin = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${user._id}/role`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role: 'admin',
                }),
            }
        );
        const resData = await res.json();
        // console.log(resData)
        if (resData.modifiedCount > 0) {
            console.log("Status updated successfully");

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Assigned as admin!",
                showConfirmButton: false,
                timer: 1500
            });
            router.refresh();
        } else {
            console.log("No changes made");
        }
    }

    // make vendor button fuction
    const makeVendor = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${user._id}/role`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role: 'vendor',
                }),
            }
        );
        const resData = await res.json();
        // console.log(resData)
        if (resData.modifiedCount > 0) {
            console.log("Status updated successfully");

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Assigned as vendor!",
                showConfirmButton: false,
                timer: 1500
            });
            router.refresh();
        } else {
            console.log("No changes made");
        }
    }

    const removeAdmin = async () => {

        if (currentUser.email === user.email) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Can not remove yourself from admin!",
                footer: "<a href=\"#\">Why do I have this issue?</a>"
            });
            return
        }

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${user._id}/role`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role: 'user',
                }),
            }
        );
        const resData = await res.json();
        // console.log(resData)
        if (resData.modifiedCount > 0) {
            console.log("Status updated successfully");

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Assigned as user!",
                showConfirmButton: false,
                timer: 1500
            });
            router.refresh();
        } else {
            console.log("No changes made");
        }
    }

    // handle fraud function
    const markFraud = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${user._id}/fraud`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    isFraud: true,
                }),
            }
        );
        const resData = await res.json();
        // console.log(resData)
        if (resData.userResult.modifiedCount > 0) {
            console.log("Status updated successfully");

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Marked as fraud!",
                showConfirmButton: false,
                timer: 1500
            });
            router.refresh();
        } else {
            console.log("No changes made");
        }
    }

    const unmarkFraud = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${user._id}/fraud`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    isFraud: false,
                }),
            }
        );
        const resData = await res.json();
        // console.log(resData)
        if (resData.userResult.modifiedCount > 0) {
            console.log("Status updated successfully");

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Unmarked as fraud!",
                showConfirmButton: false,
                timer: 1500
            });
            router.refresh();
        } else {
            console.log("No changes made");
        }
    }



    return (
        <div>
            {user.role === "user" ? (
                <div className="flex gap-1">
                    <Button onClick={makeAdmin}>
                        Make Admin
                    </Button>

                    <Button onClick={makeVendor} variant="secondary">
                        Make Vendor
                    </Button>
                </div>
            ) : user.role === "vendor" ? (
                <div className="flex gap-1">
                    <Button onClick={makeAdmin}>
                        Make Admin
                    </Button>

                    <Button variant="danger-soft">
                        Remove Vendor
                    </Button>

                    <Button
                        onClick={user.isFraud ? unmarkFraud : markFraud}
                        variant={user.isFraud ? "secondary" : "danger"}
                    >
                        {user.isFraud ? "Unmark Fraud" : "Mark as Fraud"}
                    </Button>
                </div>
            ) : (
                <div className="flex gap-1">
                    {user.role === "admin" ? (
                        <Button onClick={removeAdmin} variant="danger-soft">
                            Remove Admin
                        </Button>
                    ) : (
                        <Button onClick={removeAdmin} variant="secondary">
                            Make User
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserAction;