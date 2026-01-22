// components/ApplyForensicLearning.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, Loader2 } from "lucide-react";
import { coursePrograms } from "../../data/coursePrograms";
import { internshipPrograms } from "../../data/internshipPrograms";
import { trainingPrograms } from "../../data/trainingPrograms";
import { API_BASE_URL } from "../../lib/config";

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
  // State for form fields
  const [learningType, setLearningType] = useState("");
  const [subType, setSubType] = useState("");
  const [course, setCourse] = useState("");

  // Personal Details State
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Derived state for Sub Type options
  const [subTypeOptions, setSubTypeOptions] = useState<{ label: string; slug: string }[]>([]);
  const [courseOptions, setCourseOptions] = useState<{ id?: string | number; title: string }[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(false);

  // Stats state for achievements section
  const [statsData, setStatsData] = useState({
    courses_and_trainings: 155,
    students: 75000,
    global_presence: 110,
  });

  // Fetch stats/counts on mount
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const countsResponse = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/counts`);
        const countsData = await countsResponse.json();
        console.log('Counts API Response:', countsData);

        const totals = countsData?.data?.totals;
        if (totals) {
          console.log('Stats from API:', totals);
          setStatsData({
            courses_and_trainings: totals.courses_and_trainings ?? 155,
            students: totals.students ?? 75000,
            global_presence: totals.global_presence ?? 110,
          });
        }
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  // Effect: Update Sub Type options when Learning Type changes
  useEffect(() => {
    setSubType("");
    setCourse("");
    setCourseOptions([]);
    if (learningType === "course") {
      setSubTypeOptions(coursePrograms);
    } else if (learningType === "internship") {
      setSubTypeOptions(internshipPrograms);
    } else if (learningType === "training") {
      setSubTypeOptions(trainingPrograms);
    } else {
      setSubTypeOptions([]);
    }
  }, [learningType]);

  // Effect: Fetch courses when Sub Type changes
  useEffect(() => {
    const fetchCourses = async () => {
      if (!learningType || !subType) {
        setCourseOptions([]);
        return;
      }

      setCoursesLoading(true);
      setCourse("");

      const mappedSubType = subType === "associate-degree" ? "Online Courses" :
        subType === "lab-based" ? "Lab Based Internship" : subType;

      const payload = {
        course_type: learningType,
        course_sub_type: mappedSubType
      };

      try {
        const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/ajax-get-course-type`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await response.json();

        if (response.ok && data.success && data.data && data.data.options) {
          setCourseOptions(data.data.options);
        } else {
          setCourseOptions([]);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourseOptions([]);
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchCourses();
  }, [learningType, subType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!learningType || !subType || !course) {
      setMessage({ type: "error", text: "Please select course details." });
      return;
    }
    if (!formData.name || !formData.email || !formData.phone_number) {
      setMessage({ type: "error", text: "Please fill all required fields." });
      return;
    }

    setLoading(true);

    const payload = {
      full_name: formData.name,
      type: learningType,
      course_sub_type: subType === "associate-degree" ? "Online Courses" :
        subType === "lab-based" ? "Lab Based Internship" : subType,
      email: formData.email,
      phone: formData.phone_number,
      country: formData.country,
      course: course,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/apply-online`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({ type: "success", text: data.message || "Application submitted successfully!" });
        setLearningType("");
        setSubType("");
        setCourse("");
        setFormData({ name: "", phone_number: "", email: "", country: "" });
      } else {
        setMessage({ type: "error", text: data.message || "Registration failed. Please try again." });
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setMessage({ type: "error", text: "An error occurred. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

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
                  fill
                  className="p-1 object-contain"
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
                  value={`${statsData.courses_and_trainings}+`}
                  label="Courses & Training"
                  bgColor="bg-white"
                />
                <AchievementCard
                  value={statsData.students >= 1000 ? `${Math.floor(statsData.students / 1000)}K+` : `${statsData.students}+`}
                  label="Total Students"
                  bgColor="bg-purple-600"
                />
                <AchievementCard
                  value={`${statsData.global_presence}+`}
                  label="Global Presence"
                  bgColor="bg-white"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (FORM) */}
          <div className="lg:w-1/2">
            <div className="absolute bg-white p-8 rounded-xl shadow-2xl -bottom-18">
              {message && (
                <div className={`mb-4 p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {message.text}
                </div>
              )}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Email"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Phone number"
                    />
                  </div>

                  {/* Country */}
                  <div className="relative">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:outline-none appearance-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Country</option>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Learning Type */}
                  <div className="relative">
                    <select
                      value={learningType}
                      onChange={(e) => setLearningType(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:outline-none appearance-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Learning type</option>
                      <option value="course">Forensic Courses</option>
                      <option value="internship">Forensic Internship</option>
                      <option value="training">Forensic Training</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Learning Sub Type */}
                  <div className="relative">
                    <select
                      value={subType}
                      onChange={(e) => setSubType(e.target.value)}
                      disabled={!learningType}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:outline-none appearance-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-400"
                    >
                      <option value="">Learning sub type</option>
                      {subTypeOptions.map((opt) => (
                        <option key={opt.slug} value={opt.slug}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Courses (Full Width) */}
                  <div className="md:col-span-2 relative">
                    <select
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      disabled={!subType || coursesLoading}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:outline-none appearance-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-400"
                    >
                      <option value="">{coursesLoading ? "Loading courses..." : "Courses"}</option>
                      {courseOptions.map((opt, index) => (
                        <option key={opt.id || index} value={opt.title}>
                          {opt.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors flex items-center justify-center mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
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
