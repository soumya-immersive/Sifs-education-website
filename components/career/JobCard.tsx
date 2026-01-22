"use client";
import { FC } from "react";
import Link from "next/link";

interface JobCardProps {
  title: string;
  experience: string;
  deadline: string;
  educationalExperience: string;
  slug: string;
}

const JobCard: FC<JobCardProps> = ({ title, experience, deadline, educationalExperience, slug }) => {
  return (
    <div className="border-2 border-blue-50 rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-all mb-4">
      <div className="flex flex-col w-full">

        {/* Top Row: Title and Badge */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <span className="px-4 py-1 text-xs border border-blue-200 bg-blue-50 text-blue-600 font-bold rounded-lg uppercase">
            {experience}
          </span>
        </div>

        {/* Divider line */}
        <div className="h-[1px] bg-gray-100 w-full mb-6" />

        {/* Bottom Row: Info and Button */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

          {/* Column 1: Educational Experience (Spans 6 columns) */}
          <div className="md:col-span-6">
            <p className="text-[10px] font-black text-black uppercase mb-1 tracking-tight">
              Educational Experience:
            </p>
            <p className="text-sm text-gray-600 leading-snug line-clamp-2">
              {educationalExperience}
            </p>
          </div>

          {/* Column 2: Deadline (Spans 3 columns) */}
          <div className="md:col-span-3">
            <p className="text-[10px] font-black text-black uppercase mb-1 tracking-tight">
              Deadline:
            </p>
            <p className="text-sm text-gray-600 font-medium">
              {deadline}
            </p>
          </div>

          {/* Column 3: Button (Spans 3 columns) */}
          <div className="md:col-span-3 flex justify-end">
            <Link href={`/career/${slug}`} className="w-full md:w-auto">
              <button className="group whitespace-nowrap bg-gradient-to-r from-[#4F65F1] to-[#9B66E4] text-white py-3 px-6 rounded-xl font-normal flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all w-full min-w-[140px]">
                Apply Now
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobCard;