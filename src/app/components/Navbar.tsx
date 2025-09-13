'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiMenu, FiX, FiChevronDown, FiUser, FiLogOut, FiPlus, FiCreditCard, FiBriefcase, FiDollarSign } from 'react-icons/fi';
import { useState, useEffect, memo, useRef } from 'react';
import { FaLightbulb } from 'react-icons/fa';
import { useSupabase } from './SessionProvider';
import { User } from '@supabase/supabase-js';

// Define the Profile type
interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
  role: string;
  // Add other profile properties as needed
}

const Navbar = () => {
  const { user, profile } = useSupabase();
  const [isOpen, setIsOpen] = useState(false);

  const MotionLink = motion(Link);
  const MotionAnchor = motion.a;

  const centeredNavItems = [
    { name: 'How it works', path: '/how-it-works' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
  ];

  const rightNavItems = [
    { name: 'Log in', path: '/login' },
    { name: 'View Opportunities', path: '/opportunities' },
  ];

  const navItems = [...centeredNavItems, ...rightNavItems];

  const renderPublicNavbar = () => (
    <>
      {/* Centered Links */}
      <div className="hidden md:flex flex-grow justify-center">
        <div className="flex items-center space-x-8">
          {centeredNavItems.map((item, index) => (
            <MotionLink
              key={item.name}
              href={item.path}
              className={'text-white transition-colors relative hover:text-gray-300 group'}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
            </MotionLink>
          ))}
        </div>
      </div>

      {/* Right Aligned Buttons */}
      <div className="hidden md:flex items-center space-x-8">
        {rightNavItems.map((item, index) => {
          const isLogin = item.name === 'Log in';
          const Component = isLogin ? MotionAnchor : MotionLink;
          return (
            <Component
              key={item.name}
              href={item.path}
              target={isLogin ? '_blank' : undefined}
              rel={isLogin ? 'noopener noreferrer' : undefined}
              className={`text-white transition-colors relative ${
                item.name === 'View Opportunities' 
                  ? 'bg-white !text-black px-4 py-2 rounded-lg text-base font-semibold inline-flex items-center gap-2'
                  : item.name === 'Log in'
                  ? 'border border-gray-500 px-4 py-2 rounded-lg text-base font-semibold inline-flex items-center gap-2 hover:bg-gray-800'
                  : 'hover:text-gray-300'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + centeredNavItems.length) * 0.1 + 0.3 }}
            >
              {item.name}
            </Component>
          )}
        )}
      </div>
    </>
  );

  const renderAuthenticatedNavbar = () => (
    <div className="flex-grow flex justify-end">
      {profile ? (
        <ProfileDropdown user={user!} profile={profile} />
      ) : (
        user && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse" />
            <div className="hidden sm:block h-4 w-24 bg-gray-700 rounded animate-pulse" />
          </div>
        )
      )}
    </div>
  );

  return (
    <nav className="w-full bg-black backdrop-blur-md border-b border-gray-800 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-white text-2xl font-bold">
              <FaLightbulb className="text-white" />
              <span>Trainova</span>
            </Link>
          </div>

          {user ? (
            renderAuthenticatedNavbar()
          ) : (
            renderPublicNavbar()
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 p-2 cursor-pointer"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-16 left-0 right-0 bg-black border-t border-gray-800"
            >
              <div className="px-4 py-4 space-y-4">
                {navItems.map((item) => {
                  const isLogin = item.name === 'Log in';
                  const Component = isLogin ? 'a' : Link;
                  return (
                    <Component
                      key={item.name}
                      href={item.path}
                      target={isLogin ? '_blank' : undefined}
                      rel={isLogin ? 'noopener noreferrer' : undefined}
                      className={`block text-gray-400 transition-colors text-center ${
                        item.name === 'View Opportunities'
                          ? 'bg-white !text-black px-4 py-2 rounded-lg text-base font-semibold inline-flex items-center gap-2 justify-center'
                          : item.name === 'Log in'
                          ? 'border border-gray-500 px-4 py-2 rounded-lg text-base font-semibold inline-flex items-center gap-2 justify-center hover:bg-gray-800'
                          : 'hover:text-white'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Component>
                  )}
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

const ProfileDropdown = ({ user, profile }: { user: User; profile: Profile }) => {
  const { supabase } = useSupabase();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownItems = [
    { name: 'Workpage', path: '/workpage', icon: FiBriefcase },
    { name: 'Profile', path: '/profile', icon: FiUser },
    { name: 'Payment Details', path: '/payments', icon: FiCreditCard },
    ...(profile?.role === 'admin' ? [
      { name: 'Add Users', path: '/admin/create-user', icon: FiPlus },
      { name: 'Withdrawals', path: '/admin/withdrawals', icon: FiDollarSign }
    ] : []),
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 cursor-pointer">
        <img 
          src={profile.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.full_name}`}
          alt="Profile" 
          className="w-8 h-8 rounded-full bg-gray-700"
        />
        <span className="hidden sm:block text-white font-semibold">{profile.full_name}</span>
        <FiChevronDown className={`text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1 border border-zinc-700"
          >
            {dropdownItems.map(item => (
              <Link key={item.name} href={item.path} onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left">
                <item.icon />
                <span>{item.name}</span>
              </Link>
            ))}
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-gray-700 w-full text-left cursor-pointer">
              <FiLogOut />
              <span>Log out</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(Navbar);
