"use client";

import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';

const AdvertiseButton = ({ data }) => {

    const router = useRouter();

    console.log(data)

    // advertise button function------------
    const handleAd = async () => {

        const popularRes = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/populartickets`);
        const popResData = await popularRes.json();

        if (popResData.length > 5) {
            Swal.fire({
                icon: "error",
                title: "Maximum advertise limit reached!",
                text: "Please unadvertise one first.",
                footer: "<a href=\"#\">Why do I have this issue?</a>"
            });

            return;
        }

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/tickets/${data._id}/advertise`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    isAdvertise: true,
                }),
            }
        );
        const resData = await res.json();

        console.log(popResData)

        if (resData.modifiedCount > 0) {
            console.log("Status updated successfully");

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Ticket successfully advertised!",
                showConfirmButton: false,
                timer: 1500
            });

            router.refresh();
        } else {
            console.log("No changes made");
        }

    }

    // unadvertise button function------------
    const handleUnd = async () => {

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/tickets/${data._id}/advertise`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    isAdvertise: false,
                }),
            }
        );
        const resData = await res.json();

        console.log(resData)

        if (resData.modifiedCount > 0) {
            console.log("Status updated successfully");

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Ticket successfully unadvertised!",
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
            {data.isAdvertise
                ? <Button onClick={handleUnd} className='font-semibold bg-red-200 text-red-700'> Unadveritse </Button>
                : <Button onClick={handleAd} className='font-semibold bg-green-200 text-green-700'> Adveritse </Button>}
        </div>
    );
};

export default AdvertiseButton;