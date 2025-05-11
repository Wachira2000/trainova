'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaLightbulb, FaUsers, FaWallet, FaCoins, FaHandshake } from 'react-icons/fa';

const FeaturesSection = () => {
  const features = [
    {
      icon: FaLightbulb,
      title: "Share Your Expertise",
      description: "Contribute your unique knowledge to train cutting-edge AI models",
      stats: "$2,583.55 avg. monthly earnings",
      color: "from-purple-500 to-blue-500"
    },
    {
      icon: FaUsers,
      title: "Connect & Collaborate",
      description: "Join our global network of AI trainers and domain experts",
      stats: "100+ active experts",
      color: "from-cyan-500 to-teal-500"
    },
    {
      icon: FaWallet,
      title: "Get Paid Your Way",
      description: "Flexible payment options with competitive compensation",
      stats: "$1,573.01 minimum weekly",
      color: "from-orange-500 to-pink-500"
    }
  ];

  // Create motion-wrapped Link component
  const MotionLink = motion(Link);

  return (
    <section className="relative py-20 bg-gray-900/50 border-t border-gray-800">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] bg-center" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Transform Your Knowledge
            <span className="block text-2xl text-zinc-400 mt-4">
              into AI Innovation
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2 }}
              className="group relative bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-purple-400 transition-all"
            >
              {/* Gradient icon */}
              <div className={`absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-br ${feature.color} p-3 rounded-full`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>

              <div className="space-y-6 mt-12">
                <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                <p className="text-zinc-300">{feature.description}</p>
                
                <div className="bg-gray-900/50 p-4 rounded-xl">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <FaCoins className="text-yellow-400" />
                    <span className="text-lg font-semibold text-cyan-400">
                      {feature.stats}
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            </motion.div>
          ))}
        </div>

        {/* Animated CTA */}
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          className="mt-20 text-center"
        >
          <div className="inline-block relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000" />
            <MotionLink
              href="/opportunities"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-br from-purple-600 to-cyan-600 text-white px-12 py-4 rounded-xl text-xl font-semibold flex items-center gap-3"
            >
              <FaHandshake className="text-2xl" />
              Start Earning Now
              <span className="text-lg opacity-80 group-hover:opacity-100 transition-opacity">
                ↗
              </span>
            </MotionLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;