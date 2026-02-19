"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    MapPin,
    Clock,
    Users,
    Phone,
    Video,
    ArrowLeft,
    ArrowRight,
    Play,
    Mail,
    Globe,
    Facebook,
    Linkedin,
    Twitter,
    Instagram,
    FileText,
    Download,
    ChevronRight,
    ChevronDown,
    LayoutGrid,
    CheckCircle2
} from "lucide-react";

interface Member {
    id: number;
    name: string;
    rank: string;
    education: string;
    about: string;
    image_url: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
}

interface Sponsor {
    id: number;
    website_name: string;
    url: string;
    image_url: string;
}

interface Hotel {
    id: number;
    name: string;
    email: string;
    mobile: string;
    url: string;
    address: string;
    image_url: string;
}

interface Scene {
    id: number;
    title: string;
    address: string;
    image_url: string;
}

interface Package {
    id: number;
    title: string;
    currency: string;
    price: number;
    description: string;
}

interface Faq {
    id: number;
    question: string;
    answer: string;
}

interface EventExplore {
    subtitle: string;
    description: string;
    image: string;
    image_url: string;
    facebook_url?: string;
    zoom_link?: string;
    schedule_pdf_url?: string;
}

interface EventData {
    event: {
        id: number;
        title: string;
        slug: string;
        banner_title: string;
        banner_subtitle: string;
        start_date: string;
        end_date: string;
        month_year: string;
        countdown: string;
        explore: EventExplore;
    };
    supportiveBody: Member[];
    scientificCommittee: Member[];
    volunteers: Member[];
    speakers: Member[];
    sponsors: Record<string, Sponsor[]>;
    hotels: Hotel[];
    scenes: Scene[];
    packages: Package[];
    gallery_images: { id: number; image_url: string }[];
    eventFaqs: Faq[];
}

interface Props {
    data: EventData;
}

export default function EventDetailClient({ data }: Props) {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);

    // Extract with robust fallback to prevent "null" property errors
    const event = data?.event || ({} as any);
    const speakers = data?.speakers || [];
    const supportiveBody = data?.supportiveBody || [];
    const scientificCommittee = data?.scientificCommittee || [];
    const volunteers = data?.volunteers || [];
    const sponsors = data?.sponsors || {};
    const hotels = data?.hotels || [];
    const scenes = data?.scenes || [];
    const packages = data?.packages || [];
    const gallery_images = data?.gallery_images || [];
    const eventFaqs = data?.eventFaqs || [];

    // Countdown logic
    useEffect(() => {
        if (!event?.countdown) return;

        const target = new Date(event.countdown).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = target - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft(null);
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [event.countdown]);

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="relative bg-[#0F172A] text-white py-24 overflow-hidden">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                    {event.explore?.image_url && (
                        <Image
                            src={event.explore.image_url}
                            alt="Background"
                            fill
                            className="object-cover opacity-20"
                            priority
                        />
                    )}
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-semibold uppercase tracking-wider text-sm">Back to Events</span>
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4">
                                {event.banner_subtitle || event.month_year}
                            </h2>
                            <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
                                {event.banner_title || event.title}
                            </h1>

                            {/* Countdown Timer */}
                            {timeLeft && (
                                <div className="flex gap-4 mb-10">
                                    {[
                                        { label: "Days", value: timeLeft.days },
                                        { label: "Hours", value: timeLeft.hours },
                                        { label: "Mins", value: timeLeft.minutes },
                                        { label: "Secs", value: timeLeft.seconds }
                                    ].map((unit) => (
                                        <div key={unit.label} className="flex flex-col items-center">
                                            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-lg mb-2">
                                                <span className="text-2xl font-black text-blue-400">{unit.value.toString().padStart(2, '0')}</span>
                                            </div>
                                            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">{unit.label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex flex-wrap gap-8 mb-10">
                                <div className="flex items-center gap-4 group">
                                    <div className="p-3 bg-blue-500/10 rounded-2xl group-hover:bg-blue-500/20 transition-colors border border-blue-500/20">
                                        <Calendar className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-1">Date</p>
                                        <p className="font-bold text-lg">{new Date(event.start_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="p-3 bg-purple-500/10 rounded-2xl group-hover:bg-purple-500/20 transition-colors border border-purple-500/20">
                                        <MapPin className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-1">Venue</p>
                                        <p className="font-bold text-lg">New Delhi, India</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => router.push(`/events/register/${event.slug}`)}
                                    className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black transition-all shadow-xl shadow-blue-600/30 flex items-center gap-2 transform hover:scale-105"
                                >
                                    REGISTER NOW <ArrowRight className="w-5 h-5" />
                                </button>
                                {event.explore?.schedule_pdf_url && (
                                    <a
                                        href={event.explore.schedule_pdf_url}
                                        target="_blank"
                                        className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black transition-all backdrop-blur-md flex items-center gap-2 border border-white/20"
                                    >
                                        <Download className="w-5 h-5" /> VIEW PDF
                                    </a>
                                )}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.15)] border border-white/10 group"
                        >
                            <Image
                                src={event.explore?.image_url || "/event-placeholder.jpg"}
                                alt={event.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-[2s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60"></div>

                            {/* Decorative accent */}
                            <div className="absolute bottom-8 left-8 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
                                <p className="text-white text-sm font-bold flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                    LIVE EVENT EXPERIENCE
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left Column: Core Info */}
                    <div className="lg:col-span-2 space-y-16">

                        {/* About Card */}
                        <motion.section
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-slate-200 border border-slate-100"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center border border-blue-100">
                                        <FileText className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">{event.explore?.subtitle || "Event Insights"}</h2>
                                        <p className="text-blue-600 font-bold uppercase tracking-widest text-xs mt-1">Conference Roadmap & Highlights</p>
                                    </div>
                                </div>
                                <div className="hidden md:block h-12 w-px bg-slate-100"></div>
                                <div className="flex gap-2">
                                    <Facebook className="w-5 h-5 text-slate-400 cursor-pointer hover:text-blue-600 transition-colors" />
                                    <Twitter className="w-5 h-5 text-slate-400 cursor-pointer hover:text-sky-500 transition-colors" />
                                    <Linkedin className="w-5 h-5 text-slate-400 cursor-pointer hover:text-blue-700 transition-colors" />
                                </div>
                            </div>

                            <div
                                className="prose prose-lg prose-blue max-w-none text-slate-600 leading-relaxed font-medium"
                                dangerouslySetInnerHTML={{ __html: event.explore?.description || "Join us for an immersive experience in forensic science advancements." }}
                            />
                        </motion.section>

                        {/* Elite Speakers */}
                        {speakers?.length > 0 && (
                            <section className="space-y-10">
                                <div className="flex items-end justify-between">
                                    <div className="space-y-2">
                                        <p className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs">Featured Experts</p>
                                        <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Elite Speakers</h2>
                                    </div>
                                    <div className="hidden sm:flex gap-4">
                                        <div className="p-3 bg-white rounded-full border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                                        </div>
                                        <div className="p-3 bg-white rounded-full border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                                            <ArrowRight className="w-5 h-5 text-slate-600" />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {speakers.map((speaker) => (
                                        <MemberCard key={speaker.id} member={speaker} variant="blue" />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Interactive Gallery */}
                        {gallery_images?.length > 0 && (
                            <section className="space-y-10">
                                <div className="space-y-2">
                                    <p className="text-emerald-600 font-black uppercase tracking-[0.2em] text-xs">Visual Story</p>
                                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Event Gallery</h2>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {gallery_images.map((img, idx) => (
                                        <motion.div
                                            key={img.id}
                                            whileHover={{ scale: 0.98 }}
                                            className={`relative rounded-3xl overflow-hidden cursor-crosshair group ${idx === 0 ? "col-span-2 row-span-2 h-[400px]" : "h-[192px]"}`}
                                        >
                                            <Image src={img.image_url} alt="Gallery" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Committees */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {scientificCommittee?.length > 0 && (
                                <section className="space-y-8">
                                    <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                                        <div className="w-1.5 h-8 bg-purple-600 rounded-full"></div>
                                        Scientific Committee
                                    </h3>
                                    <div className="space-y-4">
                                        {scientificCommittee.map((member) => (
                                            <MemberRow key={member.id} member={member} />
                                        ))}
                                    </div>
                                </section>
                            )}
                            {supportiveBody?.length > 0 && (
                                <section className="space-y-8">
                                    <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                                        <div className="w-1.5 h-8 bg-indigo-600 rounded-full"></div>
                                        Supportive Body
                                    </h3>
                                    <div className="space-y-4">
                                        {supportiveBody.map((member) => (
                                            <MemberRow key={member.id} member={member} />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Coordination Volunteers */}
                        {volunteers?.length > 0 && (
                            <section className="bg-slate-900 rounded-[3rem] p-12 text-white overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px]"></div>
                                <div className="relative z-10 mb-10 text-center">
                                    <h2 className="text-3xl font-black">Coordinating Volunteers</h2>
                                    <p className="text-slate-400 text-sm mt-2">The engine behind our successful organization</p>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                                    {volunteers.map((v) => (
                                        <div key={v.id} className="text-center group">
                                            <div className="relative w-28 h-28 mx-auto mb-4 rounded-[2rem] overflow-hidden group-hover:-translate-y-2 transition-transform duration-500 ring-2 ring-white/10 group-hover:ring-blue-500/50">
                                                <Image src={v.image_url} alt={v.name} fill className="object-cover" />
                                            </div>
                                            <h4 className="font-bold text-sm tracking-tight">{v.name}</h4>
                                            <p className="text-[10px] uppercase font-black text-blue-400 tracking-widest mt-1">{v.rank}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* FAQs Section */}
                        {eventFaqs?.length > 0 && (
                            <section className="space-y-10">
                                <div className="text-center space-y-2">
                                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Frequently Asked Questions</h2>
                                    <p className="text-slate-500 font-medium">Clear your doubts about the registration and event structure</p>
                                </div>
                                <div className="space-y-4 max-w-4xl mx-auto">
                                    {eventFaqs.map((faq) => (
                                        <FaqAccordion key={faq.id} faq={faq} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-10">

                        {/* Registration Ticket */}
                        <section className="sticky top-8 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 overflow-hidden border border-blue-50"
                            >
                                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white relative h-32 flex flex-col justify-end">
                                    <LayoutGrid className="absolute top-6 right-6 w-16 h-16 opacity-10" />
                                    <h3 className="text-2xl font-black tracking-tight leading-none mb-1">Registration Portal</h3>
                                    <p className="text-blue-100/70 text-xs font-bold uppercase tracking-widest">Select Your Entry Type</p>
                                </div>

                                <div className="p-8 space-y-6">
                                    <div className="space-y-4">
                                        {packages?.map((pkg) => (
                                            <button
                                                key={pkg.id}
                                                className="w-full text-left p-5 rounded-3xl border-2 border-slate-50 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-black text-slate-800 group-hover:text-blue-700 transition-colors uppercase tracking-tight text-sm">{pkg.title}</h4>
                                                    <span className="text-blue-600 font-black text-sm">
                                                        {pkg.price === 0 ? "FREE" : `₹${pkg.price}`}
                                                    </span>
                                                </div>
                                                <p className="text-slate-500 text-[10px] leading-tight font-medium uppercase tracking-wider">{pkg.description}</p>
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => router.push(`/events/register/${event.slug}`)}
                                        className="w-full py-5 bg-[#0F172A] hover:bg-blue-600 text-white rounded-3xl font-black transition-all shadow-xl shadow-slate-900/20 active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                                    >
                                        Checkout Now <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>

                            {/* Event Sponsors */}
                            {sponsors && Object.keys(sponsors).length > 0 && (
                                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-100 border border-slate-50">
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 text-center">Major Global Sponsors</h4>
                                    <div className="space-y-8">
                                        {Object.entries(sponsors).map(([cat, list]) => (
                                            <div key={cat} className="space-y-3">
                                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 py-1 px-3 rounded-full inline-block">{cat}</p>
                                                <div className="flex flex-wrap gap-4">
                                                    {list.map((s) => (
                                                        <a key={s.id} href={s.url} target="_blank" className="p-4 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-blue-100 group">
                                                            <Image src={s.image_url} alt={s.website_name} width={120} height={60} className="object-contain max-h-10 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Nearest Stays */}
                            {hotels?.length > 0 && (
                                <div className="space-y-6">
                                    <h4 className="text-sm font-black text-slate-900 pl-2 border-l-4 border-blue-600 leading-none">Accommodation Partners</h4>
                                    {hotels.slice(0, 2).map((h) => (
                                        <div key={h.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-50 group">
                                            <div className="relative h-44">
                                                <Image src={h.image_url} alt={h.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-slate-900 shadow-sm">
                                                    PARTNER HOTEL
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h5 className="font-black text-slate-900 leading-tight mb-2 truncate">{h.name}</h5>
                                                <div className="flex items-start gap-2 text-xs text-slate-500 mb-4">
                                                    <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                                    <span className="line-clamp-1">{h.address}</span>
                                                </div>
                                                <a href={h.url} target="_blank" className="flex items-center justify-center gap-2 w-full py-3 bg-blue-50 text-blue-600 rounded-2xl font-bold text-xs hover:bg-blue-600 hover:text-white transition-all transform active:scale-95">
                                                    View Details <ArrowRight className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Nearby Scenes */}
                            {scenes?.length > 0 && (
                                <div className="space-y-6">
                                    <h4 className="text-sm font-black text-slate-900 pl-2 border-l-4 border-emerald-600 leading-none">Local Attractions</h4>
                                    <div className="grid grid-cols-1 gap-4">
                                        {scenes.map((scene) => (
                                            <div key={scene.id} className="bg-white p-4 rounded-[2rem] border border-slate-100 flex items-center gap-4 hover:shadow-lg transition-all">
                                                <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
                                                    <Image src={scene.image_url} alt={scene.title} fill className="object-cover" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h5 className="font-bold text-slate-900 text-sm truncate">{scene.title}</h5>
                                                    <p className="text-[10px] text-slate-500 truncate">{scene.address}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MemberCard({ member, variant }: { member: Member; variant: "blue" | "purple" }) {
    const theme = variant === "blue"
        ? { accent: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" }
        : { accent: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 flex gap-8 items-start group"
        >
            <div className={`relative w-32 h-32 rounded-[2rem] overflow-hidden ${theme.bg} ring-4 ring-slate-50 group-hover:ring-blue-50 transition-all flex-shrink-0`}>
                <Image src={member.image_url} alt={member.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-2xl font-black text-slate-900 tracking-tight leading-tight mb-1 truncate">{member.name}</h4>
                <p className={`${theme.accent} font-black uppercase tracking-widest text-[10px] mb-2`}>{member.rank}</p>
                <p className="text-slate-500 text-xs italic mb-4 line-clamp-1">{member.education}</p>
                <div className="flex gap-2">
                    {member.linkedin && <a href={member.linkedin} className="p-2 bg-slate-50 rounded-xl hover:bg-blue-100 text-slate-400 hover:text-blue-700 transition-colors"><Linkedin className="w-4 h-4" /></a>}
                    {member.twitter && <a href={member.twitter} className="p-2 bg-slate-50 rounded-xl hover:bg-sky-100 text-slate-400 hover:text-sky-500 transition-colors"><Twitter className="w-4 h-4" /></a>}
                </div>
            </div>
        </motion.div>
    );
}

function MemberRow({ member }: { member: Member }) {
    return (
        <div className="flex items-center gap-4 p-4 bg-white rounded-3xl border border-slate-50 shadow-sm hover:shadow-md transition-shadow group">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                <Image src={member.image_url} alt={member.name} fill className="object-cover group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex-1 min-w-0">
                <h5 className="font-bold text-slate-900 text-sm truncate uppercase tracking-tight">{member.name}</h5>
                <p className="text-[10px] text-slate-500 font-bold uppercase truncate tracking-widest">{member.rank}</p>
            </div>
            <button className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                <ArrowRight className="w-5 h-5" />
            </button>
        </div>
    );
}

function FaqAccordion({ faq }: { faq: Faq }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`rounded-3xl border border-slate-100 overflow-hidden transition-all duration-300 ${isOpen ? "bg-white shadow-xl shadow-slate-200" : "bg-slate-50"}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left"
            >
                <span className={`text-lg font-bold tracking-tight ${isOpen ? "text-blue-600" : "text-slate-900"}`}>{faq.question}</span>
                <div className={`p-2 rounded-xl transition-all duration-300 ${isOpen ? "bg-blue-600 text-white rotate-180 shadow-lg shadow-blue-600/30" : "bg-white text-slate-400"}`}>
                    <ChevronDown className="w-5 h-5" />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6"
                    >
                        <div className="pt-2 text-slate-600 leading-relaxed font-medium pl-2 border-l-2 border-blue-100">
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
