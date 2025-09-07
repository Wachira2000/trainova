'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaCookieBite, FaLock, FaShieldAlt, FaChevronDown } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Link from 'next/link';

type CookieType = {
  key: keyof CookiePreferences;
  icon: typeof FaLock;
  title: string;
  description: string;
  alwaysActive?: boolean;
};

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <>{children}</>;
};

const CookiesPage = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false
  });

  const cookieTypes: CookieType[] = [
    {
      key: 'necessary',
      icon: FaLock,
      title: "Strictly Necessary",
      description: "Essential for website functionality and security",
      alwaysActive: true
    },
    {
      key: 'analytics',
      icon: FaShieldAlt,
      title: "Performance & Analytics",
      description: "Helps us improve user experience through anonymous data"
    },
    {
      key: 'marketing',
      icon: FaCookieBite,
      title: "Marketing & Personalization",
      description: "Enables personalized content and recommendations"
    }
  ];

  // State for client-side only positions
  const [cookiePositions, setCookiePositions] = useState<Array<{ left: number; top: number; duration: number }>>([]);

  useEffect(() => {
    // Generate random positions only on client side
    setCookiePositions(
      Array(15).fill(null).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 10 + 10
      }))
    );
  }, []);

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <ClientOnly>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {cookiePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute text-cyan-400"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                y: [0, -100],
                rotate: [0, 360],
                opacity: [0.5, 0]
              }}
              transition={{
                duration: pos.duration,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              <FaCookieBite className="text-2xl" />
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
          <div className="inline-block bg-gray-800 p-2 rounded-2xl mb-8">
            <FaCookieBite className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Cookie <span className="text-cyan-400">Policy</span>
          </h1>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
            We believe in transparency. Customize your cookie preferences and learn how we use data to enhance your experience.
          </p>
        </motion.div>

        <motion.div 
          className="bg-gray-800/50 backdrop-blur-lg rounded-3xl shadow-xl p-8 mb-20"
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <FaCookieBite className="text-cyan-400" />
            Cookie Preferences
          </h2>

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {cookieTypes.map((type, index) => (
              <motion.div
                key={type.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-900/30 p-6 rounded-xl border border-gray-700 relative"
              >
                <div className="flex items-start gap-4 mb-4">
                  <type.icon className="h-8 w-8 text-cyan-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{type.title}</h3>
                    <p className="text-zinc-400 text-sm">{type.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">
                    {type.alwaysActive ? 'Always active' : 'Optional'}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cookiePreferences[type.key]}
                      onChange={(e) => !type.alwaysActive && setCookiePreferences({
                        ...cookiePreferences,
                        [type.key]: e.target.checked
                      })}
                      className="sr-only"
                      disabled={type.alwaysActive}
                    />
                    <div className={`w-11 h-6 rounded-full ${type.alwaysActive ? 'bg-gray-600' : 'bg-gray-700'} transition-colors`}>
                      <div className={`absolute top-0.5 left-[2px] w-5 h-5 rounded-full transition-transform ${
                        cookiePreferences[type.key] ? 'translate-x-5 bg-white' : 'bg-gray-400'
                      }`} />
                    </div>
                  </label>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-8">
            {[
              {
                title: "Why We Use Cookies",
                content: "Cookies help us deliver a personalized experience while maintaining the highest security standards..."
              },
              {
                title: "Third-Party Cookies",
                content: "We partner with trusted providers for analytics and service optimization..."
              },
              {
                title: "Managing Preferences",
                content: "You can update your choices at any time through this page or browser settings..."
              }
            ].map((section, index) => (
              <motion.div
                key={section.title}
                className="border-b border-gray-700 pb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                <button
                  onClick={() => setActiveSection(activeSection === section.title ? '' : section.title)}
                  className="flex justify-between items-center w-full group"
                >
                  <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {section.title}
                  </h3>
                  <FaChevronDown className={`transform transition-transform ${
                    activeSection === section.title ? 'rotate-180 text-cyan-400' : 'text-zinc-400'
                  }`} />
                </button>
                <AnimatePresence>
                  {activeSection === section.title && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-4 text-zinc-300 overflow-hidden"
                    >
                      {section.content}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <ClientOnly>
          <AnimatePresence>
            {isBannerVisible && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-4 right-4 left-4 sm:left-auto bg-gray-800 backdrop-blur-lg rounded-xl p-6 shadow-2xl max-w-md"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <FaShieldAlt className="h-8 w-8 text-cyan-400 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-2">Your Privacy Choices</h3>
                    <p className="text-zinc-300 text-sm mb-4">
                      We use cookies to optimize your experience. You can update your preferences anytime.
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setIsBannerVisible(false)}
                        className="bg-white text-black px-6 py-2 rounded-lg hover:scale-105 transition-transform"
                      >
                        Accept All
                      </button>
                      <Link 
                        href="/cookies-policy"
                        className="border border-cyan-400 text-cyan-400 px-6 py-2 rounded-lg hover:bg-cyan-400/10 transition-colors"
                      >
                        Customize
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ClientOnly>
      </div>
    </div>
  );
};

export default CookiesPage;