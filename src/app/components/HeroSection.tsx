'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaArrowUpRightFromSquare, FaQuoteLeft } from 'react-icons/fa6';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Build the Future of{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                AI
              </span>{' '}
              with Your Expertise
            </h1>
            
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl">
              Get paid training cutting-edge AI on your own schedule
            </p>

            <motion.a
  href="/opportunities"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="inline-block bg-gradient-to-br from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center gap-2"
>
  View Opportunities
  <FaArrowUpRightFromSquare className="text-sm" />
</motion.a>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-8 mt-12"
          >
            {[
              { value: '40,000+', label: 'Experts' },
              { value: '3.4M', label: 'Assignments' },
              { value: '$100M+', label: 'Earned' },
            ].map((stat, index) => (
              <div key={index} className="bg-gray-800/50 p-6 rounded-xl">
                <div className="text-3xl font-bold text-cyan-400">{stat.value}</div>
                <div className="text-zinc-300 mt-2">{stat.label}</div>
              </div>
            ))}
          </motion.div>

        
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl"
        >
          <Image
            src="/AI Trainers.jpeg"
            alt="AI Trainers"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;