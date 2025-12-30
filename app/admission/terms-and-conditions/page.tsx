"use client";

import Image from "next/image";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#F0F5F9] pb-20 mb-12">
      {/* Hero Section with Reference Image */}
      <div className="relative h-[400px] w-full">
        <Image
          src="/terms-hero.png" // Replace with your actual path
          alt="Terms and Conditions Banner"
          fill
          className="object-cover brightness-90"
          priority
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">
            Terms & Conditions
          </h1>
        </div>
      </div>

      {/* Content Card */}
      <div className="max-w-6xl mx-auto -mt-16 px-4 relative z-10">
        <div className="bg-white shadow-2xl rounded-sm p-8 md:p-16 text-gray-700">
          
          <div className="space-y-10 text-[13px] md:text-[14px] leading-relaxed">
            
            {/* Introductory Text */}
            <section className="space-y-4">
              <p>
                SIFS India reserves the right to change prices, to cancel, alter or update courses to amend timetables at any time prior to enrollment, and to make additions or amendments to these terms and conditions without notifying you.
              </p>
              <p>
                Students are requested to take a few moments to read the following terms and conditions prior to enrolling in any course via this website. These terms and conditions govern the use of this website and the purchase of any course from it.
              </p>
              <p>
                If you have any questions or wish to clarify the meaning of any of these terms and conditions, please contact us at <span className="text-[#0056B3] font-medium">contact@sifs.in</span>.
              </p>
            </section>

            {/* Statutes, Regulations, and Policies */}
            <section>
              <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">Institute Statutes, Regulations, and Policies</h2>
              <p>
                By paying your fees you agree to comply with the SIFS INDIA Statutes and Regulations and Policies as revised periodically with the Statements and Codes of Policy, Practice, and Procedure which are made under them. These include the Institute&apos;s Code of Discipline, and other regulations concerning your studies, conduct, and behaviour including regulations relating to pestering, the use of IT facilities, health and safety concerns, and legislative requirements such as data protection.
              </p>
              <p className="mt-4 italic">
                Students may be suspended from the course if the Institute found that the individual is in breach of any of these rules including the Code of Discipline.
              </p>
            </section>

            {/* Fees and Payment */}
            <section>
              <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">Fees and Payment</h2>
              <p>
                Student must ensure that the Institute&apos;s fees for the course and all other charges related to the course are paid by the deadline noticed. SIFS India will not be responsible for any non-payment even in the case of payment made by a third party. SIFS INDIA reserves the right to refuse your admission to the specific course if you have not paid all compulsory fees and other charges before the course commences.
              </p>
            </section>

            {/* Cancellations and Refunds - Within 7 days */}
            <section>
              <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">Cancellations and Refunds – Within 7 days</h2>
              <p>
                Student can cancel their admission at any time within 7 days of its commencement and thereby will receive a full refund of any payment made by them, after the deduction of Governmental taxes. To cancel within 7 days please inform us in writing, either by email – <span className="text-[#0056B3]">admission@sifs.in</span> or in writing to:
              </p>
            </section>

            {/* Cancellations and Refunds – After 7 days */}
            <section>
              <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">Cancellations and Refunds – After 7 days</h2>
              <p>
                If any student cancels his/her course at any time after expiry of the 7 days period, he will not be <span className="font-bold underline">entitled</span> to a refund, except in exceptional circumstances at the discretion of the SIFS INDIA. If a refund is made, an administration fee may be charged. Course fees already paid can be transferred to the new course by the same student and any outstanding balance must be paid in full before the confirmation of the new course.
              </p>
            </section>

            {/* Cancellation of an Online Course */}
            <section>
              <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">Cancellation of an Online Course</h2>
              <p>
                Once you have enrolled yourself in an e-learning course or program, the fee is non-refundable and non-transferrable. If you cancel any online course or program student will not be entitled to any refund, nor will be able to transfer his/her place to another person.
              </p>
            </section>

            {/* Cancellation and Refund in Training Program */}
            <section>
              <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">Cancellation and Refund in Training Program</h2>
              <p>
                If any student cancels his/her admission or enrollment before 7 days he/she will be <span className="font-bold underline">entitled</span> to a full refund.
              </p>
              <p className="mt-2">
                Failing to cancel the enrollment/admission within 7 days will amount to no refund at all, until and unless it is under the exceptional condition such as a medical or family emergency. And if a refund is made, the administration fee may be charged.
              </p>
            </section>

            {/* Cancellation by Us */}
            <section className="bg-gray-50 p-8 rounded-sm border-l-4 border-[#0056B3]">
              <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">Cancellation by Us</h2>
              <p className="mb-4 text-sm font-semibold text-gray-500 italic">
                SIFS India will be entitled to terminate the terms and conditions and cease to provide the student with any admission with immediate effect in the event if they:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-gray-600">
                <li>Fail to pay required fees.</li>
                <li>Act in an aggressive, bullying, offensive, threatening, or harassing manner towards any employee/ student/ teacher or lecturer of SIFS India.</li>
                <li>Cheat or plagiarise any work which the student is required to prepare or submit in connection with SIFS India or during any examination taken in connection with the courses offered.</li>
                <li>Steal or act in a fraudulent or deceitful manner towards SIFS India or employees or any other students who may be on our premises.</li>
                <li>Intentionally or recklessly damage the property or the property of employees or other students attending SIFS India premises.</li>
                <li>Are intoxicated under alcohol or illegal drugs while on our premises.</li>
                <li>Commit any criminal offence on our premises or where the victim is our employee or student.</li>
                <li>Breach any of these terms and conditions.</li>
              </ul>
            </section>

            {/* Visual and/or Audio Recordings */}
            <section>
              <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">Visual and/or Audio Recordings</h2>
              <p>
                SIFS India may make visual and/or audio recordings of students during their course period for promotional, management or educational purposes. If you do not consent to this you must notify the institute in writing before commencement of the course.
              </p>
            </section>

            {/* For More Information */}
            <section>
              <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">For More Information</h2>
              <p>
                SIFS India works for the betterment of the students and always look forward to improving its programs. Therefore, we welcome feedback. If you wish to provide feedback or file a complaint regarding SIFS India online program, please email at <span className="text-[#0056B3]">contact@sifs.in</span>. Grievances are taken very seriously and will be addressed in a timely and thoughtful manner.
              </p>
              <p className="mt-4">
                If you wish to change or update the data we hold about you, please e-mail at <span className="text-[#0056B3] font-medium">contact@sifs.in</span>.
              </p>
            </section>

            {/* Footer Details */}
            <section className="pt-10 border-t border-gray-100 grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className="font-bold text-black uppercase tracking-wider">Head Office Address</h3>
                <address className="not-italic text-sm text-gray-500 leading-relaxed">
                  Sherlock Institute of Forensic Science, India,<br />
                  A-14, Mahendru Enclave,<br />
                  Near Model Town, Delhi-110033
                </address>
              </div>
              <div className="flex items-end md:justify-end italic text-xs text-gray-400">
                &quot;Please write the name of your course in the subject line of your email or on the envelope&quot;.
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}