'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowUp } from 'react-icons/fa';

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
    <footer className="relative bg-gray-900 border-t border-gray-800 mt-20">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
             <Link href="/" className="flex items-center w-full max-w-[200px] mb-6">
              <div className="relative w-full h-[150px]"> 
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
            <p className="text-zinc-400 mb-4">
              Shaping the future of artificial intelligence through human expertise
            </p>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-zinc-200 font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {policyLinks.slice(0, 3).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-zinc-400 hover:text-purple-400 transition-colors"
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
            <h3 className="text-zinc-200 font-semibold mb-4">Policies</h3>
            <ul className="space-y-3">
              {policyLinks.slice(3).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-zinc-400 hover:text-purple-400 transition-colors"
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
          <div className="text-zinc-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Cognito AI. All rights reserved.
          </div>
          
          <motion.button
            onClick={scrollToTop}
            className="flex items-center text-zinc-400 hover:text-purple-400 transition-colors"
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