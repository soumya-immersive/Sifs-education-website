import { notFound } from "next/navigation";
import InternshipsHero from "../../components/internships/InternshipsHero";
import InternshipsFilterBar from "../../components/internships/InternshipsFilterBar";
import InternshipsGrid from "../../components/internships/InternshipsGrid";
import Learning from "../../components/internships/Learning";

// You will likely need to adapt these components or create new ones if they are tightly coupled to the old data structure.
// However, assuming they are reusable or you want to reuse the layout:

async function getLabBasedInternships(params: { [key: string]: string | string[] | undefined }) {
    const queryParams = new URLSearchParams();
    if (params.search) queryParams.append('search', params.search as string);
    if (params.sno) queryParams.append('sno', params.sno as string);
    if (params.sduration) queryParams.append('sduration', params.sduration as string);
    if (params.scat) queryParams.append('scat', params.scat as string);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/EducationAndInternship/Website/training/lab-based-internship?${queryParams.toString()}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default async function LabBasedInternshipPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const data = await getLabBasedInternships(params);

    if (!data || !data.success || !data.data || !data.data.data) {
        notFound();
    }

    const internshipsData = data.data.data.map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        description: item.sub_title,
        // Map other fields as necessary to match what InternshipsGrid expects
        // For now, assuming InternshipsGrid expects an object with specific fields.
        // You might need to adjust InternshipsGrid or mapping here.
        // Based on typical component needs:
        image: item.image_url,
        slug: item.slug,
        programSlug: 'lab-based-internship', // Hardcoded as this is that page
        category: item.mode_of_study, // e.g. "Lab Based Internship"
        duration: item.duration,
        level: item.level || 'All Levels',
        rating: 4.8, // Default or mock
        reviews: 120, // Default or mock
        students: 500, // Default or mock
        price: item.price_level_1,
        originalPrice: parseInt(item.price_level_1) + 5000, // Mock original price if needed
        tags: ['Featured', 'Lab Based'],
        features: ['Certification', 'Hands-on', 'Expert Led']
    }));

    const programData = {
        title: "Lab Based Internship",
        description: "Gain hands-on experience in a fully equipped forensic laboratory. Work alongside experts on real cases and advanced technologies.",
        slug: "lab-based-internship",
        label: "Lab Based Internship", // Added to satisfy TS interface
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
