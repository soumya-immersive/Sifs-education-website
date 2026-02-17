"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CheckCircle2, ChevronLeft, ShieldCheck, User, Mail, Phone, MapPin, School, Calendar, Globe, Wand2 } from "lucide-react";
import Link from 'next/link';
import DatePicker from "@/components/ui/DatePicker";
import { API_BASE_URL } from "@/lib/config";

interface Country {
    id: number;
    sortname: string;
    name: string;
    phonecode: number;
}

const InputField = ({ label, name, type = "text", placeholder, icon: Icon, required = false, value, onChange }: any) => (
    <div className="relative group">
        <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1">{label} {required && <span className="text-red-500">*</span>}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {Icon && <Icon className="h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />}
            </div>
            <input
                type={type}
                name={name}
                required={required}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white placeholder-gray-400 text-gray-800"
                value={value}
                onChange={onChange}
            />
        </div>
    </div>
);

export default function RegistrationForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Extract query parameters
    const internshipTitle = searchParams.get("title") || "";
    const internshipId = searchParams.get("id") || "";
    const internshipSlug = searchParams.get("slug") || "";
    const price = searchParams.get("price") || "Calculated at Checkout";
    const levelParam = searchParams.get("level") || "1";

    const [formData, setFormData] = useState({
        name: "",
        contactNumber: "",
        email: "",
        dob: "",
        address: "",
        city: "",
        postalCode: "",
        country: "India",
        qualification: "",
        institution: "",
        gender: "",
        agreeToTerms: false,
    });

    const [couponCode, setCouponCode] = useState("");
    const [countries, setCountries] = useState<Country[]>([]);
    const [isLoadingCountries, setIsLoadingCountries] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [isSuccess, setIsSuccess] = useState(false); // Unused if we redirect

    const [maxDate, setMaxDate] = useState("");

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        setMaxDate(`${year}-${month}-${day}`);
    }, []);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`);
                if (response.ok) {
                    const result = await response.json();

                    if (result.countries && Array.isArray(result.countries)) {
                        setCountries(result.countries);
                    } else if (result.data && result.data.countries && Array.isArray(result.data.countries)) {
                        setCountries(result.data.countries);
                    } else if (result.success && Array.isArray(result.data)) {
                        setCountries(result.data);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch countries:", error);
            } finally {
                setIsLoadingCountries(false);
            }
        };

        fetchCountries();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!validateEmail(formData.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        setIsSubmitting(true);

        // Generate slug from title if not provided
        const finalSlug = internshipSlug || internshipTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

        const payload = {
            training_id: internshipId,
            training_slug: finalSlug, // Use actual slug from URL params or generate from title
            level: `Level-${levelParam}`, // Dynamic Level
            name: formData.name,
            phone_number: formData.contactNumber,
            email: formData.email,
            dob: formData.dob,
            city: formData.city,
            address: formData.address,
            post_code: formData.postalCode,
            country: formData.country,
            designation: "Student", // Defaulting to Student
            college_name: formData.institution,
            gender: formData.gender,
            term: formData.agreeToTerms ? "1" : "0"
        };

        console.log("Registration Payload:", payload); // Debug log

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/EducationAndInternship/Website/training/register-for-training-process`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            console.log("API Response:", result); // Debug log

            if (response.ok && result.success) {
                console.log("Registration Success:", result);

                // Handle response to get registration number - Updated to match API response deeply
                const registrationNo = result.registration_number ||
                    result.registration_no ||
                    (result.data && result.data.registration && result.data.registration.registration_number) ||
                    (result.data && result.data.registration_number) ||
                    (result.data && result.data.registration_no);

                if (registrationNo) {
                    // Redirect to payment page with training type
                    router.push(`/payment?registration_no=${registrationNo}&type=training`);
                } else {
                    console.warn("No registration number found in response:", result);
                    alert("Registration successful but no ID returned. Please contact support.");
                }
            } else {
                // Show API error message if available
                const errorMessage = result.message || response.statusText || "Registration failed";
                console.error("Registration failed:", errorMessage, result);
                alert(`Registration failed: ${errorMessage}. Please check the details and try again.`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const registrationType = searchParams.get("type") === "training" ? "Training" : "Internship";

    const [couponMessage, setCouponMessage] = useState({ type: '', text: '' });
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
    const [appliedCouponData, setAppliedCouponData] = useState<any>(null);
    const [finalPrice, setFinalPrice] = useState<number | null>(null);

    // Helper to get Roman numeral for level
    const getLevelDisplay = (level: string) => {
        if (level === '1') return 'Level-I';
        if (level === '2') return 'Level-II';
        if (level === '3') return 'Level-III';
        return `Level-${level}`;
    };

    const handleApplyCoupon = async () => {
        if (!couponCode) {
            setCouponMessage({ type: 'error', text: 'Please enter a coupon code' });
            return;
        }
        setIsApplyingCoupon(true);
        setCouponMessage({ type: '', text: '' });

        const type = registrationType === "Training" ? "training" : "internship"; // assuming internship needs similar handling, or verify API expectations for 'internship'. 
        // User prompt usually said 'course' or 'training'.
        // If it is 'internship', verify what 'course_type' should be.
        // Based on previous issues, 'training' covers internships usually in this system (TrainingPaymentController). 
        // But for safety, I will stick to what the form implies: 'course_type' -> 'training' for Training/Internship if API supports it.
        // Actually, let's use lowercase of registrationType. 
        // User example was "course_type": "course".
        // If this is training or internship...
        const apiType = registrationType === "Training" ? "training" : "internship";
        // Wait, does 'internship' exist as a type?  Usually it's 'training' or 'course'. 
        // Let's assume 'course' | 'training' are the main ones. If it's internship, it's likely 'training' in the backend based on other controllers (TrainingPaymentController handles internships).
        // Let's try sending 'training' if likely. Or just lowercase.

        try {
            const payload = {
                coupon_code: couponCode,
                course_type: "training", // Most likely 'training' covers both training and internship in this system based on file names.
                course_type_id: internshipId,
                level: getLevelDisplay(levelParam) // Ensure it sends "Level-I", etc.
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/EducationAndInternship/Website/front/apply-coupon`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.success) {
                setAppliedCouponData(result.data);
                setCouponMessage({ type: 'success', text: 'Coupon applied successfully!' });

                const cleanPrice = parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
                const discount = parseFloat(result.data.discounted_amt) || 0;
                setFinalPrice(Math.max(0, cleanPrice - discount));
            } else {
                setCouponMessage({ type: 'error', text: result.msg || 'Invalid coupon code' });
                setAppliedCouponData(null);
                setFinalPrice(null);
            }
        } catch (error) {
            console.error(error);
            setCouponMessage({ type: 'error', text: 'Error applying coupon' });
        } finally {
            setIsApplyingCoupon(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">

            {/* Back Button */}
            <button onClick={() => router.back()} className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors mb-6 font-medium">
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back to {registrationType} Details
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Left Column - Form */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold mb-2">{registrationType} Application</h1>
                            <p className="text-blue-100">Fill in your details to apply for the {registrationType.toLowerCase()}.</p>
                        </div>
                        {/* Decorative Pattern */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-900/20 rounded-full blur-3xl" />
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-10">

                        {/* Coupon Code Section */}
                        <div className="flex flex-col gap-2">
                            <div className="flex shadow-sm rounded-md overflow-hidden h-12">
                                <div className="bg-[#FFC107] w-12 flex items-center justify-center shrink-0">
                                    <Wand2 className="text-white w-6 h-6" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Coupon Code"
                                    className="flex-1 border-y border-gray-300 px-4 focus:outline-none text-gray-700 bg-white placeholder-gray-500/70"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    disabled={!!appliedCouponData}
                                />
                                <button
                                    type="button"
                                    onClick={handleApplyCoupon}
                                    disabled={isApplyingCoupon || !!appliedCouponData}
                                    className={`
                                        bg-[#28A745] hover:bg-green-600 text-white font-bold px-8 transition-colors text-sm tracking-wide
                                        ${(isApplyingCoupon || !!appliedCouponData) ? 'opacity-70 cursor-not-allowed' : ''}
                                    `}
                                >
                                    {isApplyingCoupon ? '...' : appliedCouponData ? 'APPLIED' : 'APPLY'}
                                </button>
                            </div>
                            {couponMessage.text && (
                                <p className={`text-sm ${couponMessage.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
                                    {couponMessage.text}
                                </p>
                            )}
                        </div>

                        {/* Personal Info */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                    <User className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Full Name" name="name" placeholder="John Doe" icon={User} required value={formData.name} onChange={handleChange} />
                                <DatePicker
                                    label="Date of Birth"
                                    value={formData.dob}
                                    onChange={(date) => setFormData(prev => ({ ...prev, dob: date }))}
                                    maxDate={maxDate}
                                    required
                                />

                                {/* Gender Selection */}
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1">Gender <span className="text-red-500">*</span></label>
                                    <div className="flex gap-4">
                                        {['Male', 'Female', 'Others'].map((g) => (
                                            <label key={g} className={`
                                        flex-1 border rounded-xl px-4 py-3 flex items-center justify-center gap-2 cursor-pointer transition-all
                                        ${formData.gender === g
                                                    ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                                                    : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                                                }
                                    `}>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value={g}
                                                    onChange={handleChange}
                                                    className="hidden"
                                                />
                                                <span className="font-medium">{g}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* Contact Info */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Contact Details</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Email Address" name="email" type="email" placeholder="john@example.com" icon={Mail} required value={formData.email} onChange={handleChange} />
                                <InputField label="Phone Number" name="contactNumber" type="tel" placeholder="+91 98765 43210" icon={Phone} required value={formData.contactNumber} onChange={handleChange} />
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* Mailing Address */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Mailing Address</h3>
                            </div>
                            <div className="space-y-6">
                                <InputField label="Full Address" name="address" placeholder="123 Street Name, Apt 4B" icon={MapPin} required value={formData.address} onChange={handleChange} />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <InputField label="City" name="city" placeholder="New Delhi" required value={formData.city} onChange={handleChange} />
                                    <InputField label="Postal Code" name="postalCode" placeholder="110001" required value={formData.postalCode} onChange={handleChange} />

                                    {/* Country Dropdown */}
                                    <div className="relative group">
                                        <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1">Country <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Globe className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                            </div>
                                            <select
                                                name="country"
                                                required
                                                className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white text-gray-800 appearance-none"
                                                value={formData.country}
                                                onChange={handleChange}
                                                disabled={isLoadingCountries}
                                            >
                                                {isLoadingCountries ? (
                                                    <option>Loading countries...</option>
                                                ) : (
                                                    <>
                                                        <option value="" disabled>Select Country</option>
                                                        {countries.map((country) => (
                                                            <option key={country.id} value={country.name}>{country.name}</option>
                                                        ))}
                                                    </>
                                                )}
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* Academic Info */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                    <School className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Academic Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Highest Qualification" name="qualification" placeholder="B.Sc Forensic Science" icon={School} value={formData.qualification} onChange={handleChange} />
                                <InputField label="Institution / University" name="institution" placeholder="XYZ University" icon={School} value={formData.institution} onChange={handleChange} />
                            </div>
                        </section>

                        {/* Terms Agreement */}
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <label className="flex items-start gap-4 cursor-pointer">
                                <div className="relative flex items-center mt-1">
                                    <input
                                        type="checkbox"
                                        name="agreeToTerms"
                                        required
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        className="peer appearance-none w-6 h-6 border-2 border-gray-300 rounded-md checked:bg-blue-600 checked:border-blue-600 transition-all"
                                    />
                                    <CheckCircle2 className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 left-1 pointer-events-none transition-opacity" />
                                </div>
                                <div className="text-sm text-gray-600 leading-relaxed">
                                    <span className="font-semibold text-gray-900 block mb-1">I agree to the Terms & Conditions</span>
                                    By checking this box, I confirm that the information provided is accurate and I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link> of SIFS INDIA.
                                </div>
                            </label>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting || !formData.agreeToTerms}
                                className={`
                            w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform flex items-center justify-center gap-3
                            ${isSubmitting || !formData.agreeToTerms
                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                                        : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:-translate-y-1 hover:shadow-blue-500/30"
                                    }
                        `}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing Application...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck className="w-5 h-5" />
                                        Complete Secure Registration
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>

                {/* Right Column - Order Summary */}
                <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-32">

                    {/* Internship Summary Card */}
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gray-900 p-6 text-white">
                            <h3 className="text-lg font-bold mb-1">Application Summary</h3>
                            <p className="text-gray-400 text-sm">Review your selected {registrationType.toLowerCase()}</p>
                        </div>
                        <div className="p-6">
                            <div className="mb-6">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Internship / Training</p>
                                <p className="font-bold text-gray-900 text-lg leading-tight">{internshipTitle || "No Selection"}</p>
                            </div>

                            <div className="flex items-center justify-between py-4 border-t border-gray-100">
                                <span className="text-gray-600">Duration</span>
                                <span className="font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm">4-6 Weeks</span>
                            </div>

                            <div className="flex items-center justify-between py-4 border-t border-gray-100">
                                <span className="text-gray-600">Mode</span>
                                <span className="font-medium text-gray-900">Online / Offline</span>
                            </div>

                            <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-200">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-end justify-between">
                                        <span className="font-bold text-gray-700">Fee</span>
                                        <span className={`text-xl font-bold text-blue-600 ${appliedCouponData ? 'line-through text-gray-400 text-base' : ''}`}>
                                            {price}
                                        </span>
                                    </div>

                                    {appliedCouponData && (
                                        <>
                                            <div className="flex items-center justify-between text-green-600">
                                                <span className="font-medium text-sm">Coupon Discount</span>
                                                <span className="font-bold">- ₹{appliedCouponData.discounted_amt}</span>
                                            </div>
                                            <div className="flex items-end justify-between pt-2 border-t border-gray-100">
                                                <span className="font-bold text-gray-900">Total Payable</span>
                                                <span className="text-2xl font-extrabold text-blue-600">
                                                    {finalPrice ? `₹${finalPrice}` : price}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t border-gray-100">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <ShieldCheck className="w-3 h-3" />
                                <span>Secure SSL Encryption</span>
                            </div>
                            100% Secure Data Transmission
                        </div>
                    </div>

                    {/* Help Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
                        <h4 className="font-bold text-blue-900 mb-2">Need Help?</h4>
                        <p className="text-sm text-blue-700 mb-4 leading-relaxed">
                            For any queries regarding the internship or application process, enable us to guide you.
                        </p>
                        <a href="tel:011-47074263" className="flex items-center gap-3 text-blue-800 font-semibold bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <Phone className="w-4 h-4" />
                            </div>
                            <span>011-47074263</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
