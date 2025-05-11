'use client';

import { motion } from 'framer-motion';
import { FaUserCheck, FaTasks, FaCode, FaArrowRight, FaShieldAlt, FaCoins, FaUsers } from 'react-icons/fa';
import Link from 'next/link';

const HowItWorksPage = () => {
  const steps = [
    {
      icon: FaUserCheck,
      title: "1. Registration & Screening",
      content: "Begin your journey by completing our streamlined application process",
      details: [
        "Submit domain-specific credentials",
        "Complete initial competency assessment",
        "Sign digital contractor agreement",
        "5 business day approval process"
      ],
      duration: "30 mins"
    },
    {
      icon: FaTasks,
      title: "2. AI Training Onboarding",
      content: "Master our proprietary training interface through interactive modules",
      details: [
        "Interactive tutorial walkthrough",
        "Practice with sample AI models",
        "Quality standard certification",
        "Squad leader assignment"
      ],
      duration: "1-3 hours"
    },
    {
      icon: FaCode,
      title: "3. Task Selection",
      content: "Choose from diverse AI training tasks matching your expertise",
      details: [
        "Real-time task dashboard",
        "Complexity-based filtering",
        "Project preview functionality",
        "Performance-based recommendations"
      ],
      duration: "Flexible access"
    },
    {
      icon: FaShieldAlt,
      title: "4. Quality Assurance",
      content: "Ensure excellence through our multi-layered review system",
      details: [
        "Automated consistency checks",
        "Peer review system",
        "AI accuracy validation",
        "Continuous feedback loop"
      ],
      duration: "Integrated process"
    },
    {
      icon: FaCoins,
      title: "5. Compensation",
      content: "Get rewarded for your valuable contributions",
      details: [
        "Weekly Wise/PayPal/AirTM payments",
        "Transparent rate calculator",
        "Performance bonuses",
        "Milestone rewards"
      ],
      duration: "Every Tuesday payout"
    },
    {
      icon: FaUsers,
      title: "6. Community Growth",
      content: "Evolve with our global network of AI specialists",
      details: [
        "Expert discussion forums",
        "Monthly skill workshops",
        "Collaborative projects",
        "Leaderboard challenges"
      ],
      duration: "24/7 access"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Shaping AI Excellence
            <span className="block text-2xl text-zinc-400 mt-4">
              Your Journey as an AI Trainer
            </span>
          </h1>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-8">
            Join thousands of experts contributing to the next generation of artificial intelligence
          </p>
          <Link
            href="/opportunities"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-transform"
          >
            Get Started Now
            <FaUserCheck className="ml-2 inline-block" />
          </Link>
        </motion.div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-purple-400 transition-all group"
            >
              {/* Gradient Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <step.icon className="h-8 w-8 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{step.title}</h2>
                    <p className="text-zinc-300">{step.content}</p>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm text-purple-400">Average Duration</span>
                    <span className="text-sm text-zinc-400">{step.duration}</span>
                  </div>
                  
                  <ul className="space-y-3">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start text-zinc-300">
                        <span className="text-purple-400 mr-2">▹</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Demo Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 bg-gray-800/30 rounded-2xl p-8 border border-purple-400/20"
        >
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Live Training Simulator
              </h2>
              <p className="text-zinc-300 mb-8">
                Experience our AI training interface through an interactive demo
              </p>
              <div className="space-y-6">
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm text-zinc-300">Active Training Session</span>
                  </div>
                  <p className="text-zinc-400 italic">
                    "Analyze this medical report and identify key findings..."
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 bg-gray-900/50 rounded-lg text-zinc-300 hover:bg-purple-500/20 transition-colors">
                    Request Clarification
                  </button>
                  <button className="p-4 bg-gray-900/50 rounded-lg text-zinc-300 hover:bg-purple-500/20 transition-colors">
                    Submit Analysis
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <FaCode className="text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Sample AI Response</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <p className="text-zinc-300 text-sm">
                    The report indicates elevated white blood cell count (15,000/μL) 
                    with neutrophilic predominance, suggesting bacterial infection...
                  </p>
                </div>
                <div className="flex items-center gap-4 text-zinc-400 text-sm">
                  <span>Accuracy: 92%</span>
                  <span>|</span>
                  <span>Confidence: 4.8/5</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          className="mt-20 text-center"
        >
          <Link
            href="/opportunities"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-5 rounded-2xl text-xl font-semibold hover:scale-105 transition-transform"
          >
            Start Your AI Training Journey Today
            <FaArrowRight className="ml-2 inline-block animate-pulse" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default HowItWorksPage;