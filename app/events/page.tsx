"use client";

import { Toaster } from "react-hot-toast";
import { EVENTS_PAGE_INITIAL_DATA } from "../../lib/data/events-page-data";

import EventsHero from "../../components/events/EventsHero";
import UpcomingEvents from "../../components/events/UpcomingEvents";
import JourneyStats from "../../components/events/JourneyStats";
import ArchiveProgram from "../../components/events/ArchiveProgram";
import ExpertTeam from "../../components/about/ExpertTeam";
import Participatory from "../../components/events/Participatory";
import ForensicInsightsSection from '../../components/events/ForensicInsightsSection';

export default function EventsPage() {
  const data = EVENTS_PAGE_INITIAL_DATA;

  return (
    <main className="relative">
      <Toaster position="top-right" />

      <EventsHero
        data={data.hero}
      />

      <UpcomingEvents
        events={data.events}
        showAllButtonLabel={data.showAllButtonLabel}
      />

      <JourneyStats
        data={data.stats}
      />

      <ArchiveProgram
        data={data.archive}
      />

      <ExpertTeam
        data={data.team}
      />

      <Participatory
        data={data.participatory}
      />

      <ForensicInsightsSection
        data={data.insights}
      />
    </main>
  );
}
