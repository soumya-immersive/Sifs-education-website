"use client";

import Image from "next/image";

interface OurPresenceProps {
  data: {
    backgroundImage: string;
    mainImage: string;
    headingPrefix: string;
    headingHighlight: string;
    description: string;
    mediaLists: {
      title: string;
      items: string[];
    }[];
  };
}

export default function OurPresence({
  data,
}: OurPresenceProps) {

  if (!data) return null;

  return (
    <section className="relative py-20 bg-cover bg-center">
      {/* Background Image - Absolute */}
      <div className="absolute inset-0 z-0">
        <img
          src={data.backgroundImage || "/placeholder.png"}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* OUTER CARD */}
        <div className="bg-[#F5F6FA] rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT IMAGE BLOCK */}
            <div className="relative flex justify-center lg:justify-start">
              {/* Gradient shape behind image - kept as part of design, or could be editable if needed but usually static */}
              <img
                src={data.mainImage || "/placeholder.png"}
                alt="Our Presence"
                className="relative z-10 rounded-2xl object-cover"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold text-black mb-4">
                <div
                  dangerouslySetInnerHTML={{ __html: data.headingPrefix }}
                  className="inline"
                />{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">
                    <div
                      dangerouslySetInnerHTML={{ __html: data.headingHighlight }}
                      className="inline"
                    />
                  </span>

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

              <div className="text-sm text-gray-600 leading-relaxed mb-8 max-w-xl">
                <div
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </div>

              {/* MEDIA PRESENCE LISTS */}
              <div className="grid sm:grid-cols-3 gap-6 text-sm">

                {data.mediaLists.map((list, i) => (
                  <div key={i}>
                    <div className="font-semibold text-black mb-3">
                      <div
                        dangerouslySetInnerHTML={{ __html: list.title }}
                      />
                    </div>
                    <ul className="space-y-2 text-gray-600">
                      {list.items.map((item, j) => (
                        <li key={j} className="flex gap-2 group relative">
                          <span className="text-green-500">✔</span>
                          <div className="flex-1">
                            <div
                              dangerouslySetInnerHTML={{ __html: item }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
