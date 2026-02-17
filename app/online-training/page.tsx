import TrainingProgramPage from "../training/[program]/page";

// @ts-ignore
export default function OnlineTrainingPage(props: any) {
    return <TrainingProgramPage params={Promise.resolve({ program: "online-training" })} searchParams={props.searchParams || Promise.resolve({})} />;
}
