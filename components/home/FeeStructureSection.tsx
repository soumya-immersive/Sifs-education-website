// components/ApplyForensicLearning.tsx
import React from "react";
import Image from "next/image";

// ----------------------
// Types
// ----------------------
interface AchievementCardProps {
    value: string;
    label: string;
    bgColor: string;
}

// Helper component for the achievement cards (UPDATED LOGIC)
const AchievementCard: React.FC<AchievementCardProps> = ({ value, label, bgColor }) => {
    // Determine text color: black for light backgrounds, white for dark/colored backgrounds
    const textColor = bgColor.includes("bg-white") ? "text-black" : "text-white";

    // Determine label color for better contrast
    const labelColor = bgColor.includes("bg-white")
        ? "text-gray-700"
        : "text-white opacity-90";

    return (
        <div
            className={`p-4 rounded-lg text-center shadow-lg h-28 flex flex-col justify-center ${bgColor}`}
        >
            <div className={`text-3xl font-bold mb-1 ${textColor}`}>{value}</div>
            <div className={`text-sm ${labelColor}`}>{label}</div>
        </div>
    );
};

const ApplyForensicLearning = () => {
    return (
        <div
            className="relative p-4 md:p-8 flex items-center justify-center bg-gray-900 relative"
            style={{
                backgroundImage: "url(/apply-bg.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Dark Overlay Layer */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="max-w-7xl mx-auto relative z-10 w-full pt-16 pb-16">
                {/* Main Content Grid */}
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    {/* LEFT COLUMN */}
                    <div className="lg:w-1/2 space-y-6 text-white">
                        {/* Header Section */}
                        <header className="text-left mb-6">
                            <h1 className="text-4xl font-normal mb-2 leading-tight">
                                Apply For Forensic Learning
                            </h1>
                            <p className="text-md font-normal">
                                Learn more about forensic courses, training & internship{" "}
                                <span className="text-purple-400">▽</span>
                            </p>
                        </header>

                        {/* Play Button Section */}
                        <div className="flex items-center space-x-4">
                            <div className="w-18 h-18 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer border border-white/30 hover:bg-white/30 transition-colors shrink-0 relative overflow-hidden">
                                <Image
                                    src="/video-play.png"
                                    alt="Play Video"
                                    layout="fill"
                                    objectFit="contain"
                                    className="p-1"
                                />
                            </div>

                            <div className="ml-3">
                                <h3 className="text-lg font-normal">
                                    Learn Something new & Build Your Career <br /> From Anywhere
                                    In The World
                                </h3>
                            </div>
                        </div>

                        {/* Achievements Section */}
                        <div className="pt-4">
                            <h2 className="text-lg font-normal mb-0">Our Achievements</h2>
                            <p className="text-white font-normal text-sm mb-4">
                                Shaping the future of forensics: A showcase of our journey and
                                triumphs
                            </p>

                            {/* Achievements Grid */}
                            <div className="grid grid-cols-3 gap-6 absolute -bottom-18">
                                <AchievementCard
                                    value="155 +"
                                    label="Courses & Training"
                                    bgColor="bg-white"
                                />
                                <AchievementCard
                                    value="75K +"
                                    label="Total Students"
                                    bgColor="bg-purple-600"
                                />
                                <AchievementCard
                                    value="110 +"
                                    label="Global Presence"
                                    bgColor="bg-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN (FORM) */}
                    <div className="lg:w-1/2">
                        <div className="absolute bg-white p-8 rounded-xl shadow-2xl -bottom-18">
                            <form className="space-y-4">
                                {/* Form Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        "Full name",
                                        "Email",
                                        "Phone number",
                                        "Country",
                                        "Learning type",
                                        "Learning sub type",
                                    ].map((label) => (
                                        <div key={label}>
                                            <label className="sr-only">{label}</label>

                                            {label.includes("name") ||
                                            label.includes("Email") ||
                                            label.includes("number") ? (
                                                <input
                                                    type={
                                                        label.includes("Email")
                                                            ? "email"
                                                            : label.includes("number")
                                                            ? "tel"
                                                            : "text"
                                                    }
                                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg
                                                    focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                    placeholder={label}
                                                />
                                            ) : (
                                                <select
                                                    defaultValue=""
                                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg
                                                    focus:outline-none appearance-none focus:ring-2 focus:ring-purple-500"
                                                >
                                                    <option value="" disabled hidden>
                                                        {label}
                                                    </option>
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                </select>
                                            )}
                                        </div>
                                    ))}

                                    {/* Courses (Full Width) */}
                                    <div className="md:col-span-2">
                                        <select
                                            defaultValue=""
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg
                                            focus:outline-none appearance-none focus:ring-2 focus:ring-purple-500"
                                        >
                                            <option value="" disabled hidden>
                                                Courses
                                            </option>
                                            <option>Forensic Science</option>
                                            <option>Criminology</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold 
                                    py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors flex items-center justify-center mt-6"
                                >
                                    <span>Send Message</span>
                                    <svg
                                        className="ml-2 w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyForensicLearning;
