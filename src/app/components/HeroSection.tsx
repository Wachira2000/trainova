'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaArrowUpRightFromSquare, FaQuoteLeft } from 'react-icons/fa6';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Left Content */}
        <div className="flex-1 space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Build the {' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Future of AI
              </span>{' '}
              with Your Expertise
            </h1>
            
            <p className="text-lg sm:text-xl text-zinc-300 mb-6 sm:mb-8 max-w-2xl">
              Earn While You Train the Future of AI on your own schedule
            </p>

            <motion.a
              href="/opportunities"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl text-base sm:text-lg font-semibold flex items-center gap-2"
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
            className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 md:mt-12"
          >
            {[
              { value: '100+', label: 'Experts' },
            { value: '450k+', label: 'Assignments' },
              { value: '$1M+', label: 'Earned' },
            ].map((stat, index) => (
              <div key={index} className="bg-gray-800/50 p-4 sm:p-6 rounded-lg sm:rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-400">{stat.value}</div>
                <div className="text-sm sm:text-base text-zinc-300 mt-1 sm:mt-2">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative w-full h-[400px] md:h-[500px] lg:h-[600px] aspect-video rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl"
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