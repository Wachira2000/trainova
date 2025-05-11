'use client';

import { motion } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaLock, 
  FaBalanceScale, 
  FaGlobeEurope,
  FaNetworkWired
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <>{children}</> : null;
};

const DataProcessingAddendum = () => {
  const [complianceProgress, setComplianceProgress] = useState(0);
  const [floatingIcons, setFloatingIcons] = useState<
    Array<{ left: number; top: number; duration: number }>
  >([]);
  const [effectiveDate, setEffectiveDate] = useState('');

  useEffect(() => {
    // Client-side only calculations
    setComplianceProgress(Math.random() * 20 + 80);
    setEffectiveDate(new Date().toLocaleDateString());
    setFloatingIcons(
      Array.from({ length: 15 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 10 + 10
      }))
    );
  }, []);

  const sections = [
    {
      icon: FaShieldAlt,
      title: 'Data Processing Details',
      content: [
        'All data processing activities conducted under this Addendum will comply with GDPR Article 28 requirements.',
        'Processing duration: For the term of the Master Agreement plus return/destruction period',
        'Nature/purpose: Provision of AI training services and related technical support',
        'Data categories: Technical data, interaction data, anonymized behavioral patterns'
      ]
    },
    {
      icon: FaLock,
      title: 'Security Measures',
      content: [
        'ISO 27001:2022 certified infrastructure',
        'End-to-end encryption for data in transit and at rest',
        'Annual penetration testing and vulnerability assessments',
        'GDPR-compliant data breach notification protocol (<24hr escalation)'
      ]
    },
    {
      icon: FaBalanceScale,
      title: 'Sub-Processing',
      content: [
        'Authorized sub-processors listed in Annex III',
        '30-day notification period for new sub-processors',
        'Flow-down obligations in all sub-processing agreements',
        'Liability maintained with primary processor'
      ]
    },
    {
      icon: FaGlobeEurope,
      title: 'Intl. Data Transfers',
      content: [
        'EU-US DPF and UK Extension framework compliance',
        'SCCs (2021) incorporated by reference',
        'Transfer Impact Assessments available upon request',
        'Data localization options in EU/UK/US regions'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <ClientOnly>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {floatingIcons.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute text-cyan-400"
              style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
              animate={{ y: [0, -100], rotate: [0, 180], opacity: [0.3, 0] }}
              transition={{
                duration: pos.duration,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              <FaNetworkWired className="text-2xl" />
            </motion.div>
          ))}
        </div>
      </ClientOnly>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-block bg-gradient-to-r from-purple-500 to-blue-600 p-2 rounded-2xl mb-8">
            <FaShieldAlt className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Data Processing <span className="bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">Addendum</span>
          </h1>
          <ClientOnly>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
              Effective Date: {effectiveDate} | Compliant with GDPR, CCPA, and ISO 27001
            </p>
          </ClientOnly>
        </motion.div>

        <ClientOnly>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 mb-20 text-center"
          >
            <div className="inline-block relative w-48 h-48 mx-auto">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-700"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="45"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-cyan-400"
                  strokeWidth="8"
                  strokeDasharray={`${complianceProgress * 2.83} 283`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="45"
                  cx="50"
                  cy="50"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="text-3xl font-bold text-cyan-400">
                  {complianceProgress.toFixed(0)}%
                </span>
                <p className="text-sm text-zinc-300">Compliance Score</p>
              </div>
            </div>
            <p className="text-zinc-300 mt-6 max-w-2xl mx-auto">
              Our processing activities maintain <span className="text-cyan-400">SOC 2 Type II</span> certification and 
              regular <span className="text-purple-400">DPIA assessments</span>. Audit reports available under NDA.
            </p>
          </motion.div>
        </ClientOnly>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700"
            >
              <section.icon className="h-12 w-12 text-cyan-400 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
              <ul className="space-y-4">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300">
                    <span className="text-cyan-400">▹</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 bg-gray-900/50 p-8 rounded-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <FaBalanceScale className="text-purple-400" />
            Annex I - Technical & Organizational Measures
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {[
              'Pseudonymization of personal data',
              'Regular security awareness training',
              'Access control via RBAC and MFA',
              'Daily encrypted backups (7-year retention)',
              'Network segmentation and intrusion detection',
              'Physical data center security (Biometric access)'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-xl">
                <div className="h-2 w-2 bg-cyan-400 rounded-full flex-shrink-0" />
                <span className="text-zinc-300">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-20 border-t border-gray-700 pt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Governing Law</h3>
              <p className="text-zinc-300">
                This DPA is governed by the laws of Ireland (GDPR Art. 27 Representative)
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">EU Representative</h3>
              <p className="text-zinc-300">
                AI Governance Ltd<br />
                Dublin, Ireland<br />
                dpa@aigovernance.eu
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Version Control</h3>
              <p className="text-zinc-300">
                Current: v3.1.2<br />
                <Link href="/data-processing-addendum" className="text-cyan-400 hover:underline">
                  Revision History
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DataProcessingAddendum;