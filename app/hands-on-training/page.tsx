import TrainingProgramPage from "../training/[program]/page";

// @ts-ignore
export default function HandsOnTrainingPage(props: any) {
    return <TrainingProgramPage params={Promise.resolve({ program: "handson-training" })} searchParams={props.searchParams || Promise.resolve({})} />;
}
