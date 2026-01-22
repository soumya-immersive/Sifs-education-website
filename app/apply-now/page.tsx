"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, ChevronDown, Send, CheckCircle, XCircle, Wand2, Loader2 } from "lucide-react";
import { coursePrograms } from "../../data/coursePrograms";
import { internshipPrograms } from "../../data/internshipPrograms";
import { trainingPrograms } from "../../data/trainingPrograms";
import { API_BASE_URL } from "../../lib/config";

export default function CourseRegistrationForm() {
  // State for form fields
  const [learningType, setLearningType] = useState("");
  const [subType, setSubType] = useState("");
  const [course, setCourse] = useState("");
  const [level, setLevel] = useState("");

  const [couponCode, setCouponCode] = useState(""); // Add this missing state back
  const [couponStatus, setCouponStatus] = useState<"idle" | "success" | "error">("idle");
  const [couponMessage, setCouponMessage] = useState("");

  const [price, setPrice] = useState<number | null>(null); // Placeholder for price
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  // Personal Details State
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    dob: "",
    city: "",
    address: "",
    post_code: "",
    country: "",
    designation: "",
    college_name: "",
    gender: "",
    term: false
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Derived state for Sub Type options
  const [subTypeOptions, setSubTypeOptions] = useState<{ label: string; slug: string }[]>([]);
  const [courseOptions, setCourseOptions] = useState<{ title: string }[]>([]);

  // Effect: Update Sub Type options when Learning Type changes
  useEffect(() => {
    setSubType(""); // Reset sub type
    setCourse(""); // Reset course
    setLevel(""); // Reset level
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
      }
    };

    fetchCourses();
  }, [learningType, subType]);

  // Handler for Coupon Application
  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setCouponLoading(true);
    setCouponMessage("");
    setCouponStatus("idle");

    const payload = {
      coupon_code: couponCode,
      course_type: learningType,
      course_type_id: course, // Assuming course state holds the ID
      level: level
    };

    try {
      const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/apply-coupon`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (response.ok && data.status) {
        setCouponStatus("success");
        setCouponMessage(data.message || "Coupon applied successfully!");
        // Expecting data.discounted_price or similar. 
        // If API returns just discount amount, we might need to calc. 
        // For now, assuming data.discounted_price exists as per standard logic, 
        // or if strictly mimicking the price update logic:
        if (data.discounted_price) {
          setDiscountedPrice(data.discounted_price);
        }
      } else {
        setCouponStatus("error");
        setCouponMessage(data.message || "Invalid coupon code.");
        setDiscountedPrice(null);
      }
    } catch (error) {
      setCouponStatus("error");
      setCouponMessage("Failed to apply coupon. Please try again.");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setCouponStatus("idle");
    setCouponMessage("");
    setDiscountedPrice(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // Handle checkbox separately if needed, but for 'term' we use a separate handler or logic in submit
    if (type === 'checkbox') {
      // @ts-ignore
      setFormData(prev => ({ ...prev, [name]: e.target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Basic Validation
    if (!learningType || !subType || !course) {
      setMessage({ type: "error", text: "Please select course details." });
      return;
    }
    if (!formData.term) {
      setMessage({ type: "error", text: "Please accept the terms and conditions." });
      return;
    }

    setLoading(true);

    const payload = {
      type: learningType,
      course_sub_type: subType === "associate-degree" ? "Online Courses" :
        subType === "lab-based" ? "Lab Based Internship" : subType, // Simple mapping, refine as needed based on exact PHP values
      course: course, // Assuming value is ID
      name: formData.name,
      phone_number: formData.phone_number,
      email: formData.email,
      dob: formData.dob,
      city: formData.city,
      address: formData.address,
      post_code: formData.post_code,
      country: formData.country,
      designation: formData.designation,
      college_name: formData.college_name,
      gender: formData.gender,
      level: level,
      term: "on" // API expects "on"
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

      if (response.ok && data.status) { // Check for status as per common PHP API patterns check
        setMessage({ type: "success", text: "Registration successful!" });
        // Optional: Redirect or Reset
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
    <div className="min-h-screen font-sans pb-20 mb-12">

      <div className="relative h-[400px] md:h-[400px] w-full bg-[#005E8A]">
        <Image
          src="/terms-hero.png"
          alt="Course Registration Banner"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center pb-12 md:pb-24">
          <h1 className="text-2xl md:text-4xl font-normal text-white tracking-wide px-4 text-center">
            Course Registration Form
          </h1>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 w-full max-w-5xl px-4">
          <div className="bg-white rounded-xl shadow-md p-5 md:p-8 text-center border border-gray-100">
            <h2 className="text-xl md:text-3xl text-gray-600 font-normal">
              Apply Now
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-16 md:mt-24 relative z-10">
        <div className="bg-white shadow-xl rounded-sm p-6 md:p-12 pt-12 md:pt-16">
          {message && (
            <div className={`mb-6 p-4 rounded-md text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {message.text}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Learning Type */}
              <div className="space-y-1">
                <label className="text-[14px] font-normal text-black ml-1">Learning Type :</label>
                <div className="relative">
                  <select
                    value={learningType}
                    onChange={(e) => setLearningType(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm appearance-none outline-none text-gray-600 bg-white"
                  >
                    <option value="">Select Learning Type*</option>
                    <option value="course">Forensic Courses</option>
                    <option value="internship">Forensic Internship</option>
                    <option value="training">Forensic Training</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Learning Sub Type */}
              <div className="space-y-1">
                <label className="text-[14px] font-normal text-black ml-1">Learning Sub Type :</label>
                <div className="relative">
                  <select
                    value={subType}
                    onChange={(e) => setSubType(e.target.value)}
                    disabled={!learningType}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm appearance-none outline-none text-gray-600 bg-white disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    <option value="">Select Learning Sub Type*</option>
                    {subTypeOptions.map((opt) => (
                      <option key={opt.slug} value={opt.slug}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Course Title */}
              <div className="space-y-1">
                <label className="text-[14px] font-normal text-black ml-1">Course Title :</label>
                <div className="relative">
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    disabled={!subType}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm appearance-none outline-none text-gray-600 bg-white disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    <option value="">Select Course*</option>
                    {courseOptions.map((opt, index) => (
                      <option key={index} value={opt.title}>
                        {opt.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Course Level - Conditionally Rendered */}
              {subType === "associate-degree" && (
                <div className="space-y-1 md:col-span-3 lg:col-span-1">
                  <label className="text-[14px] font-normal text-black ml-1">Course Level :</label>
                  <div className="relative">
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm appearance-none outline-none text-gray-600 bg-white"
                    >
                      <option value="">Select Level*</option>
                      <option value="Level-I">Level-I</option>
                      <option value="Level-II">Level-II</option>
                      <option value="Level-III">Level-III</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              )}
            </div>

            {/* Price Section */}
            <div className="space-y-1">
              <p className="text-[14px] font-normal text-black mb-0">Course Price :</p>
              {price !== null ? (
                <h3 className="text-xl font-bold text-black">
                  {discountedPrice ? (
                    <>
                      <span className="line-through text-gray-400 mr-2">₹ {price}</span>
                      <span className="text-green-600">₹ {discountedPrice}</span>
                    </>
                  ) : (
                    <span>₹ {price}</span>
                  )}
                </h3>
              ) : (
                <p className="text-sm text-gray-400 italic">Select a course to view price</p>
              )}
            </div>

            {/* Coupon Section */}
            <div className="space-y-2 max-w-md">
              <div className="flex border border-gray-200 rounded-md overflow-hidden relative shadow-sm">
                <div className={`flex items-center justify-center w-12 transition-colors duration-300 ${couponStatus === 'success' ? 'bg-green-500' : couponStatus === 'error' ? 'bg-red-500' : 'bg-[#FFB800]'
                  }`}>
                  {couponStatus === 'success' ? (
                    <CheckCircle className="text-white w-5 h-5" />
                  ) : couponStatus === 'error' ? (
                    <XCircle className="text-white w-5 h-5" />
                  ) : (
                    <Wand2 className="text-white w-5 h-5" />
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponStatus === 'success' || couponLoading}
                  className="flex-1 px-4 py-2 text-sm outline-none bg-white w-full uppercase placeholder:normal-case font-medium text-gray-700 disabled:bg-gray-50 disabled:text-gray-500"
                />
                {couponStatus === 'success' ? (
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="bg-red-500 text-white px-5 py-2 text-[11px] font-bold uppercase tracking-wider hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={!couponCode || couponLoading}
                    className="bg-[#28A745] text-white px-6 py-2 text-[11px] font-bold uppercase tracking-wider hover:bg-[#218838] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center min-w-[80px]"
                  >
                    {couponLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Apply"
                    )}
                  </button>
                )}
              </div>
              {couponMessage && (
                <p className={`text-xs ml-1 ${couponStatus === 'success' ? 'text-green-600 font-medium' : 'text-red-500'}`}>
                  {couponMessage}
                </p>
              )}
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 pt-4">
              {[
                { label: "Name", placeholder: "Full name as on certificate", name: "name" },
                { label: "Contact Number", placeholder: "Number with country code", name: "phone_number" },
                { label: "Email Address", placeholder: "Email for notification", name: "email" },
                { label: "Date of Birth", placeholder: "DD-MM-YYYY", name: "dob" },
                { label: "Full Postal Address", placeholder: "Address for courier", name: "address" },
                { label: "City Name", placeholder: "City/District", name: "city" },
                { label: "Postal Code", placeholder: "ZIP/PIN Code", name: "post_code" },
              ].map((field) => (
                <div key={field.label} className="space-y-1 mb-3">
                  <label className="text-[14px] font-normal text-black ml-1">{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    value={(formData as any)[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none bg-white text-gray-600 placeholder:text-gray-400 focus:border-[#005E8A] transition-colors"
                  />
                </div>
              ))}

              <div className="space-y-1 mb-3">
                <label className="text-[14px] font-normal text-black ml-1">Country</label>
                <div className="relative">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm appearance-none outline-none text-gray-600 bg-white"
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1 mb-3">
                <label className="text-[14px] font-normal text-black ml-1">Qualification</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="Last Qualification"
                  className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none bg-white placeholder:text-gray-400 text-gray-600 focus:border-[#005E8A]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[14px] font-normal text-black ml-1">Institution Name</label>
                <input
                  type="text"
                  name="college_name"
                  value={formData.college_name}
                  onChange={handleInputChange}
                  placeholder="Present/Last Institution Name"
                  className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none bg-white placeholder:text-gray-300 text-gray-600 focus:border-[#005E8A]"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="flex gap-8 py-2">
              {['Male', 'Female', 'Others'].map((gender) => (
                <label key={gender} className="flex items-center gap-2 text-[14px] text-black cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleInputChange}
                    className="w-3.5 h-3.5 border-gray-300 text-[#005E8A] focus:ring-[#005E8A]"
                  />
                  {gender}
                </label>
              ))}
            </div>

            {/* Terms */}
            <div className="flex gap-3 items-start">
              <input
                type="checkbox"
                name="term"
                checked={formData.term}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 border-gray-300 rounded text-[#005E8A] focus:ring-[#005E8A]"
              />
              <p className="text-[11.5px] leading-relaxed text-black">
                I confirm that the details above are correct to my knowledge. Hereby, I agree to follow the guidelines of <span className="font-semibold">Sherlock Institute of Forensic Science (SIFS) INDIA</span> and ensure that no illegal activity will be carried out by me. I understand and accept that my name and personal details provided by me will be added to confidential registration files held by SIFS INDIA.
              </p>
            </div>

            <div className="space-y-3 pt-4 border border-dashed p-4 rounded-md bg-gray-50">
              <h4 className="text-[14px] font-normal text-black">Terms and Conditions:</h4>
              <ol className="text-[11px] text-black space-y-2 list-decimal ml-4">
                <li>Payment to be made in favor of &quot;SIFS INDIA PVT LTD&quot;.</li>
                <li>Sherlock Institute of Forensic Science (SIFS) INDIA reserves the right to cancel your admission without any refund of fee in situations like unpaid/partial fee, incomplete/fake documents, abusive behavior of candidate, etc.</li>
                <li>Sherlock Institute of Forensic Science (SIFS) INDIA will not be liable for any indirect, punitive, special, incidental or consequential damages in connection with or arising out of any of its courses.</li>
                <li>Sherlock Institute of Forensic Science (SIFS) INDIA reserves the right to amend/postpone the course.</li>
                <li>Bank Charges of Rs.500/- will be charged on bounced cheque.</li>
                <li>Fee is not refundable once the course starts.</li>
              </ol>
            </div>

            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center bg-gradient-to-r from-[#3E58EE] to-[#B565E7] gap-2 text-white font-medium py-3 px-8 rounded-xl shadow-md hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Registering...
                  </>
                ) : (
                  <>
                    Register <span className="text-lg">›</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}