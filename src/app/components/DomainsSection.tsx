'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  FaSeedling, 
  FaPenFancy,
  FaCalculator, 
  FaFlask, 
  FaBalanceScale,
  FaHistory,
  FaCode,
  FaChartLine,
  FaPlusCircle
} from 'react-icons/fa';

const DomainsSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const categories = [
    {icon: FaPenFancy, title: 'Creative Writing', color: 'from-pink-500 to-purple-500' },
    { icon: FaSeedling, title: 'Generalist', color: 'from-green-500 to-teal-500' },
    { icon: FaCalculator, title: 'Math', color: 'from-purple-500 to-indigo-500' },
    { icon: FaFlask, title: 'Chemistry', color: 'from-cyan-500 to-blue-500' },
    { icon: FaBalanceScale, title: 'Law', color: 'from-orange-500 to-red-500' },
    { icon: FaHistory, title: 'History', color: 'from-yellow-500 to-amber-500' },
    { icon: FaCode, title: 'Coding', color: 'from-pink-500 to-rose-500' },
    { icon: FaChartLine, title: 'Data Science', color: 'from-blue-500 to-cyan-500' },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative py-20 bg-gray-900 border-t border-gray-800 overflow-hidden">
      {/* Conditional particle rendering */}
      <div className="absolute inset-0 opacity-10">
        {isMounted && 
          [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-purple-500 rounded-full"
              style={{
                width: Math.random() * 10 + 5 + 'px',
                height: Math.random() * 10 + 5 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, -100],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))
        }
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Join a Community of Innovators
          </h2>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
            Our AI trainers come from all backgrounds and have expertise in everything from coding to creative writing.
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
  {categories.map((category, index) => (
    <motion.div
      key={category.title}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      className="group relative cursor-pointer"
    >
      <Link href="/opportunities" passHref className="absolute inset-0 z-10">
        <span className="sr-only">View {category.title} opportunities</span>
      </Link>
      <div className={`bg-gradient-to-br ${category.color} p-1 rounded-2xl transition-all duration-300 group-hover:scale-105`}>
        <div className="bg-gray-900 rounded-xl p-6 h-full">
          <category.icon className="h-12 w-12 text-white mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
          <div className="inline-flex items-center text-cyan-400 transition-colors">
            Learn more
            <span className="ml-2">→</span>
          </div>
        </div>
      </div>
    </motion.div>
  ))}
</div>

        {/* Additional Domains Card */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-1 rounded-2xl max-w-md mx-auto"
        >
          <div className="bg-gray-900 rounded-xl p-8 text-center">
            <FaPlusCircle className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              And 20+ Other Expert Domains
            </h3>
            <Link href="/opportunities" passHref>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg transition-transform cursor-pointer"
                role="button"
              >
                Discover All Opportunities
                <span className="ml-2">→</span>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DomainsSection;