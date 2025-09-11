'use client';

import { useState, ReactNode, createContext, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiChevronLeft, FiChevronRight, FiGrid, FiCheckSquare, FiSettings, FiMenu } from 'react-icons/fi';
import { clsx } from 'clsx';

interface WorkpageLayoutProps {
  children: ReactNode;
}

const SidebarContext = createContext({ isExpanded: true });

const SidebarItem = ({ icon: Icon, text, active, to }: { icon: any, text: string, active?: boolean, to: string }) => {
  const { isExpanded } = useContext(SidebarContext);
  return (
    <Link href={to}>
      <li className={clsx(
        "relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group",
        {
          'bg-gradient-to-tr from-green-500 to-green-600 text-white': active,
          'hover:bg-gray-800 text-gray-400': !active
        }
      )}>
        <Icon size={20} />
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden whitespace-nowrap ml-3"
            >
              {text}
            </motion.span>
          )}
        </AnimatePresence>
        {!isExpanded && (
          <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-green-500 text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
            {text}
          </div>
        )}
      </li>
    </Link>
  );
};

export default function WorkpageLayout({ children }: WorkpageLayoutProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  // State for mobile sidebar
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [pathname]);


  const sidebarContent = (
    <>
      <div className="p-4 pb-2 flex justify-between items-center">
        <AnimatePresence>
          {isExpanded && (
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="font-bold text-lg whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500"
            >
              My Workspace
            </motion.h1>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 hidden lg:block cursor-pointer"
        >
          {isExpanded ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
      </div>

      <SidebarContext.Provider value={{ isExpanded }}>
        <nav className="flex-1 px-2">
          <ul className="flex flex-col items-start">
            <SidebarItem icon={FiGrid} text="Overview" to="/workpage" active={pathname === '/workpage'} />
            <SidebarItem icon={FiCheckSquare} text="My Tasks" to="/workpage/tasks" active={pathname === '/workpage/tasks'} />
            <SidebarItem icon={FiSettings} text="Settings" to="/workpage/settings" active={pathname === '/workpage/settings'} />
          </ul>
        </nav>
      </SidebarContext.Provider>
    </>
  );


  return (
    <div className="flex h-screen bg-black text-white pt-16">
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 pt-16 bg-black border-r border-zinc-800 z-40 lg:hidden"
          >
            {sidebarContent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isExpanded ? '16rem' : '5rem' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col h-full border-r border-zinc-800"
      >
        {sidebarContent}
      </motion.aside>

      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Mobile header */}
        <header className="lg:hidden p-4 border-b border-zinc-800 flex items-center">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 mr-4 rounded-lg bg-gray-800 cursor-pointer">
                <FiMenu />
            </button>
            <h1 className="font-bold text-lg">
                {(pathname.split('/').pop() || '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Overview'}
            </h1>
        </header>
        <div className="flex-1 p-6 bg-gray-950">
            {children}
        </div>
      </main>
    </div>
  );
}