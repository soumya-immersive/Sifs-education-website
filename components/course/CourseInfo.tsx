"use client";

export default function CourseInfo() {
  return (
    <div className="bg-white relative mt-10">

      {/* Decorative lines (top-left like screenshot) */}
      <div className="absolute -top-2 -left-2 w-12 h-12 bg-[url('/course/lines.svg')] bg-contain bg-no-repeat" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Course Info
        </h2>

        <div className="text-xs text-gray-500 text-right">
          <span className="ml-2 block font-semiBoldtext-md  text-black">Dec Batch 2025</span>
          <span className="text-xs font-normal text-black block">Last Date to Register : 25th Dec 2025</span>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
        <p>
          The Forensic Science & Criminal Investigation Online Course offered by
          SIFS India is perfect for students looking to gain an in-depth
          understanding of forensic science as a whole.
        </p>

        <p>
          You will learn the science behind solving crimes, the techniques used by
          expert investigators to identify, gather, preserve, and analyze
          evidence, and gain valuable knowledge and skills to excel in this
          field.
        </p>

        <p>
          All the pre-recorded sessions are delivered by subject matter experts
          and are loaded with real-life case studies, preparing you to face
          real-world challenges in forensic investigations.
        </p>

        <p>
          Associate Degree Program comprises of three levels: Level 1
          (certificate), Level 2 (diploma), and Level 3 (Post Graduate Diploma),
          and the entire curriculum is divided among these levels.
        </p>

        <p>
          A few of the topics you will learn about include forensic science
          fundamentals, crime scene investigation, cyber crimes, fingerprint and
          questioned document examination, wildlife forensics, drug and alcohol
          abuse, investigation across cases, crime investigation techniques, the
          role of forensic dentistry, sexual offenses, the role of insects in
          forensics, forensic facial reconstruction, disaster victim
          identification, forensic psychology, the significance of serological
          evidence, photographing crime scenes, forensic ballistics, forensic
          physics, and using toxicological findings for legal purposes.
        </p>

        <p>
          So if you are passionate about solving mysteries and looking for a
          career that combines science with justice, join this course and begin
          your forensic journey.
        </p>
      </div>
    </div>
  );
}
