import TrainingProgramPage from "../training/[program]/page";

export default function OnlineTrainingPage() {
    return <TrainingProgramPage params={Promise.resolve({ program: "online-training" })} />;
}
