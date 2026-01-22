"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

interface Expert {
  id: number;
  name: string;
  rank: string;
  image: string;
  image_url?: string;
  slug: string;
}

interface ExpertTeamProps {
  organizers: Expert[];
}

export default function ExpertTeam({ organizers }: ExpertTeamProps) {
  // Take first 4 organizers
  const experts = organizers && organizers.length > 0 ? organizers.slice(0, 4) : [];

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

          <Link href="/teams">
            <button
              className="cursor-pointer px-5 py-2 rounded-lg text-sm text-white
                bg-gradient-to-r from-violet-600 to-indigo-600
                hover:from-violet-700 hover:to-indigo-700 transition"
            >
              Explore All Team →
            </button>
          </Link>
        </div>

        {/* TEAM GRID */}
        {experts && experts.length > 0 ? (
          <div className="grid md:grid-cols-4 gap-6">
            {experts.map((item) => {
              // Ensure valid image source
              const imageSrc = (item.image_url && item.image_url.trim() !== '')
                ? item.image_url
                : (item.image && item.image.trim() !== '')
                  ? item.image
                  : "/placeholder-user.jpg";

              return (
                <motion.div
                  key={item.id}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  className="relative rounded-xl overflow-hidden shadow-md group text-center"
                >
                  {/* IMAGE */}
                  <div className="w-full h-[360px] relative bg-gray-200">
                    <Image
                      src={imageSrc}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      unoptimized={imageSrc.startsWith('http')}
                    />
                  </div>

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
                      {item.rank}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No team members available at the moment.</p>
          </div>
        )}

      </div>
    </section>
  );
}
