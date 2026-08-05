"use client";

import {
    FaLocationDot,
    FaPaperPlane,
    FaMagnifyingGlass,
} from "react-icons/fa6";

const SearchBox = () => {

    return (
        <form action={'/alltickets'}
            className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-4 sm:p-6 w-full shadow-2xl transition-colors duration-300 backdrop-blur-md"
        >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="relative flex items-center group">
                    <FaLocationDot className="absolute left-4 text-emerald-500 text-lg transition-transform group-focus-within:scale-110" />
                    <input
                        type="text"
                        placeholder="Departure (e.g. Dhaka)"
                        name="from"
                        className="w-full bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/60 rounded-2xl pl-11 pr-4 py-3.5 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-medium transition-all"
                    />
                </div>

                <div className="relative flex items-center group">
                    <FaPaperPlane className="absolute left-4 text-gray-400 dark:text-gray-500 text-lg group-focus-within:text-emerald-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Destination (e.g. Cox's Bazar)"
                        name="to"
                        className="w-full bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/60 rounded-2xl pl-11 pr-4 py-3.5 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-medium transition-all"
                    />
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    type="submit"
                    className="flex items-center justify-center gap-2.5 w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-10 py-3.5 rounded-2xl transition-all duration-200 shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                    <FaMagnifyingGlass className="text-sm" />
                    <span>Search Tickets</span>
                </button>
            </div>
        </form>
    );
};

export default SearchBox;
