"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Shield, Clock, Award } from "lucide-react";
import { Event } from "../../data/events";

interface Props {
  event: Event;
}

export default function EventRegistration({ event }: Props) {
  const [participants, setParticipants] = useState(1);
  const [selectedOption, setSelectedOption] = useState<'online' | 'offline'>(event.mode as 'online' | 'offline');

  const totalPrice = selectedOption === 'online' 
    ? (event.discountedPrice || event.price) * participants
    : event.price * participants;

  const features = [
    "Certificate of Completion",
    "Course Materials & Resources",
    "Networking Opportunities",
    "Lifetime Access to Recordings",
    "Q&A Sessions with Experts",
    "Practical Case Studies"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 text-white mt-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-6 h-6" />
        <h3 className="text-xl font-bold">Register Now</h3>
      </div>
      
      {/* Price Display */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          {event.discountedPrice && (
            <span className="text-3xl font-bold">${event.discountedPrice}</span>
          )}
          <span className={`text-3xl font-bold ${event.discountedPrice ? 'text-blue-200 line-through text-2xl' : ''}`}>
            ${event.price}
          </span>
          <span className="text-blue-200">per person</span>
        </div>
        <p className="text-blue-200 text-sm mt-1">Early bird discount available</p>
      </div>
      
      {/* Mode Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">Select Mode</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setSelectedOption('online')}
            className={`py-3 rounded-lg text-center font-medium transition-all ${
              selectedOption === 'online' 
                ? 'bg-white text-blue-700' 
                : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            Online
          </button>
          <button
            onClick={() => setSelectedOption('offline')}
            className={`py-3 rounded-lg text-center font-medium transition-all ${
              selectedOption === 'offline' 
                ? 'bg-white text-blue-700' 
                : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            Offline
          </button>
        </div>
      </div>
      
      {/* Participants Counter */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">Number of Participants</label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setParticipants(Math.max(1, participants - 1))}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
          >
            -
          </button>
          <span className="text-2xl font-bold">{participants}</span>
          <button
            onClick={() => setParticipants(participants + 1)}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
          >
            +
          </button>
        </div>
      </div>
      
      {/* Features */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">What's Included</label>
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <Check className="w-4 h-4 text-green-300" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Total Price */}
      <div className="mb-6 p-4 bg-white/10 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total Amount</span>
          <div className="text-right">
            <div className="text-2xl font-bold">${totalPrice}</div>
            <div className="text-sm text-blue-200">
              For {participants} participant{participants > 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="space-y-3">
        <button className="w-full bg-white text-blue-700 font-bold py-3.5 rounded-lg hover:bg-blue-50 transition-colors">
          Proceed to Payment
        </button>
        
        <button className="w-full border border-white text-white font-medium py-3 rounded-lg hover:bg-white/10 transition-colors">
          Save for Later
        </button>
      </div>
      
      {/* Trust Badges */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/20 text-sm">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>24/7 Support</span>
        </div>
      </div>
    </motion.div>
  );
}