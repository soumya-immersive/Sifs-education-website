"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { TeamData } from "@/types/about-page";

interface ExpertTeamProps {
  data: TeamData;
}

export default function ExpertTeam({ data }: ExpertTeamProps) {
  const displayExperts = data.experts.slice(0, 4);

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
            <div className="text-sm font-normal text-[#3A58EE]">
              <div
                dangerouslySetInnerHTML={{ __html: data.subtitle }}
              />
            </div>
            <h2 className="text-2xl font-semibold text-black">
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
                  width={120}
                  height={14}
                  className="absolute left-0 -bottom-1 z-0"
                />
              </span>
              <span
                dangerouslySetInnerHTML={{ __html: data.headingSuffix }}
              />
            </h2>
          </div>

          <Link
            href={data.browseLink || "/teams"}
            className="px-5 py-2 rounded-lg text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transition"
          >
            {data.browseText || "Explore All Team →"}
          </Link>
        </div>

        {/* TEAM GRID */}
        <div className="grid md:grid-cols-4 gap-6">
          {displayExperts.map((item, i) => (
            <motion.div
              key={i}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="relative rounded-xl overflow-hidden shadow-md group text-center"
            >

              {/* IMAGE */}
              <img
                src={item.image || "/placeholder.png"}
                alt={item.name}
                className="w-full h-[360px] object-cover"
              />

              {/* OVERLAY */}
              <div
                className="absolute inset-0
                bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"
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
                <div className="font-semibold leading-tight">
                  <div
                    dangerouslySetInnerHTML={{ __html: item.name }}
                    className="text-white"
                  />
                </div>
                <div className="text-xs opacity-90 text-[#D08522]">
                  <div
                    dangerouslySetInnerHTML={{ __html: item.role }}
                    className="text-[#D08522]"
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
