import EventsHero from "../../components/events/EventsHero";
import UpcomingEvents from "../../components/events/UpcomingEvents";
import JourneyStats from "../../components/events/JourneyStats";
import ArchiveProgram from "../../components/events/ArchiveProgram";
import ExpertTeam from "../../components/common/ExpertTeam";
import Participatory from "../../components/events/Participatory";
import ForensicInsightsSection from '../../components/events/ForensicInsightsSection';

export default function EventsPage() {
  return (
    <main>
      <EventsHero />
      <UpcomingEvents />
      <JourneyStats />
      <ArchiveProgram />
      <ExpertTeam />
      <Participatory />
      <ForensicInsightsSection />
    </main>
  );
}
