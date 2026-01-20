import ProgramPage from "../courses/[program]/page";

export default function ProfessionalForensicCoursesPage() {
    return <ProgramPage params={Promise.resolve({ program: "professional-courses" })} />;
}
