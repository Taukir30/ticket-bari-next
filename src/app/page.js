import Banner from "@/components/Banner";
import Image from "next/image";
import Advertisement from "@/components/Advertisement";
import BookingRoadmap from "@/components/BookingRoadmap";
import AboutDiscover from "@/components/AboutDiscover";
import LatestTicket from "@/components/LatestTicket";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Banner />
      <Advertisement />
      <LatestTicket />  
      <AboutDiscover />
      <BookingRoadmap />
    </div>
  );
}
