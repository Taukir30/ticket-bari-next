"use client";

import React, { useEffect, useState } from "react";


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import LatestCard from "./LatestCard";

const LatestTicket = () => {
  const [latestTickets, setLatestTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/alltickets`)
      .then((res) => res.json())
      .then((data) => {
        setLatestTickets(data?.result || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tickets:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading Latest Routes...</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl text-center font-bold mb-8">Available Latest Route</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        navigation 
        pagination={{ clickable: true }} 
        autoplay={{ delay: 3000, disableOnInteraction: false }} 
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 3,
          },
        }}
        className="pb-12"
      >
        {latestTickets.map((ticket) => (
          <SwiperSlide key={ticket._id} className="h-auto flex">
            <LatestCard ticket={ticket} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LatestTicket;