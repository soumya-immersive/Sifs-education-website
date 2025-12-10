// components/home/GlobalInfluence.tsx

import Image from "next/image";

const partners = [
  { name: "Aster Heal Group", logo: "/global-influence/1.png" },
  { name: "ACPM Medical College", logo: "/global-influence/2.png" },
  { name: "Birla Sun Life", logo: "/global-influence/3.png" },
  { name: "University Partner", logo: "/global-influence/4.png" },
  { name: "Accenture", logo: "/global-influence/5.png" },
  { name: "Sri Paramakalyani College", logo: "/global-influence/6.png" },
];

export default function GlobalInfluence() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Card with layered shadow effect */}
        <div className="relative">
          {/* bottom layers */}
          <div className="absolute inset-x-4 -bottom-5 h-5 rounded-2xl bg-white/80 shadow-md" />
          <div className="absolute inset-x-8 -bottom-10 h-5 rounded-2xl bg-white/60 shadow-sm" />

          {/* main card */}
          <div className="relative rounded-3xl bg-white px-6 py-10 shadow-xl md:px-10">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
                Creating Global Influence
              </h2>
              <p className="mt-2 text-sm text-gray-500 md:text-base">
                Influencing and spreading forensic skills globally.
              </p>
            </div>

            {/* logos row */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="flex h-16 w-28 items-center justify-center md:h-20 md:w-32"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={128}
                    height={80}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
