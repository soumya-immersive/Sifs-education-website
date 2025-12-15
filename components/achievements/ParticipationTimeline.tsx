import Image from "next/image";

export default function ParticipationTimeline() {
  const timeline = [
    {
      year: "2015",
      text:
        "First Prize in Poster Presentation at the National Conference on the Role of Forensic Science in Crime Against Women, RFSCW-CON-2015, Gwalior University",
    },
    {
      year: "2016",
      text:
        "First Prize in Poster presentation in National Seminar on 'Role of Forensic Science in Disaster Victim Identification in Indian Perspective', Bundelkhand University, Uttar Pradesh",
    },
    {
      year: "2017",
      text:
        "Third Prize in Poster presentation in National Seminar on 'Future perspectives of Forensic Science in India', Bundelkhand University, Uttar Pradesh",
    },
  ];

  return (
    <div>
      {/* Title */}
      <h3 className="text-2xl font-semibold mb-12 leading-snug text-black">
        Participation of{" "}
        <span className="relative inline-block">
          <span className="relative z-10">Sherlock Institute</span>

          {/* Yellow underline image */}
          <Image
            src="/yellow-underline.png"
            alt=""
            width={220}
            height={16}
            className="absolute left-0 -bottom-1 z-0"
          />
        </span>{" "}
        of Forensic Science
      </h3>

      {/* Timeline Wrapper */}
      <div className="relative pl-4">

        {/* Vertical Line */}
        <span className="absolute left-[9px] top-2 h-[calc(100%-2.5rem)] w-[2px] bg-[#D08522]" />

        <ul className="space-y-12">
          {timeline.map((item, index) => (
            <li key={index} className="relative flex gap-6">

              {/* Diamond Marker */}
              <span className="absolute left-1 top-2 w-4 h-4 bg-[#D08522] rotate-45" />

              {/* Content */}
              <div className="ml-10">
                <p className="font-normal text-black text-xl mb-1">
                  {item.year}
                </p>
                <p className="text-sm text-[#525252] leading-relaxed max-w-xl">
                  {item.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
