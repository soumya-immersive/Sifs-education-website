"use client";

import { motion, Variants } from "framer-motion";
import { Internship } from "../../data/internships";

interface Props {
  internship: Internship;
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

export default function InternshipPaymentDetails({ internship }: Props) {
  return (
    <motion.div
      className="bg-white pt-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Title */}
      <motion.h3
        variants={itemVariants}
        className="text-md font-semibold text-[#4559ED] mb-6 uppercase tracking-wider"
      >
        Registration & Fee Payment
      </motion.h3>

      <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-700">
        
        {/* LEFT: Bank & PayPal Details */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div>
            <p className="font-medium text-sm mb-2 text-[#6B7385]">
              International Applicants:
            </p>
            <p className="text-[#D08522] font-bold text-base">
              PayPal: forensicdocument@gmail.com
            </p>
          </div>

          <hr className="border-gray-100" />

          <div>
            <p className="font-medium text-[#6B7385] mb-3">
              National Applicants (NEFT/IMPS/RTGS)
            </p>

            <div className="grid grid-cols-1 gap-y-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="flex justify-between">
                <span className="text-[#D08522] font-semibold">Bank Name:</span>
                <span className="text-[#3D3D3D] font-bold">ICICI BANK</span>
              </p>

              <p className="flex justify-between">
                <span className="text-[#D08522] font-semibold">Account Name:</span>
                <span className="text-[#3D3D3D] font-bold text-right">
                  SIFS INDIA PVT. LTD.
                </span>
              </p>

              <p className="flex justify-between">
                <span className="text-[#D08522] font-semibold">Account No.:</span>
                <span className="text-[#3D3D3D] font-bold">663055000006</span>
              </p>

              <p className="flex justify-between border-t border-gray-200 pt-2 mt-1">
                <span className="text-[#D08522] font-semibold">Account Type:</span>
                <span className="text-[#3D3D3D] font-bold">Current</span>
              </p>

              <p className="flex justify-between">
                <span className="text-[#D08522] font-semibold">IFSC Code:</span>
                <span className="text-[#3D3D3D] font-bold underline decoration-indigo-300">
                  ICIC0000160
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: QR Code */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-6 border border-dashed border-gray-300"
        >
          <p className="text-xs text-gray-500 mb-4 font-medium uppercase">Scan to Pay using UPI</p>
          <img
            src="/course/qr.png"
            alt="Payment QR Code"
            className="w-48 h-48 border-4 border-white shadow-sm rounded-lg"
          />
          <p className="mt-4 text-[10px] text-center text-gray-400 max-w-[200px]">
            Please share the transaction screenshot at info@sifsindia.com after successful payment.
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}