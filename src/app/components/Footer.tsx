'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowUp, FaLightbulb } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const policyLinks = [
    { name: 'Terms of Use', path: '/terms-of-use' },
    { name: 'Community Guidelines', path: '/community-guidelines' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Working Location Policy', path: '/working-location-policy' },
    { name: 'Cookies Policy', path: '/cookies-policy' },
    { name: 'Data Processing Addendum', path: '/data-processing-addendum' },
  ];

  return (
    <footer className="relative bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Link href="/" className="flex items-center gap-2 text-white text-2xl font-bold mb-6">
              <FaLightbulb className="text-white" />
              <span>Trainova</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Shaping the future of artificial intelligence through human expertise
            </p>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {policyLinks.slice(0, 3).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Policy Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-white font-semibold mb-4">Policies</h3>
            <ul className="space-y-3">
              {policyLinks.slice(3).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Trainova. All rights reserved.
          </div>
          
          <motion.button
            onClick={scrollToTop}
            className="flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
            whileHover={{ y: -2 }}
          >
            Back to Top
            <FaArrowUp className="ml-2 animate-bounce" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;