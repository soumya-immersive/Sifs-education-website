import TrainingProgramPage from "../training/[program]/page";

export default function OnsiteTrainingPage() {
    return <TrainingProgramPage params={Promise.resolve({ program: "onsite-training" })} />;
}
