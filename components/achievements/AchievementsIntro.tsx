import Image from "next/image";

export default function AchievementsIntro() {
    return (
        <section
            className="py-20 bg-cover bg-center no-repeat"
            style={{
                backgroundImage: "url('/achievements/intro-bg.png')",
            }}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-14 items-start">
                    <div className="relative w-full">
                        <Image
                            src="/achievements/achievements-intro.png"
                            alt="SIFS Achievements"
                            width={520}
                            height={420}
                            className="w-full h-auto rounded-2xl object-cover"
                            priority
                        />
                    </div>

                    <div>
                        <span className="px-5 py-2 rounded-full border border-[#067CB6] px-8 py-2 text-sm font-semibold text-black bg-[#E7ECEF]">
                            SIFS Achievement
                        </span>

                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-4">
                            <span className="relative inline-block">
                                <span className="relative z-10">Our Achievements</span>

                                {/* Yellow underline image */}
                                <Image
                                src="/yellow-underline.png"
                                alt=""
                                width={220}
                                height={16}
                                className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-0"
                                />
                            </span>
                        </h2>

                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            The Sherlock Institute of Forensic Science, India, founded by Dr. Ranjeet Singh in 2006, is an ISO 9001:2015-certified institute registered with the Government of India.
                        </p>

                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            Dr. Ranjeet Singh, its founder and CEO, possesses over a decade of expertise in domains like cyber forensics, digital forensics, fingerprint examination, questioned document examination, and cyber security and has delivered expert opinions in hundreds of criminal cases throughout his career.
                        </p>

                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            His dedication to his work has earned him multiple awards, and he is constantly working to equip a new generation of budding forensic experts with the practical skills needed to excel in the forensic domain through webinars, conferences, workshops, training, and courses worldwide.
                        </p>

                        <ul className="text-sm text-[#00467A] list-disc pl-5 space-y-3">
                            <li>Awards from Mr. Biri Singh Sinsinwar, President of the Indian Bar Council.</li>
                            <li>Speaker in Residence at King George Medical University in Lucknow, India's Uttar Pradesh.</li>
                            <li>Honorable Speaker at a DIRD, Delhi-sponsored session on Emerging Trends in Cyber Forensic</li>
                            <li>At India's New Delhi, at the National Institute of Criminology and Forensic Science</li>
                            <li>ISC Association's Research Journal of Forensic Sciences' editorial board member is from India.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
