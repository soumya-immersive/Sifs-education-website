"use client";

import Image from "next/image";

export default function OurPresence() {
  return (
    <section
      className="py-20 bg-cover bg-center"
      style={{
        backgroundImage: "url('/about-us/initiatives-bg.png')",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* OUTER CARD */}
        <div className="bg-[#F5F6FA] rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT IMAGE BLOCK */}
            <div className="relative flex justify-center lg:justify-start">
              {/* Gradient shape behind image */}
              <Image
                src="/achievements/presence.png"
                alt="Our Presence"
                width={420}
                height={520}
                className="relative z-10 rounded-2xl object-cover"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div>
            <h2 className="text-2xl lg:text-3xl font-semibold text-black mb-4">
              Our{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Presence</span>

                {/* Yellow underline image */}
                <Image
                  src="/yellow-underline.png"
                  alt=""
                  width={160}
                  height={14}
                  className="absolute left-0 -bottom-1 z-0"
                />
              </span>
            </h2>

              <p className="text-sm text-gray-600 leading-relaxed mb-8 max-w-xl">
                Since 2006, the Sherlock Institute of Forensic Science India has witnessed extensive growth globally in the field of forensic education and investigation. We have conducted numerous in-house and customized outdoor training programs and workshops, catering to students, professionals, and law enforcement officials. Our mission is to strengthen the knowledge base of aspiring forensic professionals and law enforcement professionals from diverse backgrounds, which is essential in today’s competitive world.
              </p>

              {/* MEDIA PRESENCE LISTS */}
              <div className="grid sm:grid-cols-3 gap-6 text-sm">

                {/* COLUMN 1 */}
                <div>
                  <p className="font-semibold text-black mb-3">
                    Media Presence
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    {["News Nation", "Aajtak Update", "Sahara"].map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-green-500">✔</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* COLUMN 2 */}
                <div>
                  <p className="font-semibold text-black mb-3">
                    Media Presence
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    {["Zee Hindustan", "NDTV", "Nav Bharat"].map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-green-500">✔</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* COLUMN 3 */}
                <div>
                  <p className="font-semibold text-black mb-3">
                    Media Presence
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    {["Punjab Kesari", "Dainik Jagran"].map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-green-500">✔</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
