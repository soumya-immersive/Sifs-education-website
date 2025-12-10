// components/home/Banner.tsx
"use client";

import Image from 'next/image';
import { Sparkles, CheckCircle, GraduationCap } from 'lucide-react';

export default function Banner() {
  return (
    <>
      <div className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 min-h-screen">
      
      {/* 1. Abstract Background Shapes (Complex, but essential for the look) */}
      {/* These shapes create the purple and white abstract look */}
      <div className="absolute inset-0 bg-white opacity-70"></div> 
      <div className="absolute inset-0 z-0 opacity-80" 
     style={{
       backgroundImage: 'url(/banner-bg.png)',
       backgroundSize: 'cover',
       backgroundPosition: 'center',
       backgroundRepeat: 'no-repeat',
     }}
/>

      <div className="absolute bottom-0 right-0 z-0 h-96 w-96 rounded-full bg-indigo-50 opacity-50 blur-3xl"></div>


      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Side: Headline and CTAs */}
        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            We Believe in <span className="text-indigo-600">Innovation</span> & <span className="text-indigo-600">Development</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat.
          </p>
          
          <div className="mt-8 flex justify-center lg:justify-start space-x-4">
            {/* Explore Button (Primary CTA) */}
            <button className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-lg">
              Explore
              <svg className="ml-2 w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
            
            {/* Apply Now Button (Secondary CTA - Outlined) */}
            <button className="flex items-center text-indigo-600 border border-indigo-300 hover:bg-indigo-50 font-medium py-3 px-8 rounded-lg transition-colors">
              Apply Now 
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>
          
          {/* Small decorative element (the zigzag line) */}
          <div className="mt-8">
            <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 18C12 8 20 8 30 18C40 8 48 8 58 18" stroke="#D3D3E9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>


        {/* Right Side: Image and Floating Stats */}
        <div className="lg:w-1/2 relative flex justify-center lg:justify-end">
          
          {/* 2. Main Image Container (The diamond shape effect) */}
          <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] transform rotate-45 overflow-hidden rounded-3xl shadow-2xl">
            {/* Image (rotated back to look straight) */}
            <Image
              src="/banner.png" // ASSUMING you save the image in public/student-group.jpg
              alt="Students learning together"
              layout="fill"
              objectFit="cover"
              className="transform -rotate-45 scale-125"
            />
          </div>
          
          {/* 3. Floating Stat Boxes (Positioned absolutely) */}
          
          {/* Learn at your own pace */}
          <div className="absolute top-0 right-0 lg:top-1/4 lg:-right-10 bg-white p-4 rounded-xl shadow-xl transform -translate-x-1/2 translate-y-1/2 rotate-0">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-pink-500" />
              <span className="font-semibold text-sm">Learn at your own pace</span>
            </div>
          </div>

          {/* 36k+ Enrolled Students */}
          <div className="absolute bottom-1/4 left-0 lg:bottom-1/3 lg:left-0 bg-white p-4 rounded-xl shadow-xl transform -translate-x-1/2 translate-y-1/2 rotate-0">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <div>
                <span className="block font-extrabold text-lg">36k+</span>
                <span className="block text-xs text-gray-500">Enrolled Students</span>
              </div>
            </div>
          </div>

          {/* 99% Satisfied */}
          <div className="absolute bottom-0 right-0 lg:bottom-10 lg:right-20 bg-white p-4 rounded-xl shadow-xl transform translate-x-1/2 -translate-y-1/2 rotate-0">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-extrabold text-lg">99%</span>
              <span className="text-xs text-gray-500">Satisfied</span>
            </div>
          </div>    

        </div>
      </div>
    </div>
    </>
  );
}
