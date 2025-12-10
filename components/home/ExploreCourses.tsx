// components/ExploreCourses.tsx

// You'll need to install these icons: npm install lucide-react
import { Check, Shield, TrendingUp, Briefcase } from 'lucide-react';
import Image from 'next/image';

const features = [
  { icon: Shield, title: "Learn Anywhere, Anytime", description: "Flexible online learning schedules." },
  { icon: Check, title: "100% Practical Training", description: "Hands-on, real-world case studies." },
  { icon: TrendingUp, title: "Career Placement Support", description: "Expert guidance for job placement." },
  { icon: Briefcase, title: "Industry Expert Faculty", description: "Learn from top forensic professionals." },
];

const courseCards = [
    { title: "Forensic Science", image: "/course1.jpg", details: ["Online Courses", "2 Years", "Diploma/Certification"] },
    { title: "Cyber Security", image: "/course2.jpg", details: ["Virtual Classes", "1 Year", "Advanced Certification"] },
    { title: "Investigation & Law", image: "/course3.jpg", details: ["Classroom Sessions", "6 Months", "Executive Diploma"] },
];

const ExploreCourses = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:mt-24">
            
            {/* WHY CHOOSE US Section */}
            <div className="text-center mb-16">
                <h2 className="text-xl font-semibold text-indigo-600 mb-2">WHY CHOOSE US</h2>
                <h3 className="text-4xl font-bold text-gray-800">Creating Breakthroughs</h3>
                <div className="flex justify-center mt-10 flex-wrap gap-6">
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            className="w-full sm:w-64 p-6 bg-white rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow"
                        >
                            <feature.icon className="w-8 h-8 mx-auto text-indigo-600 mb-3" />
                            <h4 className="font-bold text-gray-900">{feature.title}</h4>
                            <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* EXPLORE COURSES Section */}
            <div className="mb-12">
                <h2 className="text-4xl font-bold text-gray-800 text-center">Explore Courses</h2>
                <p className="text-center text-gray-600 mt-2">Discover our diverse range of forensic programs.</p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {courseCards.map((card, index) => (
                    <div 
                        key={index} 
                        className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
                    >
                        {/* Course Image */}
                        <div className="relative h-48">
                            <Image 
                                src={card.image} 
                                alt={card.title} 
                                fill={true} 
                                className="object-cover" 
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            {/* Blue Badge (Exact UI is tricky, using a simple badge) */}
                            <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold py-1 px-3 rounded-full">
                                {card.details[0]}
                            </span>
                        </div>
                        
                        {/* Course Content */}
                        <div className="p-6">
                            <h4 className="text-xl font-bold text-gray-800 mb-3">{card.title}</h4>
                            <div className="flex items-center text-sm text-gray-500 space-x-3">
                                {/* Using a simple list instead of the icons, for simplicity */}
                                <span>{card.details[1]}</span>
                                <span className="text-gray-300">|</span>
                                <span>{card.details[2]}</span>
                            </div>
                            
                            {/* Explore Button */}
                            <button className="mt-5 w-full bg-indigo-600/10 text-indigo-600 font-semibold py-3 rounded-xl hover:bg-indigo-600 hover:text-white transition-colors">
                                Explore
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Blue Banner CTA (from Screenshot 2) */}
            <div className="mt-20 relative bg-blue-600 p-8 md:p-12 rounded-3xl overflow-hidden">
                {/* Background dots/shapes */}
                <div className="absolute inset-0 bg-dots opacity-20"></div> 
                
                {/* Content */}
                <div className="relative flex flex-col lg:flex-row items-center justify-between z-10">
                    <div className="lg:w-3/5 text-white mb-6 lg:mb-0">
                        <h4 className="text-3xl md:text-4xl font-bold mb-4">Forensic Science Institute</h4>
                        <p className="text-sm">
                            The Sherlock Institute of Forensic Science (SIFS) India was set up in 2006 with the mission to make forensic education available to all and with a vision to make India a crime-free place to live by creating a skilled workforce of forensic experts to assist law enforcement agencies and the judiciary in bringing justice to the table within time.
                        </p>
                    </div>
                    
                    {/* Image (Student pointing) */}
                    <div className="lg:w-1/4 flex justify-end">
                        <Image 
                            src="/student-pointing.png" // ASSUMING this image is in public
                            alt="Student pointing" 
                            width={200} 
                            height={250} 
                            className="object-contain" 
                        />
                    </div>
                </div>
                
                {/* Buttons overlaying the image/banner end (re-creating the look) */}
                <div className="mt-8 flex space-x-4">
                    <button className="flex items-center bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                        Explore →
                    </button>
                    <button className="flex items-center bg-transparent border border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors">
                        Watch Video →
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ExploreCourses;