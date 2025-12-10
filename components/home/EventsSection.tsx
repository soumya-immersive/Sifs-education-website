// components/home/EventsSection.tsx
import Image from "next/image";

type Event = {
  id: number;
  title: string;
  date: string;
  mode: string;
  description: string;
  image: string;
};

const events: Event[] = [
  {
    id: 1,
    title: "Digital Forensics & Cyber Security",
    date: "08 Dec, 2025",
    mode: "Online Zoom",
    description:
      "A micro certificate program offered by Sherlock Institute of Forensic Science (SIFS) India.",
    image: "/events/event-1.jpg",
  },
  {
    id: 2,
    title: "6th International Forensic Science Conference",
    date: "08 Dec, 2025",
    mode: "Online Zoom",
    description:
      "An intensive 5‑day program focused on contemporary forensic science domains.",
    image: "/events/event-2.jpg",
  },
  {
    id: 3,
    title: "Global Dimensions of Forensic Science",
    date: "08 Dec, 2025",
    mode: "Online Zoom",
    description:
      "A program exploring global best practices in forensic science and justice.",
    image: "/events/event-3.jpg",
  },
  {
    id: 4,
    title: "6th International Forensic Science Conference",
    date: "08 Dec, 2025",
    mode: "Online Zoom",
    description:
      "An intensive 5‑day program focused on contemporary forensic science domains.",
    image: "/events/event-2.jpg",
  },
];

export default function EventsSection() {
  return (
    <section className="bg-gradient-to-r from-white via-white to-violet-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header row */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-sky-500">
              Upcoming Events
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-gray-900 md:text-3xl">
              Explore <span className="text-sky-600">Events</span>
            </h2>
          </div>

          <button className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2 text-sm font-semibold text-white shadow-lg hover:shadow-xl">
            Explore →
          </button>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <article
              key={event.id}
              className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            >
              {/* top image */}
              <div className="relative h-44 w-full">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* content */}
              <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                {/* meta row */}
                <div className="mb-3 flex items-center justify-between text-[11px] text-gray-500">
                  <div className="flex items-center gap-1">
                    <span className="text-sky-500">📅</span>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-amber-500">●</span>
                    <span>{event.mode}</span>
                  </div>
                </div>

                <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900">
                  {event.title}
                </h3>

                <p className="mb-4 line-clamp-3 text-xs text-gray-500">
                  {event.description}
                </p>

                {/* bottom: timer + link */}
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex gap-1 text-[10px] font-semibold text-sky-700">
                    {["12 Days", "11 Hours", "45 Min", "38 Sec"].map((t) => (
                      <div
                        key={t}
                        className="rounded-md bg-sky-50 px-2.5 py-1 text-center"
                      >
                        {t}
                      </div>
                    ))}
                  </div>

                  <button className="text-[11px] font-semibold text-gray-500 hover:text-gray-700">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
