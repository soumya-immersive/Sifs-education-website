import ProgramPage from "../courses/[program]/page";

export default function ClassroomCoursesPage() {
    return <ProgramPage params={Promise.resolve({ program: "classroom-courses" })} />;
}
