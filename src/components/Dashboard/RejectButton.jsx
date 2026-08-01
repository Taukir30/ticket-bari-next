"use client";

import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';

const RejectButton = ({ id, endpoint }) => {

    const router = useRouter();

    const handleReject = async () => {

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/${endpoint}/${id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: 'rejected',
                    }),
                }
            );

            const data = await res.json();

            console.log(data)

            if (data.modifiedCount > 0) {
                console.log("Status updated successfully");

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Ticket has been rejected!",
                    showConfirmButton: false,
                    timer: 1500
                });

                router.refresh();
            } else {
                console.log("No changes made");
            }

        } catch (error) {
            console.error("Error updating status:", error);
        }

    }


    return (
        <div>
            <Button onClick={handleReject} variant="danger-soft" >Reject</Button>
        </div>
    );
};

export default RejectButton;