"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const experts = [
  {
    name: "Anushka Karle",
    role: "Psychologist",
    image: "/teams/team1.png",
  },
  {
    name: "Abhishek Vashishth",
    role: "Fingerprint Expert",
    image: "/teams/team2.png",
  },
  {
    name: "A. Mohan Krishan",
    role: "Deputy Director",
    image: "/teams/team3.png",
  },
  {
    name: "Abd Samuel Qaleb",
    role: "Forensic Analyst",
    image: "/teams/team4.png",
  },
];

export default function ExpertTeam() {
  return (
    <section
      className="py-20 bg-cover bg-center"
      style={{
        backgroundImage: "url('/about-us/team-bg.png')",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <p className="text-sm font-normal text-[#3A58EE]">
              Team Members
            </p>
            <h2 className="text-2xl font-semibold text-black">
              Meet{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Our Exp</span>

                {/* Yellow underline */}
                <Image
                  src="/yellow-underline.png"
                  alt=""
                  width={120}
                  height={14}
                  className="absolute left-0 -bottom-1 z-0"
                />
              </span>
              ert Team
            </h2>
          </div>

          <Link
            href="/teams"
            className="px-5 py-2 rounded-lg text-sm text-white
                       bg-gradient-to-r from-violet-600 to-indigo-600
                       hover:from-violet-700 hover:to-indigo-700
                       transition"
          >
            Explore All Team →
          </Link>
        </div>

        {/* TEAM GRID */}
        <div className="grid md:grid-cols-4 gap-6">
          {experts.map((item, i) => (
            <motion.div
              key={i}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="relative rounded-xl overflow-hidden shadow-md group text-center"
            >
              {/* IMAGE */}
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={380}
                className="w-full h-[360px] object-cover"
              />

              {/* OVERLAY */}
              <div
                className="absolute inset-0
                bg-gradient-to-t from-black/80 via-black/30 to-transparent"
              />

              {/* TEXT ABOVE OVERLAY */}
              <motion.div
                variants={{
                  rest: { scale: 1 },
                  hover: {
                    scale: 1.12,
                    transition: { duration: 0.35, ease: "easeOut" },
                  },
                }}
                className="absolute bottom-0 left-0 right-0 p-4 text-white z-10"
              >
                <p className="font-semibold leading-tight">
                  {item.name}
                </p>
                <p className="text-xs opacity-90 text-[#D08522]">
                  {item.role}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
