import { API_BASE_URL, BASE_URL } from "@/lib/config";
import EventsHero from "../../components/events/EventsHero";
// import UpcomingEvents from "../../components/events/UpcomingEvents";
import EventsSection from "../../components/home/EventsSection";
import JourneyStats from "../../components/events/JourneyStats";
import ArchiveProgram from "../../components/events/ArchiveProgram";
import ExpertTeam from "../../components/common/ExpertTeam";
import Participatory from "../../components/events/Participatory";
import ForensicInsightsSection from '../../components/events/ForensicInsightsSection';
import DownloadCertificate from "../../components/events/DownloadCertificate";

// API fetch function
async function getEventsPageData() {
  try {
    const apiUrl = API_BASE_URL;

    console.log('🔍 Fetching events page data...');

    // Fetch main events page data
    const response = await fetch(`${apiUrl}/EventManagement/Website`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('❌ Failed to fetch events page data:', response.status);
      return null;
    }

    const result = await response.json();
    console.log('✅ Main API data fetched successfully');

    if (!result.success || !result.data) {
      console.error('❌ Invalid main API response structure');
      return null;
    }

    // Fetch archive events separately from the correct endpoint
    // Use 2025 as default year since archive events are from past years
    const archiveYear = 2025;
    const archiveUrl = `${apiUrl}/EventManagement/Website/events?type=archive&year=${archiveYear}`;

    console.log('🔍 Fetching archive events from:', archiveUrl);

    const archiveResponse = await fetch(archiveUrl, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('📊 Archive API Response Status:', archiveResponse.status);

    let archiveEvents = [];
    if (archiveResponse.ok) {
      const archiveResult = await archiveResponse.json();
      console.log('📦 Archive API Response:', JSON.stringify(archiveResult, null, 2));

      if (archiveResult.success && archiveResult.data && archiveResult.data.data) {
        archiveEvents = archiveResult.data.data;
        console.log(`✅ Found ${archiveEvents.length} archive events`);
      } else {
        console.warn('⚠️ Archive API returned success but no data');
      }
    } else {
      console.error('❌ Archive API failed with status:', archiveResponse.status);
      const errorText = await archiveResponse.text();
      console.error('Error response:', errorText);
    }

    // Fetch blogs for Forensic Insights section
    const blogsUrl = `${apiUrl}/EducationAndInternship/Website/front/blogs?search=`;

    console.log('🔍 Fetching blogs from:', blogsUrl);

    const blogsResponse = await fetch(blogsUrl, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('📊 Blogs API Response Status:', blogsResponse.status);

    let blogs = [];
    if (blogsResponse.ok) {
      const blogsResult = await blogsResponse.json();
      console.log('📦 Blogs API Response:', JSON.stringify(blogsResult, null, 2));

      if (blogsResult.success && blogsResult.data && blogsResult.data.data) {
        // Transform blog data to include full image URL
        blogs = blogsResult.data.data.map((blog: any) => ({
          ...blog,
          main_image_url: `${BASE_URL}/uploads/blogs/${blog.main_image}`,
          fromatted_publish_date: blog.publish_date ? new Date(blog.publish_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) : 'Recent'
        }));
        console.log(`✅ Found ${blogs.length} blogs`);
      } else {
        console.warn('⚠️ Blogs API returned success but no data');
      }
    } else {
      console.error('❌ Blogs API failed with status:', blogsResponse.status);
      const errorText = await blogsResponse.text();
      console.error('Error response:', errorText);
    }

    // Merge archive events and blogs into the main data
    const finalData = {
      ...result.data,
      archiveEvents: archiveEvents,
      blogs: blogs
    };

    console.log('🎉 Final data prepared with', archiveEvents.length, 'archive events and', blogs.length, 'blogs');

    return finalData;
  } catch (error) {
    console.error('💥 Error fetching events page data:', error);
    return null;
  }
}

export default async function EventsPage() {
  const data = await getEventsPageData();

  // Handle "latest single event" request
  let heroEvent = null;

  try {
    // We prioritize upcomingEvents from the main data response to find the slug
    if (data?.upcomingEvents && data.upcomingEvents.length > 0) {
      const latest = data.upcomingEvents[0];

      // Fetch the most detailed info to get the "explore" object with its unique image_url
      const detailResponse = await fetch(`${API_BASE_URL}/EventManagement/Website/events/${latest.slug}?_t=${Date.now()}`, {
        cache: 'no-store'
      });

      if (detailResponse.ok) {
        const detailResult = await detailResponse.json();
        if (detailResult.success && detailResult.data) {
          const detailEvent = detailResult.data.event;
          // Robust check for the explore object location
          const exploreData = detailEvent?.explore || detailResult.data.eventExplore;

          heroEvent = {
            id: detailEvent?.id || latest.id,
            title: detailEvent?.banner_subtitle || detailEvent?.title || latest.title,
            text: detailEvent?.banner_title || detailEvent?.title || latest.banner_title || latest.title,
            event_date: detailEvent?.formatted_date || detailEvent?.start_date || latest.formatted_date,
            end_date: detailEvent?.end_date || latest.end_date,
            location: detailEvent?.location || "New Delhi, India",
            button_text: "Read More",
            button_url: `/events/${detailEvent?.slug || latest.slug}`,
            image: detailEvent?.image || latest.image,
            image_url: exploreData?.image_url || detailEvent?.image_url || latest.image_url,
            explore: exploreData
          };
        }
      }
    }
  } catch (err) {
    console.error("Critical error fetching hero event extreme details:", err);
  }

  // Fallback to slider only if we couldn't resolve a valid upcoming hero event
  if (!heroEvent && data?.sliders && data.sliders.length > 0) {
    heroEvent = data.sliders[0];
  }

  // If we still have no event, heroEvent remains null and component returns null

  return (
    <main>
      <EventsHero event={heroEvent} />
      {/* <UpcomingEvents events={data?.upcomingEvents || []} /> */}
      <EventsSection />
      <DownloadCertificate />
      <JourneyStats statistics={data?.statistics || []} />
      <ArchiveProgram archiveEvents={data?.archiveEvents || []} />
      <ExpertTeam organizers={data?.organizers || []} />
      <Participatory partners={data?.partners || []} testimonials={data?.testimonials || []} />
      <ForensicInsightsSection blogs={data?.blogs || []} />
    </main>
  );
}
