"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { InitiativesData } from "@/types/about-page";

/* ---------------- Animations (Scroll Only) ---------------- */

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

interface InitiativesSectionProps {
  data: InitiativesData;
}

export default function InitiativesSection({ data }: InitiativesSectionProps) {

  return (
    <section
      className="py-20 bg-cover bg-center"
      style={{
        backgroundImage: `url('${data.bgImage}')`,
      }}
    >
      <motion.div
        className="max-w-7xl mx-auto px-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >

        {/* OUTER LIGHT GRAY CARD */}
        <motion.div
          variants={fadeUp}
          className="bg-[#F5F6FA] rounded-2xl p-10"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* LEFT GRAY PANEL */}
            <motion.div
              variants={fadeLeft}
              className="bg-[#F5F6FA] rounded-2xl p-4"
            >
              <img
                src={data.leftImage || "/placeholder.png"}
                alt="Initiatives Left"
                className="rounded-xl object-cover"
              />
            </motion.div>

            {/* RIGHT GRAY PANEL */}
            <motion.div
              variants={fadeUp}
              className="bg-[#F5F6FA] rounded-2xl p-6"
            >
              <motion.div
                variants={fadeUp}
                className="text-2xl font-semibold text-black mb-4"
              >
                <span
                  dangerouslySetInnerHTML={{ __html: data.headingPrefix }}
                  className="mr-1"
                />
                <span className="relative inline-block mr-1">
                  <span className="relative z-10">
                    <span
                      dangerouslySetInnerHTML={{ __html: data.headingHighlight }}
                    />
                  </span>

                  {/* Yellow underline */}
                  <Image
                    src="/yellow-underline.png"
                    alt=""
                    width={160}
                    height={14}
                    className="absolute left-0 -bottom-1 z-0"
                  />
                </span>
                <span
                  dangerouslySetInnerHTML={{ __html: data.headingSuffix }}
                />
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="text-sm text-gray-600 leading-relaxed mb-8"
              >
                <div
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </motion.div>

              {/* LISTS */}
              <motion.div
                variants={container}
                className="grid sm:grid-cols-2 gap-8 text-sm"
              >

                {/* LEFT COLUMN */}
                <motion.div variants={fadeUp}>
                  <div className="font-semibold mb-3 text-black">
                    <div
                      dangerouslySetInnerHTML={{ __html: data.listLeftTitle }}
                    />
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    {data.listLeftItems.map((item, i) => (
                      <li key={i} className="flex gap-2 group relative">
                        <span className="text-green-500">✔</span>
                        <div className="flex-1">
                          <div
                            dangerouslySetInnerHTML={{ __html: item }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="font-semibold mt-6 mb-3 text-black">
                    <div
                      dangerouslySetInnerHTML={{ __html: data.listRightTitle1 }}
                    />
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    {data.listRightItems1.map((item, i) => (
                      <li key={i} className="flex gap-2 group relative">
                        <span className="text-green-500">✔</span>
                        <div className="flex-1">
                          <div
                            dangerouslySetInnerHTML={{ __html: item }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* RIGHT COLUMN */}
                <motion.div variants={fadeUp}>
                  <div className="font-semibold mb-3 text-black">
                    <div
                      dangerouslySetInnerHTML={{ __html: data.listRightTitle2 }}
                    />
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    {data.listRightItems2.map((item, i) => (
                      <li key={i} className="flex gap-2 group relative">
                        <span className="text-green-500">✔</span>
                        <div className="flex-1">
                          <div
                            dangerouslySetInnerHTML={{ __html: item }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>

              </motion.div>
            </motion.div>

          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
