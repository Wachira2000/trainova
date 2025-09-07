'use client';

import { motion } from 'framer-motion';
import { 
  FaBalanceScale,
  FaShieldAlt,
  FaBook,
  FaUserLock,
  FaExclamationTriangle,
  FaHandshake,
  FaRegCopy,
  FaGlobe,
  FaEnvelope
} from 'react-icons/fa';

const TermsOfUse = () => {
  const sections = [
    {
      icon: FaBalanceScale,
      title: "Acceptance of Terms",
      content: "By accessing our AI training platform, you enter into a binding agreement governed by these Terms. We reserve the right to modify these terms at any time, with changes effective immediately upon posting."
    },
    {
      icon: FaUserLock,
      title: "User Responsibilities",
      content: "You agree to maintain the confidentiality of all proprietary information encountered during training sessions. Any attempt to reverse-engineer, decompile, or extract AI model weights will result in immediate termination and legal action."
    },
    {
      icon: FaShieldAlt,
      title: "Data Security",
      content: "While we implement military-grade encryption (AES-256) and conduct regular penetration testing, you acknowledge that no system is impervious to breaches. You're responsible for maintaining the security of your authentication credentials."
    },
    {
      icon: FaExclamationTriangle,
      title: "Prohibited Uses",
      content: "Strictly forbidden activities include: training models for weapons development, creating discriminatory algorithms, generating misinformation campaigns, or any application violating UN human rights charters."
    },
    {
      icon: FaHandshake,
      title: "Intellectual Property",
      content: "All synthetic data generated through our platform remains co-owned between [Your Company] and the trainer. Commercialization rights require separate written agreement. Moral rights remain with creators in perpetuity."
    },
    {
      icon: FaRegCopy,
      title: "Content Licensing",
      content: "By submitting training data, you grant us a non-exclusive, transferable, sub-licensable royalty-free license to use, modify, and distribute derivative works through our AI systems worldwide."
    },
    {
      icon: FaGlobe,
      title: "Jurisdiction",
      content: "Disputes will be settled under Singaporean law through binding arbitration via the Singapore International Arbitration Centre (SIAC). Class action waivers apply to all users."
    }
  ];

  return (
    <div className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Terms of Use
          </h1>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-20 bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <FaBook className="text-cyan-400" />
            Document Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section, index) => (
              <a 
                key={index}
                href={`#section-${index}`}
                className="text-zinc-300 hover:text-cyan-400 transition-colors flex items-center gap-2"
              >
                <span className="text-cyan-400">§{index + 1}</span>
                {section.title}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-20">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              id={`section-${index}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-cyan-400 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-cyan-500/20 rounded-lg">
                  <section.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  §{index + 1} {section.title}
                </h2>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          className="mt-20 text-center"
        >
          <div className="bg-gray-800/30 p-8 rounded-2xl border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <FaEnvelope className="text-cyan-400" />
              Legal Inquiries
            </h2>
            <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
              For GDPR requests, copyright issues, or regulatory compliance questions
            </p>
            <a
              href="mailto:legal@yourcompany.com"
              className="bg-white text-black px-8 py-3 rounded-lg hover:scale-105 transition-transform inline-flex items-center gap-2"
            >
              Contact Legal Team
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfUse;