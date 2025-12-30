"use client";

import { motion, Variants } from "framer-motion";
import { CreditCard, Globe, QrCode } from "lucide-react";
import { Book } from "../../data/books";

interface Props {
  book: Book;
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
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function BookPaymentDetails({ book }: Props) {
  return (
    <motion.div
      className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Title */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 mb-8">
        <CreditCard className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-bold text-gray-900">
          Payment & Transaction Details
        </h3>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10 text-sm text-gray-700">
        
        {/* LEFT: Bank & Transfer Info */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* International */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-600 font-bold uppercase tracking-wider text-xs">
              <Globe className="w-3.5 h-3.5" />
              International Orders
            </div>
            <p className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg font-semibold border border-blue-100">
              PayPal: <span className="underline">forensicdocument@gmail.com</span>
            </p>
          </div>

          <hr className="border-gray-100" />

          {/* National */}
          <div className="space-y-4">
            <p className="font-bold text-gray-800 flex items-center gap-2">
               Bank Transfer (National Orders)
            </p>

            <div className="grid grid-cols-1 gap-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex justify-between border-b border-gray-200/50 pb-2">
                <span className="text-gray-500">Bank Name:</span>
                <span className="font-bold text-gray-900">ICICI BANK</span>
              </div>

              <div className="flex justify-between border-b border-gray-200/50 pb-2">
                <span className="text-gray-500">Account Name:</span>
                <span className="font-bold text-gray-900 text-right ml-4">SIFS INDIA PVT. LTD.</span>
              </div>

              <div className="flex justify-between border-b border-gray-200/50 pb-2">
                <span className="text-gray-500">Account No.:</span>
                <span className="font-bold text-blue-600 font-mono tracking-wider">663055000006</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">IFSC Code:</span>
                <span className="font-bold text-gray-900">ICIC0000160</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: QR Code Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center space-y-4 bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase mb-2">
            <QrCode className="w-4 h-4" />
            Scan to Pay via UPI
          </div>
          
          <div className="relative group">
            <img
              src="/book/qr.png" 
              alt="UPI QR Code"
              className="w-48 h-48 border-4 border-white shadow-xl rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <p className="text-[10px] text-gray-400 text-center max-w-[200px] mt-4">
            After successful payment, please share the transaction ID via the inquiry form.
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}