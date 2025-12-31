"use client";

import React from "react";
import Image from "next/image";
import { Search, ChevronDown, Send } from "lucide-react";

export default function CourseRegistrationForm() {
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
          <h1 className="text-2xl md:text-4xl font-normal text-black tracking-wide px-4 text-center">
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
          <form className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="space-y-1">
                <label className="text-[14px] font-normal text-black ml-1">Learning Type :</label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm appearance-none outline-none text-gray-400 bg-white">
                    <option>Select Learning Type*</option>
                    <option>Forensic Internship</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[14px] font-normal text-black ml-1">Learning Sub Type :</label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm appearance-none outline-none text-gray-400 bg-white">
                    <option>Select Learning Sub Type*</option>
                    <option>Lab Based Internship</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[14px] font-normal text-black ml-1">Course Title :</label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm appearance-none outline-none text-gray-400 bg-white">
                    <option>Select Course*</option>
                    <option>Select Internship*</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <p className="text-[14px] font-normal text-black mb-0">Course Price :</p>

            <div className="flex border border-gray-200 rounded-md overflow-hidden">
              <div className="bg-[#FFB800] flex items-center justify-center">
                <Search className="text-white w-4 h-4 -rotate-90" />
              </div>
              <input 
                type="text" 
                placeholder="Coupon Code" 
                className="flex-1 px-4 py-2 text-sm outline-none bg-white w-full italic"
              />
              <button type="button" className="bg-[#28A745] text-white px-6 py-2 text-[11px] font-bold uppercase tracking-wider">
                Apply
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 pt-2">
              {[
                { label: "Name", placeholder: "Full name as on certificate" },
                { label: "Contact Number", placeholder: "Number with country code" },
                { label: "Email Address", placeholder: "Email for notification" },
                { label: "Date of Birth", placeholder: "DD-MM-YYYY" },
                { label: "Full Postal Address", placeholder: "Address for courier" },
                { label: "City Name", placeholder: "City/District" },
                { label: "Postal Code", placeholder: "ZIP/PIN Code" },
              ].map((field) => (
                <div key={field.label} className="space-y-1 mb-3">
                  <label className="text-[14px] font-normal text-black ml-1">{field.label}</label>
                  <input 
                    type="text" 
                    placeholder={field.placeholder} 
                    className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none bg-white text-gray-400 placeholder:text-gray-400" 
                  />
                </div>
              ))}
              
              <div className="space-y-1 mb-3">
                <label className="text-[14px] font-normal text-black ml-1">Country</label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm appearance-none outline-none text-black bg-white">
                    <option>Afghanistan</option>
                    <option>India</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1 mb-3">
                <label className="text-[14px] font-normal text-black ml-1">Qualification</label>
                <input type="text" placeholder="Last Qualification" className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none bg-white placeholder:text-gray-400 text-gray-400 " />
              </div>
              <div className="space-y-1">
                <label className="text-[14px] font-normal text-black ml-1">Institution Name</label>
                <input type="text" placeholder="Present/Last Institution Name" className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none bg-white placeholder:text-gray-300 text-gray-400 " />
              </div>
            </div>

            <div className="flex gap-8 py-2">
                {['Male', 'Female', 'Others'].map((gender) => (
                  <label key={gender} className="flex items-center gap-2 text-[14px] text-black cursor-pointer">
                    <input type="checkbox" className="w-3.5 h-3.5 border-gray-300 rounded text-[#005E8A]" />
                    {gender}
                  </label>
                ))}
            </div>

            <div className="flex gap-3 items-start">
              <input type="checkbox" className="mt-1 w-4 h-4 border-gray-300 rounded text-[#005E8A]" />
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
              <button className="flex items-center bg-gradient-to-r from-[#3E58EE] to-[#B565E7] gap-2 text-white font-medium py-3 px-8 rounded-xl shadow-md hover:opacity-90 transition">
                Register <span className="text-lg">›</span>
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}