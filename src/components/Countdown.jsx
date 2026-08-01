"use client";

import { useEffect, useState } from "react";

const Countdown = ({ departureDate, small = false }) => {
    const calculateTimeLeft = () => {
        const difference = new Date(departureDate).getTime() - Date.now();

        if (difference <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                expired: true,
            };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            expired: false,
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [departureDate]);

    if (timeLeft.expired) {
        return <p>Departure time has passed</p>;
    }

    return (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className={`flex flex-col ${small ? "gap-1 text-sm" : ""}`}>
                <span className={`countdown font-mono ${small ? "text-xl" : "text-5xl"}`}>
                    <span
                        style={{ "--value": timeLeft.days }}
                        aria-label={`${timeLeft.days} days`}
                    >
                        {timeLeft.days}
                    </span>
                </span>
                days
            </div>

            <div className={`flex flex-col ${small ? "gap-1 text-sm" : ""}`}>
                <span className={`countdown font-mono ${small ? "text-xl" : "text-5xl"}`}>
                    <span
                        style={{ "--value": timeLeft.hours }}
                        aria-label={`${timeLeft.hours} hours`}
                    >
                        {timeLeft.hours}
                    </span>
                </span>
                hours
            </div>

            <div className={`flex flex-col ${small ? "gap-1 text-sm" : ""}`}>
                <span className={`countdown font-mono ${small ? "text-xl" : "text-5xl"}`}>
                    <span
                        style={{ "--value": timeLeft.minutes }}
                        aria-label={`${timeLeft.minutes} minutes`}
                    >
                        {timeLeft.minutes}
                    </span>
                </span>
                min
            </div>

            <div className={`flex flex-col ${small ? "gap-1 text-sm" : ""}`}>
                <span className={`countdown font-mono ${small ? "text-xl" : "text-5xl"}`}>
                    <span
                        style={{ "--value": timeLeft.seconds }}
                        aria-label={`${timeLeft.seconds} seconds`}
                    >
                        {timeLeft.seconds}
                    </span>
                </span>
                sec
            </div>
        </div>
    );
};

export default Countdown;