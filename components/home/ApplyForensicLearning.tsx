"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDown, Loader2 } from "lucide-react";
import { coursePrograms } from "../../data/coursePrograms";
import { internshipPrograms } from "../../data/internshipPrograms";
import { trainingPrograms } from "../../data/trainingPrograms";
import { API_BASE_URL } from "../../lib/config";

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

  // API data state
  const [sectionData, setSectionData] = useState({
    achivement_section_title: "Our Achievements",
    achivement_section_subtitle: "Shaping the future of forensics: A showcase of our journey and triumphs",
  });
  const [statsData, setStatsData] = useState({
    courses_and_trainings: 155,
    students: 75000,
    global_presence: 110,
  });

  // Fetch section data and stats on mount
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        // Fetch section titles
        const frontResponse = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`);
        const frontData = await frontResponse.json();
        console.log('Front API Response:', frontData);

        if (frontData?.data?.bs) {
          console.log('Achievement data from API:', {
            title: frontData.data.bs.achivement_section_title,
            subtitle: frontData.data.bs.achivement_section_subtitle,
          });
          setSectionData({
            achivement_section_title: frontData.data.bs.achivement_section_title || "Our Achievements",
            achivement_section_subtitle: frontData.data.bs.achivement_section_subtitle || "Shaping the future of forensics: A showcase of our journey and triumphs",
          });
        }

        // Fetch stats/counts
        const countsResponse = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/counts`);
        const countsData = await countsResponse.json();
        console.log('Counts API Response:', countsData);

        // Handle different API response structures
        const totals = countsData?.data?.totals || countsData?.totals || countsData?.data || countsData;

        if (totals) {
          console.log('Stats from API:', totals);
          setStatsData({
            courses_and_trainings: totals.courses_and_trainings ?? totals.coursesAndTrainings ?? 155,
            students: totals.students ?? totals.totalStudents ?? 75000,
            global_presence: totals.global_presence ?? totals.globalPresence ?? 110,
          });
        }
      } catch (error) {
        console.error("Error fetching section data:", error);
      }
    };

    fetchSectionData();
  }, []);

  // Effect: Update Sub Type options when Learning Type changes
  useEffect(() => {
    setSubType(""); // Reset sub type
    setCourse(""); // Reset course
    setCourseOptions([]); // Reset course options
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
      setCourse(""); // Reset course when subType changes

      // Map subType to the format expected by the API (matching handleSubmit logic)
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
          console.error("Failed to fetch courses:", data.message);
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

    // Basic Validation
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
      type: learningType,
      course_sub_type: subType === "associate-degree" ? "Online Courses" :
        subType === "lab-based" ? "Lab Based Internship" : subType,
      course: course,
      name: formData.name,
      phone_number: formData.phone_number,
      email: formData.email,
      country: formData.country,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/apply-now`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.status) {
        setMessage({ type: "success", text: "Registration successful! We will contact you soon." });
        // Reset form
        setLearningType("");
        setSubType("");
        setCourse("");
        setFormData({
          name: "",
          phone_number: "",
          email: "",
          country: "",
        });
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8 applyforensiclearning">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Apply For Forensic Learning
          </h1>
          <p className="text-lg text-gray-600">
            Learn more about forensic courses, training & internship
          </p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Checkbox Feature */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  defaultChecked
                  readOnly
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Learn Something New & Build Your Career From Anywhere
                  </h3>
                  <p className="text-gray-600">In The World</p>
                </div>
              </div>
            </div>

            {/* Achievements Section */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {sectionData.achivement_section_title}
              </h2>
              <p className="text-gray-600 mb-8">
                {sectionData.achivement_section_subtitle}
              </p>


              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {statsData.courses_and_trainings}+
                  </div>
                  <div className="text-gray-700">Courses & Training</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {statsData.students >= 1000
                      ? `${Math.floor(statsData.students / 1000)}K+`
                      : `${statsData.students}+`}
                  </div>
                  <div className="text-gray-700">Total Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {statsData.global_presence}+
                  </div>
                  <div className="text-gray-700">Global Presence</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              All Courses Available At This Affordable Fee
            </h2>
            <p className="text-gray-600 mb-6">Fill the form below to get started</p>

            {message && (
              <div className={`mb-4 p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {message.text}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone number *
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <div className="relative">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none"
                    >
                      <option value="">Select your country</option>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Learning type *
                  </label>
                  <div className="relative">
                    <select
                      value={learningType}
                      onChange={(e) => setLearningType(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none"
                    >
                      <option value="">Select learning type</option>
                      <option value="course">Forensic Courses</option>
                      <option value="internship">Forensic Internship</option>
                      <option value="training">Forensic Training</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Learning sub type *
                  </label>
                  <div className="relative">
                    <select
                      value={subType}
                      onChange={(e) => setSubType(e.target.value)}
                      disabled={!learningType}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none disabled:bg-gray-50 disabled:text-gray-400"
                    >
                      <option value="">Select sub type</option>
                      {subTypeOptions.map((opt) => (
                        <option key={opt.slug} value={opt.slug}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Courses *
                </label>
                <div className="relative">
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    disabled={!subType || coursesLoading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    <option value="">{coursesLoading ? "Loading courses..." : "Select a course"}</option>
                    {courseOptions.map((opt, index) => (
                      <option key={opt.id || index} value={opt.title}>
                        {opt.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                      className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Forensic Learning. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ApplyForensicLearning;