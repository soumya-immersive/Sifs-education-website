"use client";

import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
          Hi, Sherlock Institute of {" "} Forensic <br /> Science India
        </h1>

        <p className="text-sm text-gray-500 mt-3">
          is registered under the Government of India and ISO 9001:2015 certified<br />
          forensic science institute in India.
        </p>

        {/* Content Section */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center text-left">
          
          {/* LEFT – Image collage */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden ">
              <Image
                src="/about-us/about.png"
                alt="Students"
                width={520}
                height={380}
                className="object-cover"
              />
            </div>

            <div
                className="
                    absolute
                    bottom-2
                    left-1/2 -translate-x-1/2
                    lg:left-68 lg:right-20 lg:translate-x-0
                    bg-[#3f3e3e]
                    rounded-xl shadow-lg
                    px-6 py-4 md:px-8 md:py-6
                    flex items-center gap-4
                "
                >
                <p className="text-3xl md:text-4xl text-white font-normal">
                    19+
                </p>
                <p className="text-xs text-white border-l pl-4 leading-tight">
                    Years of <br /> Experience
                </p>
            </div>

          </div>

          {/* RIGHT – Text */}
          <div>
            <span className="px-5 py-2 rounded-full border border-[#067CB6] px-8 py-2 text-sm font-semibold text-black bg-[#E7ECEF]">
                About Us
            </span>

            <h2 className="text-2xl font-semibold mb-4 mt-4 text-black">
              <span className="relative inline-block">
                <span className="relative z-10">Learn Any</span>

                {/* Yellow underline */}
                <Image
                  src="/yellow-underline.png"
                  alt=""
                  width={140}
                  height={14}
                  className="absolute left-0 -bottom-1 z-0"
                />
              </span>{" "}
              where, Any Time
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Since 2006, the institute has conducted the best offline and online diploma and certificate courses in forensic science and has gained immense popularity globally for revolutionizing the field of forensic education.
            </p>

            <p className="text-gray-600 text-sm leading-relaxed">
                The learner-friendly educational platform was established to fulfill the demand and supply difference between skilled forensic professionals and serve law enforcement agencies, government bodies, private forensic labs, and all those sectors that need expert forensic services.
            </p>

            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                We offer several short- and long-term certificate, diploma, postgraduate diploma, foundational, and professional courses, along with industry-specific internships and training programs.
            </p>

            <p className="text-gray-600 text-sm leading-relaxed">
                Our primary aim is to make forensic education accessible to all, even if they do not have access to traditional learning methods due to various constraints.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
                Our hands-on approach and inclusion of real-life case studies in our curriculum help students understand the complexities involved in solving complicated cases, thereby enabling them to put their learnings into action.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
