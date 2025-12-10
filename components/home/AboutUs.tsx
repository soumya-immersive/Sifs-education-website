// components/home/AboutUs.tsx
export default function AboutUs() {
    return (
      <>
<section className="bg-white py-16">
  <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 lg:flex-row lg:items-start lg:gap-16">
    
    {/* Left: Image + Badge */}
    <div className="relative w-full max-w-md">
      {/* Big rounded image */}
      <div className="overflow-hidden rounded-[120px]">
        <img
          src="/home-about.png" // replace with your actual image path
          alt="Students learning online"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Experience badge */}
      <div className="absolute -left-4 bottom-6 flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 px-6 py-4 text-white shadow-xl">
        <div className="text-3xl font-bold leading-none">19+</div>
        <div className="ml-3 text-xs font-medium leading-tight uppercase tracking-wide">
          <div>Year of</div>
          <div>Experience</div>
        </div>
      </div>
    </div>

    {/* Right: Text Content */}
    <div className="w-full max-w-xl">
      {/* Pill button */}
      <button className="mb-4 rounded-full border border-gray-200 px-6 py-2 text-sm font-semibold text-gray-700">
        About Us
      </button>

      <h2 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
        Learn Anywhere, Any Time
      </h2>

      <p className="mb-6 text-sm text-gray-500">
        Online learning is one of the most flexible ways to gain knowledge,
        irrespective of location, travel, schedule, and accommodation
        constraints. You can opt for a flexible study routine that fits your
        everyday schedule when you learn online.
      </p>

      <h3 className="mb-3 text-base font-semibold text-gray-900">
        Student Zone
      </h3>

      <div className="grid grid-cols-1 gap-4 text-sm text-gray-700 sm:grid-cols-2">
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="mr-2 text-green-500">✓</span> Admission Letter
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-green-500">✓</span> ID Card
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-green-500">✓</span> Study Materials
          </li>
        </ul>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="mr-2 text-green-500">✓</span> Completion Letter
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-green-500">✓</span> Certificate of Achievement
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-green-500">✓</span> Statement of Mark
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

      </>
    );
  }
  