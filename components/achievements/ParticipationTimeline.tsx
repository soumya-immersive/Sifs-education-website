"use client";

import Image from "next/image";

interface ParticipationTimelineProps {
  data: {
    headingPrefix: string;
    headingHighlight: string;
    headingSuffix: string;
    items: {
      year: string;
      text: string;
    }[];
  };
}

export default function ParticipationTimeline({
  data,
}: ParticipationTimelineProps) {
  if (!data) return null;

  return (
    <div>
      {/* Title */}
      <h3 className="text-2xl font-semibold mb-12 leading-snug text-black">
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
            width={220}
            height={16}
            className="absolute left-0 -bottom-1 z-0"
          />
        </span>{" "}
        <div
          dangerouslySetInnerHTML={{ __html: data.headingSuffix }}
          className="inline"
        />
      </h3>

      {/* Timeline Wrapper */}
      <div className="relative pl-4">

        {/* Vertical Line */}
        <span className="absolute left-[9px] top-2 h-[calc(100%-2.5rem)] w-[2px] bg-[#D08522]" />

        <ul className="space-y-12">
          {data.items.map((item, index) => (
            <li key={index} className="relative flex gap-6 group">

              {/* Diamond Marker */}
              <span className="absolute left-1 top-2 w-4 h-4 bg-[#D08522] rotate-45" />

              {/* Content */}
              <div className="ml-10 relative w-full">
                <div className="font-normal text-black text-xl mb-1">
                  <div
                    dangerouslySetInnerHTML={{ __html: item.year }}
                  />
                </div>
                <div className="text-sm text-[#525252] leading-relaxed max-w-xl">
                  <div
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
