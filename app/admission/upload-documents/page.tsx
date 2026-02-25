"use client";

import { Search, FileCheck, Loader2, AlertCircle, CheckCircle2, Link } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/config";
import UploadDocumentsSkeleton from "@/components/skeletons/UploadDocumentsSkeleton";

interface PageData {
  title: string;
  description: string;
}

interface RegistrationData {
  registration: {
    id: number;
    registration_number: string;
    name: string;
    email: string;
    phone_number: string;
    course_id: number;
    is_doc_uploaded: number;
    [key: string]: any;
  };
  courseDetails: {
    title: string;
    [key: string]: any;
  };
  redirect: {
    type: string;
    url: string;
    message: string;
    session_data: {
      course_registration_id: number;
      registration_no: string;
    };
  };
}

export default function AdmissionHero() {
  const [regNumber, setRegNumber] = useState("");
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Fetch page data on mount
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/EducationAndInternship/Website/registration/number-search`
        );
        const result = await response.json();

        if (result.success && result.data) {
          setPageData(result.data);
        }
      } catch (err) {
        console.error("Error fetching page data:", err);
      } finally {
        setPageLoading(false);
      }
    };

    fetchPageData();
  }, []);

  const handleVerify = async () => {
    if (!regNumber.trim()) {
      setError("Please enter a registration number");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/EducationAndInternship/Website/registration/number-search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            registration_number: regNumber.trim(),
          }),
        }
      );

      const result = await response.json();

      if (result.success && result.data) {
        const data = result.data as RegistrationData;

        setSuccess(`Registration found for ${data.registration.name}`);

        // Store complete registration data in sessionStorage for the upload page
        sessionStorage.setItem(
          "registration_data",
          JSON.stringify(data)
        );

        // Also store session data for backward compatibility
        if (data.redirect?.session_data) {
          sessionStorage.setItem(
            "registration_session",
            JSON.stringify(data.redirect.session_data)
          );

          // Redirect after a short delay
          setTimeout(() => {
            router.push("/show-upload-document");
          }, 1500);
        }
      } else {
        setError(result.message || "Registration number not found. Please check and try again.");
      }
    } catch (err) {
      console.error("Error verifying registration:", err);
      setError("An error occurred while verifying your registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <UploadDocumentsSkeleton />;
  }


  return (
    <section className="relative bg-white px-4 overflow-hidden h-[700px] flex items-center justify-center">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-72 h-72 bg-indigo-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10 text-center mb-12">


        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          Document <span className="text-[#0056B3]">Verification</span>
        </h1>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-gray-600 text-lg md:text-xl mb-10 leading-relaxed">
          Please enter your unique registration number provided during your application to securely upload your educational and identity documents.
        </p>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-left">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-green-700 text-left">{success}</p>
          </div>
        )}

        {/* Registration Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3 bg-white p-2 rounded-2xl md:rounded-full shadow-2xl border border-gray-100">
            <div className="flex-1 relative flex items-center">
              <Search className="absolute left-5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter Registration Number (e.g. SIFS/2025/001)"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !loading && handleVerify()}
                disabled={loading}
                className="w-full pl-14 pr-6 py-4 rounded-full border-none focus:ring-0 outline-none text-gray-700 text-lg placeholder:text-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>
            <button
              onClick={handleVerify}
              disabled={loading}
              className="bg-[#0056B3] hover:bg-[#004494] text-white px-10 py-4 rounded-xl md:rounded-full font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  VERIFYING...
                </>
              ) : (
                "VERIFY & PROCEED"
              )}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}