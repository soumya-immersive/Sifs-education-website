"use client";

import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, User, Mail, Phone, BookOpen, Calendar, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface RegistrationData {
    registration: {
        id: number;
        registration_number: string;
        name: string;
        email: string;
        phone_number: string;
        dob: string;
        city: string;
        address: string;
        country: string;
        designation: string;
        college_name: string;
        gender: string;
        [key: string]: any;
    };
    courseDetails: {
        title: string;
        sub_title: string;
        duration: string;
        level: string;
        [key: string]: any;
    };
    redirect: {
        session_data: {
            course_registration_id: number;
            registration_no: string;
        };
    };
}

interface DocumentField {
    id: string;
    label: string;
    required: boolean;
    acceptedFormats: string[];
}

export default function ShowUploadDocumentPage() {
    const router = useRouter();
    const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [additionalNotes, setAdditionalNotes] = useState("");

    // Document upload states - matching API structure
    const [documents, setDocuments] = useState<{ [key: string]: File | null }>({
        nda: null,
        nda2: null,
        nda3: null,
        nda4: null,
        nda5: null,
        nda6: null,
    });

    const documentFields: DocumentField[] = [
        { id: "nda", label: "Document 1", required: true, acceptedFormats: [".doc", ".docx", ".pdf", ".rtf", ".txt", ".zip", ".rar"] },
        { id: "nda2", label: "Document 2", required: true, acceptedFormats: [".doc", ".docx", ".pdf", ".rtf", ".txt", ".zip", ".rar"] },
        { id: "nda3", label: "Document 3", required: true, acceptedFormats: [".doc", ".docx", ".pdf", ".rtf", ".txt", ".zip", ".rar"] },
        { id: "nda4", label: "Document 4", required: false, acceptedFormats: [".doc", ".docx", ".pdf", ".rtf", ".txt", ".zip", ".rar"] },
        { id: "nda5", label: "Document 5", required: false, acceptedFormats: [".doc", ".docx", ".pdf", ".rtf", ".txt", ".zip", ".rar"] },
        { id: "nda6", label: "Document 6", required: false, acceptedFormats: [".doc", ".docx", ".pdf", ".rtf", ".txt", ".zip", ".rar"] },
    ];


    useEffect(() => {
        // Get registration data from sessionStorage
        const registrationString = sessionStorage.getItem("registration_data");

        if (!registrationString) {
            setError("No registration session found. Please search your registration number first.");
            setLoading(false);
            setTimeout(() => {
                router.push("/registration-number-search");
            }, 3000);
            return;
        }

        try {
            const data = JSON.parse(registrationString) as RegistrationData;
            setRegistrationData(data);
            setLoading(false);
        } catch (err) {
            setError("Invalid session data");
            setLoading(false);
        }
    }, [router]);

    const handleFileChange = (docId: string, file: File | null) => {
        setDocuments(prev => ({
            ...prev,
            [docId]: file,
        }));
        setError("");
    };

    const handleUpload = async () => {
        if (!registrationData) {
            setError("Registration data not found");
            return;
        }

        // Validate required documents
        const requiredDocs = documentFields.filter(doc => doc.required);
        const missingDocs = requiredDocs.filter(doc => !documents[doc.id]);

        if (missingDocs.length > 0) {
            setError(`Please upload all required documents: ${missingDocs.map(d => d.label).join(", ")}`);
            return;
        }

        setUploading(true);
        setError("");
        setSuccess("");

        try {
            const formData = new FormData();

            // Add registration details
            formData.append("registration_no", registrationData.redirect.session_data.registration_no);
            formData.append("email", registrationData.registration.email);
            formData.append("fields", additionalNotes || "Document upload for course registration");

            // Add documents with exact field names from API
            if (documents.nda) formData.append("nda", documents.nda);
            if (documents.nda2) formData.append("nda2", documents.nda2);
            if (documents.nda3) formData.append("nda3", documents.nda3);
            if (documents.nda4) formData.append("nda4", documents.nda4);
            if (documents.nda5) formData.append("nda5", documents.nda5);
            if (documents.nda6) formData.append("nda6", documents.nda6);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/EducationAndInternship/Website/registration/upload-document`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const result = await response.json();

            if (result.success) {
                setSuccess("Documents uploaded successfully! Redirecting...");

                // Clear session data
                sessionStorage.removeItem("registration_data");
                sessionStorage.removeItem("registration_session");

                // Redirect to success page or home
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            } else {
                // Handle detailed error messages
                let errorMessage = result.message || "Failed to upload documents. Please try again.";

                // If there are specific validation errors, show them
                if (result.data?.errors) {
                    const errorDetails = Object.values(result.data.errors).join(", ");
                    errorMessage = `${result.message}: ${errorDetails}`;
                } else if (result.errors) {
                    const errorDetails = Object.values(result.errors).join(", ");
                    errorMessage = `${result.message}: ${errorDetails}`;
                }

                setError(errorMessage);
            }

        } catch (err) {
            console.error("Error uploading documents:", err);
            setError("Failed to upload documents. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-[#0056B3] mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Loading your details...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen py-12 px-4">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-white border border-blue-100 text-[#0056B3] px-5 py-2.5 rounded-full mb-6 shadow-sm">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm font-bold uppercase tracking-wider">Document Upload Portal</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Upload Your <span className="text-[#0056B3]">Documents</span>
                    </h1>

                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Please upload all required documents to complete your registration process
                    </p>
                </div>

                {/* Registration Info Card */}
                {registrationData && (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#0056B3] to-[#004494] rounded-xl flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Registration Details</h2>
                                <p className="text-sm text-gray-500">Registration No: {registrationData.registration.registration_number}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex items-start gap-3">
                                <User className="w-5 h-5 text-[#0056B3] mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Full Name</p>
                                    <p className="font-semibold text-gray-900">{registrationData.registration.name}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-[#0056B3] mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Email Address</p>
                                    <p className="font-semibold text-gray-900 break-all">{registrationData.registration.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-[#0056B3] mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                                    <p className="font-semibold text-gray-900">{registrationData.registration.phone_number}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <BookOpen className="w-5 h-5 text-[#0056B3] mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Course</p>
                                    <p className="font-semibold text-gray-900">{registrationData.courseDetails.title}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Calendar className="w-5 h-5 text-[#0056B3] mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                                    <p className="font-semibold text-gray-900">
                                        {new Date(registrationData.registration.dob).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-[#0056B3] mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">City</p>
                                    <p className="font-semibold text-gray-900">{registrationData.registration.city}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-green-700">{success}</p>
                    </div>
                )}

                {/* Document Upload Form */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Upload Documents</h3>

                    <div className="space-y-6">
                        {documentFields.map((field) => (
                            <DocumentUploadField
                                key={field.id}
                                field={field}
                                file={documents[field.id]}
                                onFileChange={(file) => handleFileChange(field.id, file)}
                            />
                        ))}

                        {/* Additional Notes Field */}
                        <div className="border-2 border-gray-200 rounded-xl p-6">
                            <label className="text-base font-semibold text-gray-900 block mb-3">
                                Additional Notes (Optional)
                            </label>
                            <textarea
                                value={additionalNotes}
                                onChange={(e) => setAdditionalNotes(e.target.value)}
                                placeholder="Add any additional information or notes here..."
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0056B3] focus:border-transparent outline-none resize-none"
                            />
                        </div>
                    </div>

                    {/* Upload Button */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
                        <button
                            onClick={() => router.push("/registration-number-search")}
                            disabled={uploading}
                            className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpload}
                            disabled={uploading}
                            className="px-8 py-4 bg-gradient-to-r from-[#0056B3] to-[#004494] text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5" />
                                    Upload Documents
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Help Text */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Need help? <button className="text-[#0056B3] font-semibold underline underline-offset-4">Contact Support</button>
                    </p>
                </div>
            </div>
        </section>
    );
}

// Document Upload Field Component
interface DocumentUploadFieldProps {
    field: DocumentField;
    file: File | null;
    onFileChange: (file: File | null) => void;
}

function DocumentUploadField({ field, file, onFileChange }: DocumentUploadFieldProps) {
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        onFileChange(selectedFile);
    };

    const handleRemove = () => {
        onFileChange(null);
    };

    return (
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-[#0056B3] transition-all">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <label className="text-base font-semibold text-gray-900 flex items-center gap-2">
                        {field.label}
                        {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <p className="text-sm text-gray-500 mt-1">
                        Accepted formats: {field.acceptedFormats.join(", ").toUpperCase()} • Max size: 5MB
                    </p>
                </div>
            </div>

            {file ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0056B3] rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                    </div>
                    <button
                        onClick={handleRemove}
                        className="text-red-500 hover:text-red-700 font-semibold text-sm"
                    >
                        Remove
                    </button>
                </div>
            ) : (
                <label className="cursor-pointer block">
                    <input
                        type="file"
                        accept={field.acceptedFormats.join(",")}
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                    <div className="bg-gray-50 border-2 border-gray-200 border-dashed rounded-lg p-6 text-center hover:bg-blue-50 hover:border-[#0056B3] transition-all">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 font-medium mb-1">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-400">Choose a file from your device</p>
                    </div>
                </label>
            )}
        </div>
    );
}
