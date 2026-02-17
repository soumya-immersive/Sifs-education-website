"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Linkedin, Twitter, Play, Phone, Facebook, Instagram, Award, X } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { Course } from "../../data/courses";

interface Props {
  course: Course;
}

/* ---------------- Animations ---------------- */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function CourseSidebar({ course }: Props) {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3>(1);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<any | null>(null);
  const [showAllInstructors, setShowAllInstructors] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedInstructor || isVideoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedInstructor, isVideoOpen]);

  // Helper to get price based on level
  const getPrice = () => {
    switch (selectedLevel) {
      case 1:
        return course.priceLevel1 ? `₹${Number(course.priceLevel1).toLocaleString()}` : "₹11,800";
      case 2:
        return course.priceLevel2 ? `₹${Number(course.priceLevel2).toLocaleString()}` : "₹17,700";
      case 3:
        return course.priceLevel3 ? `₹${Number(course.priceLevel3).toLocaleString()}` : "₹23,600";
      default:
        return "₹11,800";
    }
  };

  const getThumbnailUrl = (videoUrl?: string) => {
    if (!videoUrl) return "/course/sidebar.png";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = videoUrl.match(regExp);
    return (match && match[2].length === 11)
      ? `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`
      : "/course/sidebar.png";
  };

  const thumbnail = getThumbnailUrl(course.video_url);

  const handleVideoPlay = () => {
    if (course.video_url) {
      setIsVideoOpen(true);
    }
  };

  const handleRegister = () => {
    const price = getPrice();
    const query = new URLSearchParams({
      id: course.id.toString(),
      title: course.title,
      level: selectedLevel.toString(),
      price: price
    }).toString();

    router.push(`/course-registration?${query}`);
  };

  const [queryForm, setQueryForm] = useState({
    name: "",
    mobile: "",
    email: "",
    query: ""
  });
  const [isQuerySubmitting, setIsQuerySubmitting] = useState(false);
  const [queryMessage, setQueryMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQueryForm(prev => ({ ...prev, [name]: value }));
  };

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsQuerySubmitting(true);
    setQueryMessage(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/EducationAndInternship/Website/courses/${course.id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...queryForm,
          type: "course"
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setQueryMessage({ text: "Query submitted successfully!", type: "success" });
        setQueryForm({ name: "", mobile: "", email: "", query: "" });
      } else {
        setQueryMessage({ text: data.message || "Failed to submit query.", type: "error" });
      }
    } catch (error) {
      console.error("Query submission error:", error);
      setQueryMessage({ text: "Something went wrong. Please try again.", type: "error" });
    } finally {
      setIsQuerySubmitting(false);
    }
  };

  // Extract video ID for embed
  const getVideoId = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getVideoId(course.video_url);

  // Check available levels (simplistic check or just assume all 3 exist if not specified)
  const availableLevels = [1, 2, 3];

  return (
    <>
      <motion.div
        className="sticky top-28 space-y-6 z-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* MAIN SIDEBAR CARD */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
        >
          {/* VIDEO THUMBNAIL AREA */}
          <div className="relative group cursor-pointer" onClick={handleVideoPlay}>
            <img
              src={thumbnail}
              alt={course.title || "Course Thumbnail"}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 text-indigo-600 fill-current ml-1" />
              </div>
            </div>
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <span className="text-white text-sm font-medium drop-shadow-md">Preview This Course</span>
            </div>
          </div>

          <div className="p-6 space-y-8">

            {/* SELECT COURSE LEVEL */}
            <div className="space-y-4">
              <h3 className="text-gray-700 font-semibold text-center">Select Course Level</h3>
              <div className="space-y-3">
                {availableLevels.map((level) => (
                  <label
                    key={level}
                    className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors ${selectedLevel === level ? "bg-indigo-50/50" : "hover:bg-gray-50"}`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedLevel === level
                        ? "border-green-500 bg-green-500"
                        : "border-gray-300"
                        }`}
                    >
                      {selectedLevel === level && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <input
                      type="radio"
                      name="courseLevel"
                      className="hidden"
                      checked={selectedLevel === level}
                      onChange={() => setSelectedLevel(level as 1 | 2 | 3)}
                    />
                    <span className={`text-sm ${selectedLevel === level ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                      Level-{level === 1 ? 'I' : level === 2 ? 'II' : 'III'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* CALL FOR ASSISTANCE */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <div className="p-1 rounded-full border border-gray-400">
                  <span className="text-xs font-serif italic w-3 h-3 flex items-center justify-center font-bold">i</span>
                </div>
                <span className="text-sm font-medium text-gray-500">Call for Assistance</span>
              </div>

              <div className="bg-white border border-gray-200 rounded-full py-2 px-6 flex items-center justify-center gap-2 shadow-sm">
                <span className="text-gray-800 font-semibold tracking-wide">
                  {course.callForAssistance || "7303913002"}
                </span>
                <Phone className="w-4 h-4 text-black fill-current" />
              </div>
            </div>

            {/* REGISTER BUTTON */}
            <button
              className="w-full bg-[#0056D2] hover:bg-[#0044a6] text-white py-3 rounded-full font-semibold text-md flex items-center justify-center gap-2 transition-colors shadow-md"
              onClick={handleRegister}
            >
              Register For Course &gt;
            </button>

          </div>
        </motion.div>

        {/* INSTRUCTORS (Dynamic) */}
        {course.instructors && course.instructors.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h3 className="text-md font-medium text-black">Instructors</h3>
            </div>

            <div className={`space-y-4 p-5 ${showAllInstructors ? "max-h-[300px] overflow-y-auto custom-scrollbar pr-2" : ""}`}>
              {(showAllInstructors ? course.instructors : course.instructors.slice(0, 3)).map((inst) => (
                <div
                  key={inst.id}
                  className="group flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  onClick={() => setSelectedInstructor(inst)}
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                    <Image
                      src={inst.image_url || "/course/ins1.png"}
                      alt={inst.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="pb-1">
                      <p className="text-sm font-medium text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                        {inst.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{inst.rank}</p>
                    </div>
                    <hr className="border-gray-100" />
                    <div className="flex items-center gap-2 text-gray-400 pt-1">
                      <div className="flex justify-center gap-3">
                        {inst.facebook && <a href={inst.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600"><Facebook className="w-4 h-4" /></a>}
                        {inst.twitter && <a href={inst.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-500"><Twitter className="w-4 h-4" /></a>}
                        {inst.linkedin && <a href={inst.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700"><Linkedin className="w-4 h-4" /></a>}
                        {inst.instagram && <a href={inst.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600"><Instagram className="w-4 h-4" /></a>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {course.instructors.length > 3 && (
                <button
                  onClick={() => setShowAllInstructors(!showAllInstructors)}
                  className="w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors mt-2 sticky bottom-0 bg-white py-2"
                >
                  {showAllInstructors ? "View Less" : "View All"}
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* ASK QUERY */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl border border-gray-200"
        >
          <h3 className="text-md font-medium text-black p-5">
            Ask Your Query
          </h3>
          <div className="border-t border-gray-200" />

          <form onSubmit={handleQuerySubmit} className="space-y-3 p-5">
            {queryMessage && (
              <div className={`text-sm p-3 rounded-md ${queryMessage.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {queryMessage.text}
              </div>
            )}

            <input
              name="name"
              value={queryForm.name}
              onChange={handleQueryChange}
              required
              className="w-full border border-[#D9D9D9] text-black rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Name"
            />
            <input
              name="mobile"
              value={queryForm.mobile}
              onChange={handleQueryChange}
              required
              className="w-full border border-[#D9D9D9] text-black rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Mobile"
            />
            <input
              name="email"
              type="email"
              value={queryForm.email}
              onChange={handleQueryChange}
              required
              className="w-full border border-[#D9D9D9] text-black rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Email"
            />
            <textarea
              name="query"
              value={queryForm.query}
              onChange={handleQueryChange}
              required
              rows={3}
              className="w-full border border-[#D9D9D9] text-black rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              placeholder="Query"
            />
            <button
              type="submit"
              disabled={isQuerySubmitting}
              className="cursor-pointer w-full bg-[#8B5CF6] hover:bg-[#7c3aed] text-white py-2.5 rounded-lg text-sm font-medium transition-colors disabled:bg-indigo-300"
            >
              {isQuerySubmitting ? 'Submitting...' : 'Submit →'}
            </button>
          </form>
        </motion.div>
      </motion.div>

      {/* VIDEO MODAL */}
      {isVideoOpen && videoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setIsVideoOpen(false)}>
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-2 right-2 z-10 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="Course Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* INSTRUCTOR DETAIL MODAL */}
      {selectedInstructor && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200 scrollbar-hide">
            <button
              onClick={() => setSelectedInstructor(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-50 shadow-lg">
                    <Image
                      src={selectedInstructor.image_url || "/placeholder-user.jpg"}
                      alt={selectedInstructor.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center gap-3 mt-4">
                    {selectedInstructor.facebook && <a href={selectedInstructor.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600"><Facebook className="w-4 h-4" /></a>}
                    {selectedInstructor.twitter && <a href={selectedInstructor.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-500"><Twitter className="w-4 h-4" /></a>}
                    {selectedInstructor.linkedin && <a href={selectedInstructor.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700"><Linkedin className="w-4 h-4" /></a>}
                    {selectedInstructor.instagram && <a href={selectedInstructor.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600"><Instagram className="w-4 h-4" /></a>}
                  </div>
                </div>

                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{selectedInstructor.name}</h3>
                  <p className="text-indigo-600 font-medium mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    {selectedInstructor.rank}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 opacity-70">Education</h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm">
                      {selectedInstructor.education}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 opacity-70">About Instructor</h4>
                    <div
                      className="text-gray-600 text-sm leading-relaxed space-y-2"
                      dangerouslySetInnerHTML={{ __html: selectedInstructor.about }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Backdrop click to close */}
          <div className="absolute inset-0 z-[-1]" onClick={() => setSelectedInstructor(null)} />
        </div>
      )}
    </>
  );
}
