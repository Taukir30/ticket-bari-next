"use client";

import { Link } from "@heroui/react";
import Image from "next/image";
import { LogoFacebook, Envelope } from "@gravity-ui/icons";
import { usePathname } from "next/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname.includes("dashboard")) {
    return null;
  }

  return (
    <footer className="w-full bg-background text-foreground border-t border-divider transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Logo and Brand Info */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-foreground hover:opacity-90"
            >
              <Image
                src="/images/logo/logo-bg.png"
                alt="TicketBari Logo"
                width={32}
                height={32}
                className="object-contain rounded-md"
              />
              <span className="bg-linear-to-r from-blue-500 to-green-600 bg-clip-text text-transparent">
                TicketBari
              </span>
            </Link>
            <p className="text-sm text-default-500 leading-relaxed max-w-xs">
              Book bus, train, launch & flight tickets easily with TicketBari.
              Enjoy a seamless booking experience and travel across the country
              safely with top-rated operators.
            </p>
          </div>

          <div className="flex flex-col md:pl-8 gap-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-default-400">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/"
                  color="foreground"
                  className="hover:text-primary text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/tickets"
                  color="foreground"
                  className="hover:text-primary text-sm"
                >
                  All Tickets
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  color="foreground"
                  className="hover:text-primary text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  color="foreground"
                  className="hover:text-primary text-sm"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-default-400">
              Contact Info
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-default-500">
              <li className="flex items-center gap-2.5">
                <Envelope size={16} className="text-default-400" />
                <a
                  href="mailto:support@ticketbari.com"
                  className="hover:text-primary transition-colors"
                >
                  support@ticketbari.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg
                  className="h-4 w-4 text-default-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+880123456789"
                  className="hover:text-primary transition-colors"
                >
                  +880 1752-485143
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <LogoFacebook size={16} className="text-default-400" />
                <a
                  href="https://facebook.com/ticketbari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  facebook.com/ticketbari
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-default-400">
              Payment Methods
            </h4>
            <p className="text-xs text-default-400 mb-1">
              We accept secure payments via:
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex items-center justify-center bg-default-100 dark:bg-default-50 border border-default-200 rounded-md px-3 py-1.5 text-xs font-semibold text-default-600 tracking-wide">
                Stripe
              </div>
              <div className="flex items-center justify-center bg-default-100 dark:bg-default-50 border border-default-200 rounded-md px-3 py-1.5 text-xs font-semibold text-default-600 tracking-wide">
                Cards
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-default-200 dark:bg-default-100 my-4 opacity-60" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-default-400">
          <div>&copy; {currentYear} <span className="bg-linear-to-r from-blue-500 to-green-600 bg-clip-text text-transparent">TicketBari</span>. All rights reserved.</div>
          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="text-xs text-default-400 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-default-400 hover:text-primary transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
