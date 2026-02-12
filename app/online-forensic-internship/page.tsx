import { notFound } from "next/navigation";
import InternshipsHero from "../../components/internships/InternshipsHero";
import InternshipsFilterBar from "../../components/internships/InternshipsFilterBar";
import InternshipsGrid from "../../components/internships/InternshipsGrid";
import Learning from "../../components/internships/Learning";

async function getOnlineForensicInternships(params: { [key: string]: string | string[] | undefined }) {
    const queryParams = new URLSearchParams();
    if (params.search) queryParams.append('search', params.search as string);
    if (params.sno) queryParams.append('sno', params.sno as string);
    if (params.sduration) queryParams.append('sduration', params.sduration as string);
    if (params.scat) queryParams.append('scat', params.scat as string);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/EducationAndInternship/Website/training/online-forensic-internship?${queryParams.toString()}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default async function OnlineForensicInternshipPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const data = await getOnlineForensicInternships(params);

    if (!data || !data.success || !data.data || !data.data.data) {
        notFound();
    }

    const internshipsData = data.data.data.map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        description: item.sub_title,
        image: item.image_url,
        slug: item.slug,
        programSlug: 'online-forensic-internship', // Hardcoded for this page
        category: item.mode_of_study,
        duration: item.duration,
        level: item.level || 'All Levels',
        rating: 4.8,
        reviews: 120,
        students: 500,
        price: item.price_level_1,
        // Mock original price if needed
        originalPrice: item.price_level_1 ? parseInt(item.price_level_1) + 500 : 0,
        tags: ['Featured', 'Online'],
        features: ['Certification', 'Flexible', 'Expert Led']
    }));

    const programData = {
        title: "Online Forensic Internship",
        description: "Gain expertise in forensic science from the comfort of your home with our comprehensive online internship programs.",
        slug: "online-forensic-internship",
        label: "Online Forensic Internship",
    };

    return (
        <main>
            <InternshipsHero program={programData} />
            <InternshipsFilterBar />
            <InternshipsGrid internships={internshipsData} />
            <Learning />
        </main>
    );
}
