'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const MotionLink = motion(Link);

  const navItems = [
    { name: 'How it works', path: '/how-it-works' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'View Opportunities', path: '/opportunities' },
  ];

  return (
    <nav className="w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-grow flex items-center">
            <Link href="/" className="flex items-center w-full max-w-[200px]">
              <div className="relative w-full h-40">
                <Image
                  src="/logo.png"
                  alt="Cognito AI"
                  fill
                  className="object-contain object-left"
                  priority
                  style={{
                    filter: 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.3))'
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Fixed */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <MotionLink
                key={item.name}
                href={item.path}
                className={`text-zinc-300 transition-colors relative ${
                  item.name === 'View Opportunities' 
                    ? 'ml-4 bg-gradient-to-br from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform shadow-lg'
                    : ''
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {item.name}
                {item.name !== 'View Opportunities' && (
                  <span className="absolute bottom-0 left-0 w-0 h-px transition-all group-hover:w-full" />
                )}
              </MotionLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-zinc-300 p-2 cursor-pointer"
          >
            {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-16 left-0 right-0 bg-gray-900 border-t border-gray-800"
            >
              <div className="px-4 py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`block text-zinc-300 transition-colors ${
                      item.name === 'View Opportunities'
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg text-center'
                        : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;