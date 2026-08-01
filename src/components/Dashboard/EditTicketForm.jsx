"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';


const EditTicketForm = ({ id }) => {

    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const { data, isPending } = useSession();
    const user = data?.user;

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/tickets/${id}`
                );

                const data = await res.json();
                setTicket(data);
            } catch (error) {
                console.error("Failed to fetch ticket:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTicket();
    }, [id]);


    const handleSubmit = (e) => {

    }

    console.log(ticket)

    if (isPending || loading) {
        return <div className="flex items-center justify-center w-8 h-8 mx-auto">
            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></span>
        </div>
    }

    if (!ticket) {
        return <p>Ticket not found</p>;
    }

    return (
        <div className="w-[80%] mx-auto my-1 font-sans">

            <h1 className="mb-5 text-xl font-bold tracking-wide">Update Ticket</h1>

            {/* FORM CONTAINER CARD (Matches Table Container in Dashboard) */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
                {/* Form Header */}
                <div className="mb-8 pb-4 border-b border-slate-100 flex items-center justify-between">
                    <div>

                        <p className="text-base tracking-wide font-semibold mt-1">
                            Edit and update this ticket.
                        </p>
                    </div>

                    {/* Verification Status Badge (Initial State) */}
                    <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        <span>Status: {ticket.verification_status}</span>
                    </div>
                </div>

                {/* MAIN FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* 1. Ticket Title */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Ticket Title <span className="text-emerald-600">*</span>
                        </label>
                        <input
                            type="text"
                            name="ticket_title"
                            required
                            defaultValue={ticket.ticket_title}
                            placeholder="e.g., Premium Intercity Express (AC Sleeper)"
                            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                        />
                    </div>

                    {/* 2. From & To Locations (2 Columns) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                From (Location) <span className="text-emerald-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="from_location"
                                required
                                defaultValue={ticket.from_location}
                                placeholder="e.g., Dhaka"
                                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                To (Location) <span className="text-emerald-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="to_location"
                                required
                                defaultValue={ticket.to_location}
                                placeholder="e.g., Chittagong"
                                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* 3. Transport Type, Price, & Quantity (3 Columns) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* Transport Type */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                Transport Type <span className="text-emerald-600">*</span>
                            </label>
                            <select
                                name="transport_type"
                                required
                                defaultValue={ticket.transport_type}
                                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all appearance-none cursor-pointer"
                            >
                                <option value="" isdisabled="true">
                                    Select type
                                </option>
                                <option value="Bus">Bus</option>
                                <option value="Train">Train</option>
                                <option value="Flight">Flight</option>
                                <option value="Ferry">Ferry</option>
                            </select>
                        </div>

                        {/* Price (per unit) */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                Price / Unit ($) <span className="text-emerald-600">*</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                min={1}
                                required
                                defaultValue={ticket.price}
                                placeholder="e.g., 25"
                                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                            />
                        </div>

                        {/* Ticket Quantity */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                Ticket Quantity <span className="text-emerald-600">*</span>
                            </label>
                            <input
                                type="number"
                                name="ticket_quantity"
                                min={1}
                                required
                                defaultValue={ticket.ticket_quantity}
                                placeholder="e.g., 40"
                                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* 4. Departure Date & Time + Image Upload (2 Columns) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Departure Date & Time */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                Departure Date &amp; Time{" "}
                                <span className="text-emerald-600">*</span>
                            </label>
                            <input
                                type="datetime-local"
                                name="departure_date_time"
                                required
                                defaultValue={ticket.departure_date_time}
                                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                            />
                        </div>

                        {/* Image Upload (ImgBB File Picker) */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                Ticket Image (ImgBB) <span className="text-emerald-600">*</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                required
                                name="ticket_image"
                                className="w-full px-3 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 file:mr-4 file:py-1.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* 5. Perks Checkboxes */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Included Perks
                        </label>
                        <div className="flex flex-wrap gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                                <input
                                    type="checkbox"
                                    name="perks"
                                    value="AC"
                                    defaultChecked={ticket.perks?.includes("AC")}
                                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                                />
                                <span>AC</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                                <input
                                    type="checkbox"
                                    name="perks"
                                    value="Breakfast"
                                    defaultChecked={ticket.perks?.includes("Breakfast")}
                                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                                />
                                <span>Breakfast</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                                <input
                                    type="checkbox"
                                    name="perks"
                                    value="WiFi"
                                    defaultChecked={ticket.perks?.includes("WiFi")}
                                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                                />
                                <span>WiFi</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                                <input
                                    type="checkbox"
                                    name="perks"
                                    value="Water Bottle"
                                    defaultChecked={ticket.perks?.includes("Water Bottle")}
                                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                                />
                                <span>Water Bottle</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                                <input
                                    type="checkbox"
                                    name="perks"
                                    value="Snacks"
                                    defaultChecked={ticket.perks?.includes("Snacks")}
                                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                                />
                                <span>Snacks</span>
                            </label>
                        </div>
                    </div>

                    {/* 6. Readonly Vendor Information (Pulled from logged-in session) */}
                    <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200/80 space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            Vendor Credentials (Auto-filled)
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Vendor Name (Readonly) */}
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                    Vendor Name
                                </label>
                                <input
                                    type="text"
                                    name="vendor_name"
                                    defaultValue={user?.name}
                                    readOnly
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-200/60 border border-slate-300/60 text-xs font-bold text-slate-600 cursor-not-allowed select-none"
                                />
                            </div>

                            {/* Vendor Email (Readonly) */}
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                    Vendor Email
                                </label>
                                <input
                                    type="email"
                                    name="vendor_email"
                                    defaultValue={user?.email}
                                    readOnly
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-200/60 border border-slate-300/60 text-xs font-bold text-slate-600 cursor-not-allowed select-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 7. Submit Action Button */}
                    <div className="pt-4 flex gap-5 items-center">

                        <button type="submit" className="w-full bg-linear-to-r from-[#00a877] to-[#0a3629] text-white font-bold text-sm py-4 rounded-full flex items-center justify-center gap-2 shadow-md hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"  >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Update
                        </button>

                        <Link href='/dashboard/addedtickets' className='button h-12.5 w-full bg-red-200 text-red-700' >Cancel</Link>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTicketForm;