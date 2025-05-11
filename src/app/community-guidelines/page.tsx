'use client';

import { motion } from 'framer-motion';
import {
  FaHandshake,
  FaShieldAlt,
  FaUserLock,
  FaGlobeAmericas,
  FaCode,
  FaBalanceScale,
  FaEnvelope,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

const CommunityGuidelines = () => {
  const corePrinciples = [
    {
      icon: FaHandshake,
      title: "Integrity First",
      content: "Every task shapes AI's future - execute with precision and authenticity"
    },
    {
      icon: FaUserLock,
      title: "Confidentiality Commitment",
      content: "Protect sensitive data like it's your own intellectual property"
    },
    {
      icon: FaShieldAlt,
      title: "Security First",
      content: "Maintain digital fortress standards across all interactions"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 to-cyan-500 text-transparent bg-clip-text">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Community Covenant
            </h1>
          </div>
          <p className="text-xl text-zinc-300">
            Effective: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Core Principles */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          {corePrinciples.map((principle, index) => (
            <div 
              key={index}
              className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-cyan-400/20 hover:border-purple-400 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-cyan-500/20 rounded-lg">
                  <principle.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{principle.title}</h3>
              </div>
              <p className="text-zinc-300">{principle.content}</p>
            </div>
          ))}
        </motion.div>

        {/* Task Integrity Section */}
        <motion.div
          className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-purple-400/20"
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <FaCode className="text-purple-400" />
            Champion Authentic Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 text-green-400">
              <div className="flex items-center gap-2">
                <FaCheckCircle />
                <h3 className="font-bold">Mandatory Practices</h3>
              </div>
              <ul className="space-y-3 pl-6 text-zinc-300">
                <li>• Solo execution of all cognitive tasks</li>
                <li>• Certification compliance before task initiation</li>
                <li>• Human-only contribution (zero automation)</li>
                <li>• Real-time transparency in communications</li>
              </ul>
            </div>
            <div className="space-y-4 text-red-400">
              <div className="flex items-center gap-2">
                <FaTimesCircle />
                <h3 className="font-bold">Strict Prohibitions</h3>
              </div>
              <ul className="space-y-3 pl-6 text-zinc-300">
                <li>• Credential sharing or account trading</li>
                <li>• Geolocation spoofing (VPN restrictions)</li>
                <li>• Bot-assisted task completion</li>
                <li>• Compensation system exploitation</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Data Sanctity Section */}
        <motion.div
          className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-cyan-400/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <FaBalanceScale className="text-cyan-400" />
            Data Protection Mandate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-300">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Confidentiality Protocol</h3>
              <ul className="space-y-3 list-disc pl-6">
                <li>Zero external storage of project materials</li>
                <li>Secure channel communication only</li>
                <li>Immediate breach reporting requirement</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Security Enforcement</h3>
              <ul className="space-y-3 list-disc pl-6">
                <li>Military-grade encryption standards</li>
                <li>Continuous vulnerability scanning</li>
                <li>Multi-factor authentication mandates</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Compliance Section */}
        <motion.div
          className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-purple-400/20"
          initial={{ x: -50 }}
          whileInView={{ x: 0 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <FaGlobeAmericas className="text-purple-400" />
            Global Participation Framework
          </h2>
          <div className="text-zinc-300 space-y-4">
            <p className="flex items-center gap-2">
              <FaExclamationTriangle className="text-yellow-400" />
              Restricted Jurisdictions: Ukraine, Cuba, Iran, North Korea, Sudan, Syria
            </p>
            <p>
              Geographic limitations apply based on U.S. Export Administration Regulations (EAR). 
              Review real-time compliance requirements through our Policy Portal.
            </p>
          </div>
        </motion.div>

        {/* Reporting Section */}
        <motion.div
          className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-cyan-400/20 text-center"
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            <FaShieldAlt className="inline-block mr-2 text-cyan-400" />
            Integrity Enforcement
          </h2>
          <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
            Immediately report anomalies through our encrypted disclosure channel
          </p>
          <a
            href="mailto:security@cognitoai.io"
            className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-3 rounded-lg hover:scale-105 transition-transform inline-flex items-center gap-2"
          >
            <FaEnvelope />
            Report Incident
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityGuidelines;