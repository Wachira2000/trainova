'use client';

import { motion } from 'framer-motion';
import {
  FaGlobeAmericas,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaUserClock,
  FaBan,
  FaNetworkWired,
  FaPassport,
  FaEnvelope,
  FaCheckCircle,
  FaRegClock
} from 'react-icons/fa';

const WorkLocationPolicy = () => {
  const restrictedCountries = [
    { name: "Ukraine", code: "UA", flag: "🇺🇦" },
    { name: "Cuba", code: "CU", flag: "🇨🇺" },
    { name: "Iran", code: "IR", flag: "🇮🇷" },
    { name: "North Korea", code: "KP", flag: "🇰🇵" },
    { name: "Sudan", code: "SD", flag: "🇸🇩" },
    { name: "Syria", code: "SY", flag: "🇸🇾" }
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
              Global Work Protocol
            </h1>
          </div>
          <p className="text-xl text-zinc-300">
            Effective: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Global Coverage */}
        <motion.div
          className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-cyan-400/20"
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <FaGlobeAmericas className="text-cyan-400" />
                Borderless Productivity
              </h2>
              <p className="text-zinc-300">
                Operate from any geographic location meeting our security and compliance standards,
                with real-time synchronization across 195 recognized nations.
              </p>
            </div>
            <div className="p-6 bg-gray-900 rounded-xl w-full md:w-1/3">
              <div className="flex items-center gap-3 text-purple-400">
                <FaUserClock className="text-2xl" />
                <span className="text-lg font-bold">24/7 Global Coverage</span>
              </div>
              <div className="mt-4 space-y-2 text-zinc-300">
                <p>• UTC-12 to UTC+14 coverage</p>
                <p>• 150+ local currency options</p>
                <p>• Multilingual support interface</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Restricted Nations Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          {restrictedCountries.map((country, index) => (
            <div 
              key={country.code}
              className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-red-400/20 hover:border-red-400 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl">{country.flag}</span>
                <h3 className="text-xl font-bold text-white">{country.name}</h3>
              </div>
              <div className="text-zinc-300 space-y-2">
                <p className="flex items-center gap-2">
                  <FaBan className="text-red-400" />
                  Full access restriction
                </p>
                <p className="text-sm">OFAC compliance requirement</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Compliance Protocol */}
        <motion.div
          className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-purple-400/20"
          initial={{ x: -50 }}
          whileInView={{ x: 0 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <FaShieldAlt className="text-purple-400" />
            Location Validation Framework
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-300">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-green-400">
                <FaCheckCircle />
                <h3 className="font-bold">Required Practices</h3>
              </div>
              <ul className="space-y-3 pl-6">
                <li>• Real-time GPS verification checks</li>
                <li>• Bank-grade IP validation</li>
                <li>• Quarterly residency attestation</li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-red-400">
                <FaBan />
                <h3 className="font-bold">Strict Prohibitions</h3>
              </div>
              <ul className="space-y-3 pl-6">
                <li>• VPN usage (except whitelisted)</li>
                <li>• Location spoofing techniques</li>
                <li>• Proxy server implementation</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Compliance Section */}
        <motion.div
          className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-cyan-400/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <FaRegClock className="text-cyan-400" />
                Real-Time Sanctions Monitoring
              </h2>
              <p className="text-zinc-300">
                Our compliance engine processes 2.4M regulatory updates daily across:
              </p>
              <ul className="mt-4 space-y-2 text-zinc-300">
                <li>• OFAC Specially Designated Nationals List</li>
                <li>• EU Restrictive Measures</li>
                <li>• UN Security Council Resolutions</li>
              </ul>
            </div>
            <div className="p-6 bg-gray-900 rounded-xl w-full md:w-1/3">
              <div className="text-center">
                <div className="text-4xl mb-2">0.3ms</div>
                <div className="text-zinc-300">Average Compliance Check Latency</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-purple-400/20 text-center"
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <FaPassport className="text-purple-400" />
            Location Verification Support
          </h2>
          <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
            For residency confirmation or jurisdiction inquiries
          </p>
          <a
            href="mailto:compliance@trainova.io"
            className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:scale-105 transition-transform inline-flex items-center gap-2"
          >
            <FaEnvelope />
            Contact Compliance Team
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkLocationPolicy;