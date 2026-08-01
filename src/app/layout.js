import NextThemeProvider from "@/providers/NextThemeProvider";
import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "TicketBari - Book Bus, Train, Launch & Flight Tickets Online",
  description:
    "Book bus, train, launch & flight tickets easily with TicketBari. Enjoy a seamless booking experience and travel across the country safely with top-rated operators.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased ${poppins.className}`} suppressHydrationWarning >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextThemeProvider>
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
        </NextThemeProvider>
      </body>
    </html>
  );
}
