"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "motion/react";

import "swiper/css/bundle";

const slidesData = [
  {
    id: 1,
    image: "/images/slider/one-bus.jpeg",
    title: "Grab Your Bus Tickets",
    subtitle: "Travel across the country safely with top-rated bus operators.",
    link: "/tickets?type=bus",
  },
  {
    id: 2,
    image: "/images/slider/two-train.jpg",
    title: "Fast & Comfortable Train Journey",
    subtitle: "Avoid traffic jams. Book your train seats instantly from home.",
    link: "/tickets?type=train",
  },
  {
    id: 3,
    image: "/images/slider/four-plain.jpg",
    title: "Fly High with TicketBari",
    subtitle: "Get exclusive discounts on domestic and international flights.",
    link: "/tickets?type=flight",
  },
  {
    id: 4,
    image: "/images/slider/three-ship.jpg",
    title: "Scenic Waterways & Launch Tickets",
    subtitle: "Enjoy a relaxing journey through the rivers of Bangladesh.",
    link: "/tickets?type=launch",
  },
];

// Inner component to handle slide active-state animations
function SlideContent({ slide }) {
  const swiperSlide = useSwiperSlide();
  const isActive = swiperSlide.isActive;

  return (
    <>
      {/* Background Image with Scale Animation */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: isActive ? 1.08 : 1 }}
        transition={{ duration: 5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${slide.image})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />

      {/* Content Container */}
      <div className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center justify-center h-full text-white px-6">
        {/* Title Fade Up */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-md"
        >
          {slide.title}
        </motion.h1>

        {/* Subtitle Fade Up */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-sm md:text-lg text-gray-200 font-medium max-w-xl drop-shadow-sm"
        >
          {slide.subtitle}
        </motion.p>

        {/* Button Scale & Fade Up */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8"
        >
          <Link href={slide.link}>
            <Button
              as="span"
              size="lg"
              radius="md"
              className="bg-linear-to-r from-emerald-500 to-neutral-950 text-white font-semibold shadow-lg hover:opacity-95 hover:scale-105 transition-all duration-200"
            >
              Book Tickets Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </>
  );
}

export default function Banner() {
  return (
    <div className="w-full h-125 md:h-150 relative overflow-hidden">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full w-full"
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full overflow-hidden">
            <SlideContent slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}