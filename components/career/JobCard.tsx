"use client";
import { FC } from "react";
<<<<<<< HEAD
import EditableText from "../editable/EditableText";
import { JobOpening } from "@/types/career-page";
import { Trash2 } from "lucide-react";

interface JobCardProps {
  job: JobOpening;
  editMode: boolean;
  onChange: (updatedJob: JobOpening) => void;
  onDelete?: () => void;
  availableCategories?: string[];
}

const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, '');
};

const JobCard: FC<JobCardProps> = ({ job, editMode, onChange, onDelete, availableCategories = [] }) => {
=======
import Link from "next/link";

interface JobCardProps {
  title: string;
  experience: string;
  deadline: string;
  educationalExperience: string;
  slug: string;
}

const JobCard: FC<JobCardProps> = ({ title, experience, deadline, educationalExperience, slug }) => {
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
  return (
    <div className="border-2 border-blue-50 rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-all mb-4 relative group">
      {editMode && onDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="absolute -top-3 -right-3 z-10 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
          title="Delete Job Opening"
        >
          <Trash2 size={16} />
        </button>
      )}

      <div className="flex flex-col w-full">

        {/* Top Row: Title and Badge */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex-1 mr-4">
            <EditableText
              html={job.title}
              editMode={editMode}
              onChange={(h) => onChange({ ...job, title: h })}
            />
          </h2>
          <span className="px-4 py-1 text-xs border border-blue-200 bg-blue-50 text-blue-600 font-bold rounded-lg uppercase whitespace-nowrap">
            <EditableText
              html={job.experience}
              editMode={editMode}
              onChange={(h) => onChange({ ...job, experience: h })}
            />
          </span>
        </div>

        <div className="mb-4 text-xs font-semibold text-gray-400 flex items-center gap-2">
          Category:
          {editMode ? (
            <select
              value={job.category}
              onChange={(e) => onChange({ ...job, category: e.target.value })}
              className="bg-blue-50 text-blue-600 border border-blue-100 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {availableCategories.map((cat, index) => (
                <option key={`${cat}-${index}`} value={cat}>{stripHtml(cat)}</option>
              ))}
            </select>
          ) : (
            <span className="text-blue-500 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 italic">
              {stripHtml(job.category)}
            </span>
          )}
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
<<<<<<< HEAD
            <div className="text-sm text-gray-600 leading-snug">
              <EditableText
                html={job.educationalExperience}
                editMode={editMode}
                onChange={(h) => onChange({ ...job, educationalExperience: h })}
              />
            </div>
=======
            <p className="text-sm text-gray-600 leading-snug line-clamp-2">
              {educationalExperience}
            </p>
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
          </div>

          {/* Column 2: Deadline (Spans 3 columns) */}
          <div className="md:col-span-3">
            <p className="text-[10px] font-black text-black uppercase mb-1 tracking-tight">
              Deadline:
            </p>
            <div className="text-sm text-gray-600 font-medium">
              <EditableText
                html={job.deadline}
                editMode={editMode}
                onChange={(h) => onChange({ ...job, deadline: h })}
              />
            </div>
          </div>

          {/* Column 3: Button (Spans 3 columns) */}
          <div className="md:col-span-3 flex justify-end">
<<<<<<< HEAD
            {editMode ? (
              <div className="group whitespace-nowrap bg-gradient-to-r from-[#4F65F1] to-[#9B66E4] text-white py-3 px-6 rounded-xl font-normal flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all w-full md:w-auto min-w-[140px] cursor-default">
                <span>{stripHtml(job.applyButtonLabel || "Apply Now")}</span>
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            ) : (
              <button className="group whitespace-nowrap bg-gradient-to-r from-[#4F65F1] to-[#9B66E4] text-white py-3 px-6 rounded-xl font-normal flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all w-full md:w-auto min-w-[140px]">
                {stripHtml(job.applyButtonLabel || "Apply Now")}
=======
            <Link href={`/career/${slug}`} className="w-full md:w-auto">
              <button className="group whitespace-nowrap bg-gradient-to-r from-[#4F65F1] to-[#9B66E4] text-white py-3 px-6 rounded-xl font-normal flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all w-full min-w-[140px]">
                Apply Now
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
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
<<<<<<< HEAD
            )}
=======
            </Link>
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
          </div>

        </div>
      </div>
    </div>
  );
};



export default JobCard;
