import CoursesHero from "../../components/courses/CoursesHero";
import CoursesFilterBar from "../../components/courses/CoursesFilterBar";
import CoursesGrid from "../../components/courses/CoursesGrid";
import Learning from "../../components/courses/Learning";

export default function CoursesPage() {
  return (
    <main>
      <CoursesHero />
      <CoursesFilterBar />
      <CoursesGrid />
      <Learning />
    </main>
  );
}
