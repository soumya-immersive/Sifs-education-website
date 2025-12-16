import Link from "next/link";

export default function CourseCard({ course }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
      
      <div className="h-44 rounded-t-xl overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <p className="text-xs text-[#D08522] font-medium mb-1">
          {course.code}
        </p>

        <h3 className="font-medium text-black mb-2 leading-snug text-lg min-h-12">
          {course.title}
        </h3>

        <p className="text-sm text-[#6B7385] mb-4 min-h-10">
          {course.description}
        </p>

        <Link
          href={`/courses/${course.slug}`}
          className="cursor-pointer inline-block bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-lg text-sm font-medium"
        >
          Enroll Now →
        </Link>
      </div>
    </div>
  );
}
