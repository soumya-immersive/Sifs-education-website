"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Facebook, Twitter, Linkedin, Instagram, GraduationCap, Award } from "lucide-react";
import { Course } from "../../data/courses";

interface Props {
    course: Course;
}

export default function CourseInstructors({ course }: Props) {
    const [selectedInstructor, setSelectedInstructor] = useState<any | null>(null);

    if (!course.instructors || course.instructors.length === 0) {
        return null;
    }

    const instructors = course.instructors;

    return (
        <div className="mt-12 mb-12">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-indigo-50 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Course Instructors</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {instructors.map((instructor) => (
                    <div
                        key={instructor.id}
                        onClick={() => setSelectedInstructor(instructor)}
                        className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center"
                    >
                        <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-indigo-100 group-hover:border-indigo-600 transition-colors">
                            <Image
                                src={instructor.image_url || "/placeholder-user.jpg"}
                                alt={instructor.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{instructor.name}</h3>
                        <p className="text-sm text-indigo-600 font-medium mb-2">{instructor.rank}</p>
                        <p className="text-xs text-gray-500 line-clamp-2">{instructor.education}</p>

                        <button className="mt-4 text-xs font-semibold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            View Profile
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedInstructor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
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
                                            className="text-gray-600 text-sm leading-relaxed space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"
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
        </div>
    );
}
