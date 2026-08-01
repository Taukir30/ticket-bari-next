"use client";

import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';

const ApproveButton = ({ id, endpoint }) => {

    const router = useRouter();

    const handleApprove = async () => {

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/${endpoint}/${id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: 'approved',
                    }),
                }
            );

            const data = await res.json();

            if (data.modifiedCount > 0) {
                console.log("Status updated successfully");

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Ticket has been approved!",
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
            <Button onClick={handleApprove} className="bg-[#daf7e9] text-[#009966]" >Approve</Button>
        </div>
    );
};

export default ApproveButton;