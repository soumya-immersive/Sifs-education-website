"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE_URL } from "../../lib/config";
import { Loader2 } from "lucide-react";

interface Expert {
  id: number;
  name: string;
  role: string;
  image: string;
  slug: string;
}

export default function ExpertTeam() {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/team`);
        const result = await response.json();

        if (result.success && result.data && Array.isArray(result.data.members)) {
          const mapped = result.data.members.map((item: any) => {
            let imageUrl = item.image || "";
            if (imageUrl) {
              imageUrl = imageUrl.replace(/\\/g, "/");
              // Check if absolute or relative
              if (!imageUrl.startsWith("http")) {
                // Using localhost:3000 as per other files, or relative /uploads if proxied
                // app/teams/page.tsx uses http://localhost:3000/uploads
                imageUrl = `http://localhost:3000/uploads/${imageUrl}`;
              }
            }

            const clean = (str: any) => (str ? str.toString().replace(/^"|"$/g, '') : "");

            return {
              id: item.id,
              name: clean(item.name),
              role: clean(item.rank),
              image: imageUrl,
              slug: item.slug
            };
          });

          // Display first 4 members
          setExperts(mapped.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching expert team:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

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
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-6">
            {experts.map((item, i) => (
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
                    src={item.image || "/placeholder-user.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
                    {item.role}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
