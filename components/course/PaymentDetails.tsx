"use client";

import { motion, Variants } from "framer-motion";
import { Course, CoursePaymentDetails } from "../../types/courses-page";
import EditableText from "../editable/EditableText";
import EditableImage from "../editable/EditableImage";

interface Props {
  course: Course;
  editMode?: boolean;
  onUpdate?: (updatedInfo: Partial<Course>) => void;
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

export default function PaymentDetails({ course, editMode, onUpdate }: Props) {
  const payment = course.paymentDetails;

  const handlePaymentChange = (updatedPayment: Partial<CoursePaymentDetails>) => {
    onUpdate?.({ paymentDetails: { ...payment, ...updatedPayment } });
  };

  return (
    <motion.div
      className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Title */}
      <motion.h3
        variants={itemVariants}
        className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2"
      >
        <span className="w-1.5 h-6 bg-red-500 rounded-full" />
        Payment Details
      </motion.h3>

      <div className="grid lg:grid-cols-5 gap-12">

        {/* LEFT & CENTER (Banking Info) */}
        <motion.div variants={itemVariants} className="lg:col-span-3 space-y-8">
          <div>
            <p className="font-bold text-sm text-gray-400 uppercase tracking-widest mb-3">
              International Enrollment:
            </p>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center gap-3">
              <span className="text-indigo-600 font-bold">PayPal:</span>
              <span className="text-gray-900 font-medium">
                <EditableText
                  html={payment.paypal}
                  editMode={!!editMode}
                  onChange={(val) => handlePaymentChange({ paypal: val })}
                />
              </span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <p className="font-bold text-sm text-gray-400 uppercase tracking-widest mb-6">
              National Enrollment (India):
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Bank Name</p>
                  <div className="text-gray-900 font-bold">
                    <EditableText
                      html={payment.bankName}
                      editMode={!!editMode}
                      onChange={(val) => handlePaymentChange({ bankName: val })}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Account Name</p>
                  <div className="text-gray-900 font-bold">
                    <EditableText
                      html={payment.accountName}
                      editMode={!!editMode}
                      onChange={(val) => handlePaymentChange({ accountName: val })}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Account No.</p>
                  <div className="text-gray-900 font-bold">
                    <EditableText
                      html={payment.accountNo}
                      editMode={!!editMode}
                      onChange={(val) => handlePaymentChange({ accountNo: val })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Account Type</p>
                  <div className="text-gray-900 font-bold">
                    <EditableText
                      html={payment.type}
                      editMode={!!editMode}
                      onChange={(val) => handlePaymentChange({ type: val })}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">IFSC Code</p>
                  <div className="text-gray-900 font-bold text-xl tracking-wider">
                    <EditableText
                      html={payment.ifsc}
                      editMode={!!editMode}
                      onChange={(val) => handlePaymentChange({ ifsc: val })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT (QR Code) */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 flex flex-col items-center justify-center p-6 bg-gray-50 rounded-3xl border border-gray-100 relative group"
        >
          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6">Scan to Pay</p>
          <div className="w-56 h-56 bg-white p-4 rounded-2xl shadow-xl ring-8 ring-gray-100 overflow-hidden">
            <EditableImage
              src={payment.qrImage || "/course/qr.png"}
              alt="Payment QR"
              editMode={!!editMode}
              onChange={(val) => handlePaymentChange({ qrImage: val })}
              className="w-full h-full object-contain"
            />
          </div>
          <p className="mt-8 text-[11px] font-bold text-gray-400 text-center uppercase tracking-widest px-8 leading-loose">
            Payments are processed securely through our partners
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}
