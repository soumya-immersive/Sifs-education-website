import TrainingProgramPage from "../training/[program]/page";

// @ts-ignore
export default function CorporateTrainingPage(props: any) {
    return <TrainingProgramPage params={Promise.resolve({ program: "corporate-training" })} searchParams={props.searchParams || Promise.resolve({})} />;
}
