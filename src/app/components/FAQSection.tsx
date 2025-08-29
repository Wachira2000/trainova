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
      category: 'About Trainova',
      items: [
        {
          question: 'What is Trainova?',
          answer: `Trainova is where your specialized knowledge meets the frontier of AI. We connect experts like you to architect the next generation of Generative AI through diverse projects, whether it's generating vital training data from your field or scrutinizing the sophisticated performance of these advanced models.`
        }
      ]
    },
    {
      category: 'Ready to Start?',
      items: [
        {
          question: 'What should I expect during the onboarding period?',
          answer: `Please note: All domains require resume submission, a screening exam, and passing interviews. During onboarding, successful candidates will join a contributor Squad led by an experienced lead.`
        },
        {
          question: 'Will I get paid for onboarding?',
          answer: 'Yes, compensation varies by domain upon successful completion.'
        },
        {
          question: 'How long does onboarding take?',
          answer: 'Approximately 2+ hours for modules and assessment, with <72 hour feedback turnaround.'
        }
      ]
    },
  {
  category: 'Qualifications',
  items: [
    {
      question: 'What qualifications are needed?',
      answer: (
        <>
          Applicants are required to hold a{' '}
          <a 
            href="https://www.udemy.com/certificate-link"  // Replace with actual URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline"
          >
            Certificate in AI Data Trainer from Udemy
          </a>{' '}
          and possess a minimum academic standing of junior or senior undergraduate. 
          Strong proficiency in English and effective communication skills are mandatory. 
          Preference will be given to appplicants who meet these requirements.
        </>
      )
    }]},
    {
      category: 'Pay',
      items: [
        {
          question: 'How much will I be paid?',
          answer: 'Competitive rates based on domain and qualifications.'
        },
        {
          question: 'Payment methods?',
          answer: 'Weekly payments via Wise, PayPal or AirTM.'
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
    <section className="py-20 bg-background border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">FAQs</h2>

        <div className="space-y-6">
          {faqs.map((section, sectionIndex) => (
            <div key={section.category} className="border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => toggleFAQ(section.category, sectionIndex)}
                className="w-full flex justify-between items-center py-6 text-left cursor-pointer"
              >
                <span className="text-xl font-semibold text-foreground">
                  0{sectionIndex + 1} — {section.category}
                </span>
                {visibleCategory === section.category ? (
                  <FiChevronUp className="text-gray-500 dark:text-gray-400 text-xl" />
                ) : (
                  <FiChevronDown className="text-gray-500 dark:text-gray-400 text-xl" />
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
                    <div key={item.question} className="ml-6 border-l-2 border-gray-400 dark:border-gray-600 pl-4">
                      <h3 className="text-lg font-medium text-foreground">{item.question}</h3>
                      <p className="mt-2 text-gray-500 dark:text-zinc-300">{item.answer}</p>
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
            className="inline-flex items-center text-foreground hover:underline transition-colors"
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