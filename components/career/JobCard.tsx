"use client";
import { FC } from "react";
import Image from "next/image";


interface JobCardProps {
  title: string;
  experience: string;
  deadline: string;
  workExperience: string;
}

const JobCard: FC<JobCardProps> = ({
  title,
  experience,
  deadline,
  workExperience,
}) => {
  return (
    <div className="border rounded-xl shadow-sm hover:shadow-md transition bg-white relative">
      
      {/* Header */}
      <div className="pb-4 border-b p-6">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>as
      </div>

      {/* Experience Label */}
      <div className="mt-4 px-6">
        <span className="inline-block px-3 py-1 text-sm border rounded-lg bg-blue-50 border-blue-200 text-blue-700 font-medium">
          {experience}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-4 text-sm p-6">

        {/* Deadline */}
        <div className="flex items-start gap-3">
          <Image
            src="/deadline-job.png"
            alt="Calendar Icon"
            width={40}
            height={40}
            className="mt-0.5"
          />
          <div>
            <p className="font-medium text-gray-900">Deadline:</p>
            <p className="text-gray-700">{deadline}</p>
          </div>
        </div>

        {/* Work Experience */}
        <div className="flex items-start gap-3">
          <Image
            src="/work-job.png"
            alt="Work Icon"
            width={40}
            height={40}
            className="mt-0.5"
          />
          <div>
            <p className="font-medium text-gray-900">Work Experience:</p>
            <p className="text-gray-700 min-h-8">{workExperience}</p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="px-6 py-2">
        <button
          className="w-1/2 text-white py-2 px-1 rounded-lg font-medium flex items-center justify-center gap-2 transition 
          bg-gradient-to-r from-[#3E58EE] to-[#B565E7] 
          hover:from-[#354ED8] hover:to-[#A24EDC]  absolute -bottom-5"
        >

          Apply Now 
          <svg
              className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
        </button>
      </div>
    </div>
  );
};

export default JobCard;
