import Banner from "@/components/Banner";
import Image from "next/image";
import Advertisement from "@/components/Advertisement";
import BookingRoadmap from "@/components/BookingRoadmap";
import AboutDiscover from "@/components/AboutDiscover";
import LatestTicket from "@/components/LatestTicket";
import SearchBox from "@/components/SearchBox";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-full">
        <Banner />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-full max-w-5xl px-4 z-30">
          <SearchBox />
        </div>
      </div>

      <div className="w-full pt-30">
        <Advertisement />
      </div>

      <LatestTicket />
      <AboutDiscover />
      <BookingRoadmap />
    </div>
  );
}