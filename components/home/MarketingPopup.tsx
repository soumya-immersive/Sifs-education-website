"use client";

import { useState, useEffect } from "react";
import { X, User, Mail, Phone, Send, Loader2 } from "lucide-react";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/config";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

interface MarketingData {
  is_marketing_popup: number;
  marketing_popup_delay: string;
  marketing_popup: string;
  marketing_popup_description: string;
  marketing_popup_url: string;
  is_announcement: number;
  announcement_delay: string;
  announcement: string;
  announcement_url: string;
}

export default function MarketingPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<MarketingData | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchPopupData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/EducationAndInternship/Website/front/marketing-popup`,
        );
        const json = await response.json();
        if (json.success && json.data) {
          setData(json.data);
          if (json.data.is_marketing_popup === 1) {
            const delay =
              parseFloat(json.data.marketing_popup_delay || "2.00") * 1000;
            setTimeout(() => {
              setIsOpen(true);
            }, delay);
          }
        }
      } catch (error) {
        console.error("Error fetching marketing popup:", error);
      }
    };

    fetchPopupData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/EducationAndInternship/Website/front/marketing-popup-form`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      const json = await response.json();
      if (json.success) {
        toast.success(json.message || "Information submitted successfully!");
        setIsOpen(false);
      } else {
        toast.error(json.message || "Submission failed.");
      }
    } catch (error) {
      console.error("Error submitting marketing form:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 euclid-font">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[1.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {/* Close Button - More Visible & Easier to Click */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-30 p-2.5 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all backdrop-blur-md border border-white/20 group shadow-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
              {/* Header Section - Better padding and contrast */}
              <div className="bg-gradient-to-br from-[#1E3A8A] via-[#ffffff] to-[#f1e7ff] text-white p-10 md:p-14 relative overflow-hidden text-center shrink-0">
                {/* Modern Decorative elements */}
                <div className="absolute -top-12 -right-12 w-80 h-80 bg-white/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-blue-400/10 rounded-full blur-[80px] pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className="text-white leading-relaxed px-2 md:px-4"
                    dangerouslySetInnerHTML={{
                      __html: data.marketing_popup_description,
                    }}
                  />
                </div>
              </div>

              {/* Main Content Areas - Responsive Grid */}
              <div className="flex flex-col md:flex-row flex-grow">
                {/* Column 1: Image - Strategic display on mobile */}
                <div className="w-full md:w-[55%] relative h-[250px] md:h-auto shrink-0 md:shrink">
                  <Image
                    src={data.marketing_popup_url}
                    alt="Success Opportunity"
                    fill
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Column 2: Form - Increased focus and user friendliness */}
                <div className="w-full md:w-[45%] p-8 md:p-8 bg-white flex flex-col justify-center">
                  <div className="mb-4 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                      Connect With Us
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-5">
                      <div className="group relative">
                        <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                          <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 group-focus-within:bg-indigo-50 group-focus-within:text-[#3E58EE] transition-all">
                            <User className="w-5 h-5" />
                          </div>
                        </div>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="What's your name?"
                          className="w-full pl-14 pr-5 py-4.5 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-[#3E58EE] focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-gray-400 text-gray-900 font-semibold"
                        />
                      </div>

                      <div className="group relative">
                        <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                          <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 group-focus-within:bg-indigo-50 group-focus-within:text-[#3E58EE] transition-all">
                            <Mail className="w-5 h-5" />
                          </div>
                        </div>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your professional email"
                          className="w-full pl-14 pr-5 py-4.5 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-[#3E58EE] focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-gray-400 text-gray-900 font-semibold"
                        />
                      </div>

                      <div className="group relative">
                        <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                          <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 group-focus-within:bg-indigo-50 group-focus-within:text-[#3E58EE] transition-all">
                            <Phone className="w-5 h-5" />
                          </div>
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Contact number"
                          className="w-full pl-14 pr-5 py-4.5 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-[#3E58EE] focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-gray-400 text-gray-900 font-semibold"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full py-5 px-8 bg-gradient-to-r from-[#3E58EE] via-[#5D46E6] to-[#B565E7] text-white rounded-2xl font-bold flex items-center justify-center gap-4 transition-all hover:shadow-[0_20px_40px_-10px_rgba(62,88,238,0.4)] disabled:opacity-70 disabled:cursor-not-allowed group shadow-xl"
                    >
                      {formSubmitting ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <>
                          <span className="text-lg md:text-xl">
                            Send Message
                          </span>
                          <div className="bg-white/20 p-1.5 rounded-lg group-hover:bg-white/30 transition-colors">
                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </div>
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
