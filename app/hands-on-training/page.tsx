import TrainingProgramPage from "../training/[program]/page";

export default function HandsOnTrainingPage() {
    return <TrainingProgramPage params={Promise.resolve({ program: "handson-training" })} />;
}
