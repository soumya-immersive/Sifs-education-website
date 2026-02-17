import TrainingProgramPage from "../training/[program]/page";

// @ts-ignore
export default function OnsiteTrainingPage(props: any) {
    return <TrainingProgramPage params={Promise.resolve({ program: "onsite-training" })} searchParams={props.searchParams || Promise.resolve({})} />;
}
