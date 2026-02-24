import { Suspense } from "react";
import RegistrationForm from "../../components/internship/RegistrationForm";

export default function InternshipRegistrationPage() {
    return (
        <div className="min-h-screen bg-[#F8F9FB] pb-24">
            <Suspense fallback={
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                    <p className="text-gray-500 font-medium">Loading registration form...</p>
                </div>
            }>
                <RegistrationForm />
            </Suspense>

            {/* <div className="text-center text-gray-400 text-sm mt-12">
                &copy; {new Date().getFullYear()} SIFS INDIA. All rights reserved.
            </div> */}
        </div>
    );
}
