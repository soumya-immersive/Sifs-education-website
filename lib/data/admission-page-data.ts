import { AdmissionPageData } from "../../types/admission-page";

export const ADMISSION_PAGE_INITIAL_DATA: AdmissionPageData = {
  uploadDocuments: {
    badge: {
      icon: "FileCheck",
      text: "Admission Portal 2025"
    },
    title: "Document",
    highlightedTitle: "Verification",
    description: "Please enter your unique registration number provided during your application to securely upload your educational and identity documents.",
    placeholder: "Enter Registration Number (e.g. SIFS/2025/001)",
    buttonText: "VERIFY & PROCEED",
    helpText: "Having trouble?",
    supportLinkText: "Contact Support"
  },
  termsAndConditions: {
    heroImage: "/terms-hero.png",
    title: "Terms & Conditions",
    sections: [
      {
        id: "intro",
        title: "",
        type: "text",
        content: "SIFS India reserves the right to change prices, to cancel, alter or update courses to amend timetables at any time prior to enrollment, and to make additions or amendments to these terms and conditions without notifying you.\n\nStudents are requested to take a few moments to read the following terms and conditions prior to enrolling in any course via this website. These terms and conditions govern the use of this website and the purchase of any course from it.\n\nIf you have any questions or wish to clarify the meaning of any of these terms and conditions, please contact us at contact@sifs.in."
      },
      {
        id: "statutes",
        title: "Institute Statutes, Regulations, and Policies",
        type: "text",
        content: "By paying your fees you agree to comply with the SIFS INDIA Statutes and Regulations and Policies as revised periodically with the Statements and Codes of Policy, Practice, and Procedure which are made under them. These include the Institute's Code of Discipline, and other regulations concerning your studies, conduct, and behaviour including regulations relating to pestering, the use of IT facilities, health and safety concerns, and legislative requirements such as data protection.\n\nStudents may be suspended from the course if the Institute found that the individual is in breach of any of these rules including the Code of Discipline."
      },
      {
        id: "fees",
        title: "Fees and Payment",
        type: "text",
        content: "Student must ensure that the Institute's fees for the course and all other charges related to the course are paid by the deadline noticed. SIFS India will not be responsible for any non-payment even in the case of payment made by a third party. SIFS INDIA reserves the right to refuse your admission to the specific course if you have not paid all compulsory fees and other charges before the course commences."
      },
      {
        id: "refund-7days",
        title: "Cancellations and Refunds – Within 7 days",
        type: "text",
        content: "Student can cancel their admission at any time within 7 days of its commencement and thereby will receive a full refund of any payment made by them, after the deduction of Governmental taxes. To cancel within 7 days please inform us in writing, either by email – admission@sifs.in or in writing to:"
      },
      {
        id: "refund-after7days",
        title: "Cancellations and Refunds – After 7 days",
        type: "text",
        content: "If any student cancels his/her course at any time after expiry of the 7 days period, he will not be entitled to a refund, except in exceptional circumstances at the discretion of the SIFS INDIA. If a refund is made, an administration fee may be charged. Course fees already paid can be transferred to the new course by the same student and any outstanding balance must be paid in full before the confirmation of the new course."
      },
      {
        id: "online-cancellation",
        title: "Cancellation of an Online Course",
        type: "text",
        content: "Once you have enrolled yourself in an e-learning course or program, the fee is non-refundable and non-transferrable. If you cancel any online course or program student will not be entitled to any refund, nor will be able to transfer his/her place to another person."
      },
      {
        id: "training-refund",
        title: "Cancellation and Refund in Training Program",
        type: "text",
        content: "If any student cancels his/her admission or enrollment before 7 days he/she will be entitled to a full refund.\n\nFailing to cancel the enrollment/admission within 7 days will amount to no refund at all, until and unless it is under the exceptional condition such as a medical or family emergency. And if a refund is made, the administration fee may be charged."
      },
      {
        id: "cancellation-by-us",
        title: "Cancellation by Us",
        type: "list",
        content: "SIFS India will be entitled to terminate the terms and conditions and cease to provide the student with any admission with immediate effect in the event if they:",
        listItems: [
          "Fail to pay required fees.",
          "Act in an aggressive, bullying, offensive, threatening, or harassing manner towards any employee/ student/ teacher or lecturer of SIFS India.",
          "Cheat or plagiarise any work which the student is required to prepare or submit in connection with SIFS India or during any examination taken in connection with the courses offered.",
          "Steal or act in a fraudulent or deceitful manner towards SIFS India or employees or any other students who may be on our premises.",
          "Intentionally or recklessly damage the property or the property of employees or other students attending SIFS India premises.",
          "Are intoxicated under alcohol or illegal drugs while on our premises.",
          "Commit any criminal offence on our premises or where the victim is our employee or student.",
          "Breach any of these terms and conditions."
        ]
      },
      {
        id: "recordings",
        title: "Visual and/or Audio Recordings",
        type: "text",
        content: "SIFS India may make visual and/or audio recordings of students during their course period for promotional, management or educational purposes. If you do not consent to this you must notify the institute in writing before commencement of the course."
      },
      {
        id: "more-info",
        title: "For More Information",
        type: "text",
        content: "SIFS India works for the betterment of the students and always look forward to improving its programs. Therefore, we welcome feedback. If you wish to provide feedback or file a complaint regarding SIFS India online program, please email at contact@sifs.in. Grievances are taken very seriously and will be addressed in a timely and thoughtful manner.\n\nIf you wish to change or update the data we hold about you, please e-mail at contact@sifs.in."
      }
    ],
    contactEmail: "contact@sifs.in",
    address: {
      lines: [
        "Sherlock Institute of Forensic Science, India,",
        "A-14, Mahendru Enclave,",
        "Near Model Town, Delhi-110033"
      ],
      note: "Please write the name of your course in the subject line of your email or on the envelope"
    }
  }
};
