import ProgramPage from "../courses/[program]/page";

export default function ShortTermCoursesRootPage() {
    return <ProgramPage params={Promise.resolve({ program: "short-term-courses" })} />;
}
