"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


const inputClassName =
  "w-full rounded-xl border border-slate-300 bg-white/80 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-zinc-900/70 dark:text-slate-100";

const AllTicketPage = () => {

  const router = useRouter();
  const { data, isPending } = useSession();
  const user = data?.user;

  // console.log(user)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    // const ticketData = Object.fromEntries(formData.entries());

    const ticket_title = formData.get("ticket_title");
    const from_location = formData.get("from_location");
    const to_location = formData.get("to_location");
    const transport_type = formData.get("transport_type");
    const price = Number(formData.get("price"));
    const ticket_quantity = Number(formData.get("ticket_quantity"));
    const departure_date_time = new Date(formData.get("departure_date_time")).toISOString();
    const perks = formData.getAll("perks");
    const imageFile = formData.get("ticket_image");

    // converting the image into formData
    const imageFormData = new FormData();
    imageFormData.append("image", imageFile);

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

    const image_url = imageData.data.url;

    console.log("Uploaded photo URL:", image_url);

    // Read all normal values
    const ticketData = {
      status: "pending",
      ticket_title,
      from_location,
      to_location,
      transport_type, price,
      ticket_quantity,
      departure_date_time,
      perks,
      image_url,
      vendor_name: user.name,
      vendor_email: user.email,
      isAdvertise: false,
      created_at: new Date()
    };

    console.log(ticketData);

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addticket`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(ticketData)
    })

    const resdata = await res.json();

    console.log(resdata);

    if (resdata.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Ticket submitted for approval!",
        showConfirmButton: false,
        timer: 1000
      });

      router.push("/dashboad/addedtickets");
    }

    e.target.reset();
  }


  if (isPending) {
    return <div className="flex items-center justify-center w-8 h-8 mx-auto">
      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></span>
    </div>
  }

  if (user.isFraud) {
    return  <div className="w-[90%] md:w-[80%] mx-auto bg-white rounded-3xl p-5 md:p-8 border border-slate-200/80 shadow-sm">
      <h2 className="text-sm md:text-base tracking-wide font-semibold">Marked as Fraud, Can not add ticket!</h2>
    </div>
  }

  return (
    <div className="w-[90%] md:w-[80%] mx-auto font-sans">

      <h1 className="mb-5 font-semibold text-neutral-600 dark:text-white text-2xl tracking-wide">Add New Ticket</h1>

      {/* FORM CONTAINER CARD (Matches Table Container in Dashboard) */}
      <div className="bg-white rounded-3xl p-5 md:p-8 border border-slate-200/80 shadow-sm">
        {/* Form Header */}
        <div className="mb-8 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>

            <p className="text-sm md:text-base tracking-wide font-semibold">
              Create a new ticket listing for approval and publishing.
            </p>
          </div>

          {/* Verification Status Badge (Initial State) */}
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">
            <span>Status: Pending</span>
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
                  defaultValue="AC"
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                />
                <span>AC</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  name="perks"
                  defaultValue="Breakfast"
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                />
                <span>Breakfast</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  name="perks"
                  defaultValue="WiFi"
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                />
                <span>WiFi</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  name="perks"
                  defaultValue="Water Bottle"
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                />
                <span>Water Bottle</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  name="perks"
                  defaultValue="Snacks"
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
          <div className="pt-4">

            <button type="submit" className="w-full bg-linear-to-r from-[#00a877] to-[#0a3629] text-white font-bold text-sm py-4 rounded-full flex items-center justify-center gap-2 shadow-md hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"  >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Ticket
            </button>

          </div>
        </form>
      </div>
    </div>

  );
};

export default AllTicketPage;