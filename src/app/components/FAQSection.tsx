'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleCategory, setVisibleCategory] = useState<string | null>(null);

  const faqs = [
    {
      category: 'Getting Started',
      items: [
        {
          question: 'What does the onboarding process look like?',
          answer: `During onboarding, you'll join a Squad of contributors led by an experienced lead. Most domains require a resume submission and screening exam, with some requiring interviews.`
        },
        {
          question: 'Will I get paid for onboarding?',
          answer: 'Yes, compensation varies by domain upon successful completion.'
        },
        {
          question: 'How long does onboarding take?',
          answer: 'Typically 1-5 hours for modules and assessment, with <48 hour feedback turnaround.'
        }
      ]
    },
    {
      category: 'Qualifications',
      items: [
        {
          question: 'What qualifications are needed?',
          answer: 'Junior/Senior undergraduates (minimum), Graduate students preferred. Requires strong English and communication skills.'
        },
        {
          question: 'What is the selection process?',
          answer: 'Resume evaluation against domain-specific requirements in job descriptions.'
        }
      ]
    },
    {
      category: 'Pay',
      items: [
        {
          question: 'How much will I be paid?',
          answer: 'Competitive rates based on domain and qualifications.'
        },
        {
          question: 'Payment methods?',
          answer: 'Weekly payments via PayPal or AirTM.'
        }
      ]
    },
    {
      category: 'Hours',
      items: [
        {
          question: 'How many hours can I work?',
          answer: 'Flexible: 5-40 hrs/week based on your availability.'
        },
        {
          question: 'Can I work with other jobs?',
          answer: 'Yes, contributors are independent contractors.'
        }
      ]
    }
  ];

  const toggleFAQ = (category: string, index: number) => {
    setVisibleCategory(visibleCategory === category ? null : category);
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-900 border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">FAQs</h2>

        <div className="space-y-6">
          {faqs.map((section, sectionIndex) => (
            <div key={section.category} className="border-b border-gray-700">
              <button
                onClick={() => toggleFAQ(section.category, sectionIndex)}
                className="w-full flex justify-between items-center py-6 text-left"
              >
                <span className="text-xl font-semibold text-purple-400">
                  0{sectionIndex + 1} — {section.category}
                </span>
                {visibleCategory === section.category ? (
                  <FiChevronUp className="text-gray-400 text-xl" />
                ) : (
                  <FiChevronDown className="text-gray-400 text-xl" />
                )}
              </button>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: visibleCategory === section.category ? 1 : 0,
                  height: visibleCategory === section.category ? 'auto' : 0
                }}
                className="overflow-hidden"
              >
                <div className="pb-6 space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={item.question} className="ml-6 border-l-2 border-purple-400/30 pl-4">
                      <h3 className="text-lg font-medium text-white">{item.question}</h3>
                      <p className="mt-2 text-zinc-300">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            See All FAQs
            <FiChevronDown className="ml-2 transform rotate-90" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;