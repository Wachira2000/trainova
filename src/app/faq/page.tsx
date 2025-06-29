'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiChevronDown, FiChevronUp, FiMail, FiMessageSquare } from 'react-icons/fi';
// Link component is not used in the provided snippet for FAQPage directly for this issue,
// but it's good practice to keep imports clean if not used elsewhere in this file.
// import Link from 'next/link'; // Only if used elsewhere in this specific file

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: '🚀',
      questions: [
        {
          question: 'What does the onboarding process look like?',
          answer: 'Our onboarding combines AI-powered learning modules with human mentorship. You\'ll be guided through:',
          list: [
            'Domain-specific orientation (1-2 hours)',
            'Quality assurance training',
            'Practice tasks with feedback',
            'Final competency assessment'
          ]
        },
        {
          question: 'How long until I can start working?',
          answer: 'Most experts begin real tasks within 24 hours of completing onboarding. Complex domains may require additional screening (2-3 business days).'
        }
      ]
    },
    {
      title: 'Qualifications',
      icon: '🎓',
      questions: [
        {
          question: 'What qualifications do I need to have?',
          answer: 'Candidates should meet:',
          list: [
            <>
              {/* Approach 1: Explicit space between elements (Recommended) */}
              <span>Applicants are required to hold a</span>
              {' '} {/* This will render a space */}
              <a
                href="https://www.udemy.com/certificate-link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
certificate in AI Data Trainer from Udemy {/* Ensure no leading space here */}
              </a>
              <span>.</span>

              {/* Approach 2: Explicit space at the end of the span's text node (Alternative)
              <span>{'Applicants are required to hold a '}</span>
              <a
                href="https://www.udemy.com/certificate-link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline"
              >
certificate in AI Data Trainer from Udemy
              </a>
              <span>.</span>
              */}
            </>,
            'Strong proficiency in English',
            'Possess a minimum academic standing of junior or senior undergraduate',
            'Effective communication skills',
            'Analytical and Critical Thinking',
            'Adaptability and Continuous Learning',
            'Attention to Detail'
          ]
        }
      ]
    },
    {
      title: 'Technical Requirements',
      icon: '💻',
      questions: [
        {
          question: 'What equipment do I need?',
          answer: 'Minimum requirements:',
          list: [
            'Modern computer (4+ core CPU, 8GB+ RAM)',
            'Stable internet connection (10Mbps+)',
            'Chrome/Firefox browser',
            'Microphone for optional team calls'
          ]
        }
      ]
    },
    {
      title: 'Project Workflow',
      icon: '📊',
      questions: [
        {
          question: 'How are tasks assigned?',
          answer: 'Our smart matching system suggests tasks based on:',
          list: [
            'Your expertise domains',
            'Historical performance',
            'Current availability',
            'Project urgency'
          ]
        }
      ]
    },
    {
      title: 'Quality Standards',
      icon: '🎯',
      questions: [
        {
          question: 'How is work quality measured?',
          answer: 'We use multi-layered quality control:',
          list: [
            'Automated consistency checks',
            'Peer review system (expert-to-expert)',
            'AI accuracy validation',
            'Client feedback integration'
          ]
        }
      ]
    },
    {
      title: 'Community & Support',
      icon: '🤝',
      questions: [
        {
          question: 'What support resources are available?',
          answer: '24/7 access to:',
          list: [
            'Expert discussion forums',
            'Live Q&A sessions',
            'Technical documentation',
            'Dedicated squad leaders'
          ]
        }
      ]
    },
    {
      title: 'AI Ethics',
      icon: '⚖️',
      questions: [
        {
          question: 'How do we ensure ethical AI training?',
          answer: 'Our framework includes:',
          list: [
            'Bias detection systems',
            'Diverse expert panels',
            'Transparency protocols',
            'Continuous ethical reviews'
          ]
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) || // Also search category titles
    category.questions.some(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.answer && q.answer.toLowerCase().includes(searchQuery.toLowerCase())) || // Check if answer exists
      (q.list && q.list.some(item => typeof item === 'string' && item.toLowerCase().includes(searchQuery.toLowerCase()))) // Check list items if they are strings
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto text-center mb-20"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Expert Knowledge Hub
        </h1>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> {/* Added pointer-events-none */}
            <FiSearch className="text-zinc-400" />
          </div>
          <input
            type="text"
            placeholder="Search FAQs...." // Changed placeholder text slightly
            className="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-lg text-zinc-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Featured Questions (Assuming this structure is intentional and data is static) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }} // Added viewport for better whileInView trigger
        className="max-w-7xl mx-auto mb-20 grid md:grid-cols-3 gap-6"
      >
        {[{title: 'How are payments processed?', icon: '💸', desc: 'Weekly payments via 3 methods with real-time tracking'},
          {title: 'Can I work internationally?', icon: '🌍', desc: 'Work from anywhere - 85% of experts work across timezones'},
          {title: 'What AI models do we train?', icon: '🧠', desc: 'Specializing in LLMs, diffusion models, and multi-modal architectures'}].map((q, i) => (
          <div key={i} className="p-6 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-cyan-400 transition-colors duration-300"> {/* Added duration */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <span className="text-xl">{q.icon}</span> {/* Made icon slightly bigger for visibility */}
              </div>
              <h3 className="text-lg font-semibold text-white">{q.title}</h3>
            </div>
            <p className="text-zinc-400 text-sm">
              {q.desc}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Main FAQ Content */}
      <div className="max-w-7xl mx-auto space-y-12">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }} // Added viewport
              transition={{ delay: index * 0.05 }} // Slightly faster delay
              className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden" // Added overflow-hidden here
            >
              <button
                onClick={() => setActiveCategory(activeCategory === category.title ? null : category.title)}
                className="w-full p-6 flex justify-between items-center text-left cursor-pointer hover:bg-gray-700/30 transition-colors duration-200" // Added hover effect
                aria-expanded={activeCategory === category.title} // Accessibility
                aria-controls={`category-content-${index}`} // Accessibility
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-cyan-400">{category.title}</h2> {/* Responsive text size */}
                </div>
                {activeCategory === category.title ? (
                  <FiChevronUp className="text-xl text-zinc-400 flex-shrink-0" /> // Added flex-shrink-0
                ) : (
                  <FiChevronDown className="text-xl text-zinc-400 flex-shrink-0" /> // Added flex-shrink-0
                )}
              </button>

              <motion.div
                id={`category-content-${index}`} // Accessibility
                initial={false} // Animate only on change
                animate={{ height: activeCategory === category.title ? 'auto' : 0, opacity: activeCategory === category.title ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                // className already handles visibility with height: 0 and opacity: 0, overflow-hidden on parent helps
              >
                <div className="p-6 pt-0 space-y-8">
                  {category.questions.map((q, qIndex) => (
                    <div key={qIndex} className="border-t border-gray-700 pt-6">
                      <h3 className="text-lg font-semibold text-white mb-4">{q.question}</h3>
                      <div className="text-zinc-300 space-y-4 prose prose-sm prose-invert max-w-none"> {/* Tailwind prose for nice text formatting */}
                        {/* Handle answer if it's a simple string */}
                        {typeof q.answer === 'string' && <p>{q.answer}</p>}
                        {/* Handle answer if it's JSX (though not in this example, but good for future) */}
                        {typeof q.answer !== 'string' && q.answer}

                        {q.list && (
                          <ul className="space-y-2 pl-1"> {/* Adjusted padding for alignment with prose */}
                            {q.list.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-cyan-400 mr-2 mt-1 flex-shrink-0">▸</span> {/* mt-1 for better alignment, flex-shrink-0 */}
                                <span>{item}</span> {/* Wrap item in span for consistent styling if item is JSX */}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10"
          >
            <FiSearch className="text-5xl text-zinc-500 mx-auto mb-4" />
            <p className="text-xl text-zinc-300">No FAQs found matching your search.</p>
            <p className="text-zinc-400">Try a different keyword or browse the categories.</p>
          </motion.div>
        )}
      </div>

      {/* Support CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto mt-20 text-center"
      >
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-8 rounded-2xl border border-cyan-500/30"> {/* Added subtle border */}
          <div className="flex flex-col items-center gap-6">
            <FiMessageSquare className="text-4xl text-cyan-400" />
            <h2 className="text-3xl font-bold text-white">Still Have Questions?</h2>
            <p className="text-zinc-300 max-w-xl mx-auto">
              Our expert support team is available 24/7 to assist you
            </p>
            <div className="flex gap-4 mt-2"> {/* Added mt-2 */}
              <a
                href="mailto:onboarding@cognitoai.io"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-cyan-600/90 transition-colors duration-300 shadow-lg hover:shadow-cyan-500/50" // Added shadow
              >
                <FiMail className="inline-block" /> Email Support
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQPage;