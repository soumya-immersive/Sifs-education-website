"use client";

import { Calendar, Users, Phone, Info, Mail, Video, ArrowRight, Facebook } from "lucide-react";
import { Event } from "../../types/events-page";

interface Props {
  event: Event;
}

export default function EventSidebar({ event }: Props) {
  return (
    <div className="space-y-6 sticky top-24 max-w-sm">

      {/* 1. Registration Detail Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-800 text-lg">Registration Detail</h3>
        </div>

        <div className="p-5 space-y-5">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <Calendar className="w-5 h-5 text-gray-900 mt-0.5" />
              <span className="font-semibold text-gray-900">Event Date:</span>
            </div>
            <span className="text-gray-600 block max-w-[150px] text-right">
              <div dangerouslySetInnerHTML={{ __html: event.date }} />
            </span>
          </div>

          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <Users className="w-5 h-5 text-gray-900 mt-0.5" />
              <span className="font-semibold text-gray-900">Participant:</span>
            </div>
            <span className="text-gray-600 font-bold flex gap-1">
              {event.currency || "₹"}
              <div dangerouslySetInnerHTML={{ __html: event.price.toString() }} />
            </span>
          </div>

          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <Phone className="w-5 h-5 text-gray-900 mt-0.5" />
              <span className="font-semibold text-gray-900">Ask Query on:</span>
            </div>
            <span className="text-gray-600">
              <div dangerouslySetInnerHTML={{ __html: event.contactPhone || "+91 926-676-6303" }} />
            </span>
          </div>

          <div className="bg-indigo-50/50 p-4 rounded-xl flex gap-3 border border-indigo-100/50">
            <Info className="w-5 h-5 text-gray-900 shrink-0" />
            <p className="text-sm text-gray-700 leading-tight">
              Online live learning sessions study materials certificate
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-500 hover:opacity-90 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all">
              Register Now
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full bg-white border border-gray-200 text-gray-400 font-medium py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
              Download Schedule (PDF)
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Venue Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-800 text-lg">Venue</h3>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <h4 className="font-bold text-gray-900">
              <div dangerouslySetInnerHTML={{ __html: event.venue || "Online Zoom" }} />
            </h4>
            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
              <div dangerouslySetInnerHTML={{ __html: event.venueAddress || "For micro-certificate program" }} />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-gray-900" />
              <span className="text-sm font-semibold text-gray-900 w-24">E-mail</span>
              <span className="text-sm text-gray-600">
                <div dangerouslySetInnerHTML={{ __html: event.venueEmail || "Learningsifs@gmail.com" }} />
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-gray-900" />
              <span className="text-sm font-semibold text-gray-900 w-24">Phone</span>
              <span className="text-sm text-gray-600">
                <div dangerouslySetInnerHTML={{ __html: event.venuePhone || "+91 926-676-6303" }} />
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Video className="w-5 h-5 text-gray-900" />
              <span className="text-sm font-semibold text-gray-900 w-24">Online</span>
              <span className="text-sm text-gray-600">
                <div dangerouslySetInnerHTML={{ __html: event.platform || "Zoom Platform" }} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Facebook Connect Button */}
      <button className="w-full bg-[#4267B2] hover:bg-[#365899] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-sm transition-all">
        <Facebook className="w-6 h-6 fill-current" />
        Connect Via Facebook
      </button>

      {/* 3. Ask Your Query Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-800 text-lg">Ask Your Query</h3>
        </div>

        <form className="p-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700">Name</label>
            <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700">Mobile</label>
            <input type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700">E-mail</label>
            <input type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700">Query</label>
            <textarea rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none" />
          </div>
          <button type="submit" className="w-1/3 bg-gradient-to-r from-blue-600 to-purple-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all">
            Submit
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}