export default function CoursesHero() {
    return (
      <section 
        className="relative py-16
            bg-[url('/courses/hero-bg.png')]
            bg-cover bg-center bg-no-repeat"
        >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Courses
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Associate Degree Program
            </p>
          </div>
  
          {/* Right Image */}
          <div className="w-full md:w-[400px] h-[200px] rounded-xl overflow-hidden">
            <img
              src="/courses/hero.png"
              alt="Courses"
              className="w-full h-full object-cover"
            />
          </div>
  
        </div>
      </section>
    );
  }
  