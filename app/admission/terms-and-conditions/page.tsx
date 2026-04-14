"use client";

import Image from "next/image";
import { ADMISSION_PAGE_INITIAL_DATA } from "../../../lib/data/admission-page-data";
import { TermsSection } from "../../../types/admission-page";

export default function TermsAndConditionsPage() {
  const data = ADMISSION_PAGE_INITIAL_DATA;
  const termsData = data.termsAndConditions;

  return (
    <div className="min-h-screen bg-[#F0F5F9] pb-20 mb-12">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={termsData.heroImage}
            alt="Terms and Conditions Banner"
            fill
            className="object-cover brightness-90"
          />
        </div>
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">
            <div dangerouslySetInnerHTML={{ __html: termsData.title }} />
          </h1>
        </div>
      </div>

      {/* Content Card */}
      <div className="max-w-6xl mx-auto -mt-16 px-4 relative z-10">
        <div className="bg-white shadow-2xl rounded-sm p-8 md:p-16 text-gray-700">

          <div className="space-y-10 text-[13px] md:text-[14px] leading-relaxed">

            {/* Dynamic Sections */}
            {termsData.sections.map((section: TermsSection) => (
              <section
                key={section.id}
                className={`relative ${section.type === 'highlight' ? 'bg-gray-50 p-8 rounded-sm border-l-4 border-[#0056B3]' : ''}`}
              >
                {section.title && (
                  <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">
                    <div dangerouslySetInnerHTML={{ __html: section.title }} />
                  </h2>
                )}

                {section.type === 'list' && section.content && (
                  <div className="mb-4 text-sm font-semibold text-gray-500 italic">
                    <div dangerouslySetInnerHTML={{ __html: section.content }} />
                  </div>
                )}

                {section.type === 'list' && section.listItems ? (
                  <ul className="list-disc ml-6 space-y-2 text-gray-600">
                    {section.listItems.map((item, itemIndex) => (
                      <li key={itemIndex} className="relative group">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : section.type !== 'list' && (
                  <div className={section.type === 'highlight' ? 'space-y-4' : ''}>
                    <div dangerouslySetInnerHTML={{ __html: section.content }} />
                  </div>
                )}
              </section>
            ))}

            {/* Footer Details */}
            <section className="pt-10 border-t border-gray-100 grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className="font-bold text-black uppercase tracking-wider">Head Office Address</h3>
                <address className="not-italic text-sm text-gray-500 leading-relaxed">
                  {termsData.address.lines.map((line, index) => (
                    <div key={index}>
                      {line}
                      {index < termsData.address.lines.length - 1 && <br />}
                    </div>
                  ))}
                </address>
              </div>
              <div className="flex items-end md:justify-end italic text-xs text-gray-400">
                <div dangerouslySetInnerHTML={{ __html: termsData.address.note }} />
              </div>
            </section>

          </div>
        </div>
      </div>
    </div >
  );
}