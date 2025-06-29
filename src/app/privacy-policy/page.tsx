'use client';

import { motion } from 'framer-motion';
import {
  FaFingerprint,
  FaDatabase,
  FaShieldAlt,
  FaUserLock,
  FaNetworkWired,
  FaRegChartBar,
  FaTrashAlt,
  FaChevronDown,
  FaGlobeAmericas,
  FaLockOpen
} from 'react-icons/fa';
import { useState } from 'react';

const PrivacyPolicy = () => {
  const [openSection, setOpenSection] = useState<number | null>(null);
  
  const dataTypes = [
    
    {
      icon: FaNetworkWired,
      title: "Behavioral Data",
      description: "Interaction patterns with AI interfaces",
      retention: "Anonymized after 6 months"
    },
    {
      icon: FaRegChartBar,
      title: "Performance Metrics",
      description: "Model improvement tracking data",
      retention: "Indefinitely for research"
    }
  ];

  const complianceFrameworks = [
    { framework: "GDPR", region: "EU", icon: FaGlobeAmericas },
    { framework: "CCPA", region: "California", icon: FaLockOpen },
    { framework: "PIPEDA", region: "Canada", icon: FaUserLock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 to-cyan-500 text-transparent bg-clip-text">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Privacy Protocol
            </h1>
          </div>
          <p className="text-xl text-zinc-300">
            Effective: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Data Flow Visualization */}
        <motion.div 
          className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-cyan-400/20"
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-4 flex-1">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FaDatabase className="text-cyan-400" />
                Data Lifecycle Architecture
              </h2>
              <p className="text-zinc-300">
                Our differential privacy pipeline ensures 97.3% anonymization before storage
              </p>
            </div>
            <div className="relative w-full md:w-1/2 h-48 bg-gray-900 rounded-xl p-4">
              <motion.div 
                className="absolute h-2 bg-cyan-400 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 2 }}
                style={{ top: '20%' }}
              />
              <svg viewBox="0 0 100 50" className="w-full h-full">
                <motion.path
                  d="M 10,25 Q 50,5 90,25"
                  stroke="#00FFAA"
                  fill="none"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2 }}
                />
                <motion.circle
                  cx="10"
                  cy="25"
                  r="1"
                  fill="#00FFAA"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                />
                <motion.circle
                  cx="90"
                  cy="25"
                  r="1"
                  fill="#FF00AA"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 1.8 }}
                />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Data Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dataTypes.map((dataType, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-purple-400/20 hover:border-cyan-400 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-cyan-500/20 rounded-lg">
                  <dataType.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{dataType.title}</h3>
              </div>
              <p className="text-zinc-300 mb-2">{dataType.description}</p>
              <div className="text-sm text-cyan-400 flex items-center gap-2">
                <FaChevronDown className="text-xs" />
                Retention: {dataType.retention}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expandable Sections */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((section) => (
            <motion.div
              key={section}
              className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              <button
                onClick={() => setOpenSection(openSection === section ? null : section)}
                className="w-full p-6 text-left flex justify-between items-center"
              >
                <h3 className="text-xl font-bold text-white">
                  {section === 1 && 'Differential Privacy Implementation'}
                  {section === 2 && 'Federated Learning Protocol'}
                  {section === 3 && 'Homomorphic Encryption Standards'}
                  {section === 4 && 'Right to Erasure Pipeline'}
                </h3>
                <motion.div
                  animate={{ rotate: openSection === section ? 180 : 0 }}
                >
                  <FaChevronDown className="text-cyan-400" />
                </motion.div>
              </button>
              {openSection === section && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 pt-0 border-t border-gray-700"
                >
                  <p className="text-zinc-300">
                    {section === 1 && 'Laplace noise injection (ε=0.7) applied to all training inputs before model ingestion...'}
                    {section === 2 && 'On-device model personalization with secure aggregation protocols...'}
                    {section === 3 && 'HElib implementation for encrypted model outputs...'}
                    {section === 4 && 'Automated data purging system with cryptographic deletion verification...'}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Compliance Badges */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          {complianceFrameworks.map((framework, index) => (
            <div 
              key={index}
              className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-purple-400/20 flex items-center gap-4"
            >
              <div className="p-3 bg-cyan-500/20 rounded-lg">
                <framework.icon className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{framework.framework}</h3>
                <p className="text-zinc-300">{framework.region}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Data Deletion CTA */}
        <motion.div
          className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-cyan-400/20 text-center"
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            <FaTrashAlt className="inline-block mr-2 text-cyan-400" />
            Data Redaction Portal
          </h2>
          <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
            Initiate GDPR Article 17 erasure requests through our zero-knowledge verification system
          </p>
          <button className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:scale-105 transition-transform">
            Request Data Deletion
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;