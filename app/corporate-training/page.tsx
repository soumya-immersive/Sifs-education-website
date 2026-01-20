import TrainingProgramPage from "../training/[program]/page";

export default function CorporateTrainingPage() {
    return <TrainingProgramPage params={Promise.resolve({ program: "corporate-training" })} />;
}
