'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiChevronDown, FiChevronUp, FiMail, FiMessageSquare } from 'react-icons/fi';
import Link from 'next/link';

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
              <span>Applicants are required to hold a- </span>
              <a 
                href="https://www.udemy.com/certificate-link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline"
              >
              certificate in AI Data Trainer from Udemy
              </a>
              <span>.</span>
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
    category.questions.some(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
  ));

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
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <FiSearch className="text-zinc-400" />
          </div>
          <input
            type="text"
            placeholder="Search...."
            className="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-lg text-zinc-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Featured Questions */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-7xl mx-auto mb-20 grid md:grid-cols-3 gap-6"
      >
        {['How are payments processed?', 'Can I work internationally?', 'What AI models do we train?'].map((q, i) => (
          <div key={i} className="p-6 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-purple-400 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                {i === 0 ? '💸' : i === 1 ? '🌍' : '🧠'}
              </div>
              <h3 className="text-lg font-semibold text-white">{q}</h3>
            </div>
            <p className="text-zinc-400 text-sm">
              {i === 0 ? 'Weekly payments via 3 methods with real-time tracking' :
               i === 1 ? 'Work from anywhere - 85% of experts work across timezones' :
               'Specializing in LLMs, diffusion models, and multi-modal architectures'}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Main FAQ Content */}
      <div className="max-w-7xl mx-auto space-y-12">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700"
          >
            <button
              onClick={() => setActiveCategory(activeCategory === category.title ? null : category.title)}
              className="w-full p-6 flex justify-between items-center text-left cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-2xl font-bold text-purple-400">{category.title}</h2>
              </div>
              {activeCategory === category.title ? (
                <FiChevronUp className="text-xl text-zinc-400" />
              ) : (
                <FiChevronDown className="text-xl text-zinc-400" />
              )}
            </button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: activeCategory === category.title ? 1 : 0 }}
              className={`overflow-hidden ${activeCategory === category.title ? 'visible' : 'hidden'}`}
            >
              <div className="p-6 pt-0 space-y-8">
                {category.questions.map((q, qIndex) => (
                  <div key={qIndex} className="border-t border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">{q.question}</h3>
                    <div className="text-zinc-300 space-y-4">
                      <p>{q.answer}</p>
                      {q.list && (
                        <ul className="space-y-2 ml-4">
                          {q.list.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-purple-400 mr-2">▸</span>
                              {item}
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
        ))}
      </div>

      {/* Support CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-7xl mx-auto mt-20 text-center"
      >
        <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-8 rounded-2xl">
          <div className="flex flex-col items-center gap-6">
            <FiMessageSquare className="text-4xl text-purple-400" />
            <h2 className="text-3xl font-bold text-white">Still Have Questions?</h2>
            <p className="text-zinc-300 max-w-xl mx-auto">
              Our expert support team is available 24/7 to assist you
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:onboarding@cognitoai.io"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-purple-500 transition-colors"
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