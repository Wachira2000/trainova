'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import { motion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';
import * as IconsFa from 'react-icons/fa';
import * as IconsFa6 from 'react-icons/fa6';
import {
  FaGlobe,
  FaClock,
  FaMoneyBillWave,
  FaLightbulb,
  FaFileAlt,
  FaCheckCircle,
  FaClipboardList,
  FaRocket,
  FaArrowRight,
  FaArrowDown,
} from 'react-icons/fa';
import { supabase } from '@/lib/supabaseClient';

interface Job {
  id: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  rate: string;
  duration: string;
  about_cognito_ai: string;
  about_the_role: string;
  responsibilities: string[];
  qualifications: string[];
}

const OpportunitiesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          console.error('Supabase query error:', error);
          setError(`Database error: ${error.message}`);
          return;
        }

        if (!data || data.length === 0) {
          setError('No job listings found');
          return;
        }

        const parseField = (field: any) => {
          if (typeof field === 'string') {
            try {
              const parsed = JSON.parse(field);
              if (Array.isArray(parsed)) return parsed;
            } catch (_) {}
          } else if (Array.isArray(field)) {
            return field;
          }
          return [];
        };

        const processedJobs = data.map((job: any) => {
          const IconComponent =
            (IconsFa as any)[job.icon] ||
            (IconsFa6 as any)[job.icon] ||
            FaCode;

          return {
            id: job.id,
            title: job.title,
            category: job.category,
            icon: IconComponent,
            rate: job.rate,
            duration: job.duration,
            about_cognito_ai: job['about cognito ai'],
            about_the_role: job['about the role'],
            responsibilities: parseField(job.responsibilities),
            qualifications: parseField(job.qualifications),
          };
        });

        setJobs(processedJobs);
      } catch (err: any) {
        console.error('Full error:', err);
        setError(`Network error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const categories = Array.from(new Set(jobs.map((job) => job.category)));
  const filteredJobs = selectedCategory
    ? jobs.filter((job) => job.category === selectedCategory)
    : jobs;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center text-white text-xl">
        Loading opportunities...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-red-400 text-xl max-w-md text-center p-6 bg-gray-800/50 rounded-xl">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg block mx-auto cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            AI Training Opportunities
          </h1>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
            Join our global network of experts shaping tomorrow's artificial intelligence
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-12 flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full cursor-pointer ${
              !selectedCategory
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-zinc-300 hover:bg-gray-700'
            }`}
          >
            All Domains
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full flex items-center gap-2 cursor-pointer ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-zinc-300 hover:bg-gray-700'
              }`}
            >
              <span>{category}</span>
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-purple-400 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  {React.createElement(job.icon, {
                    className: 'h-6 w-6 text-purple-400',
                  })}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{job.title}</h2>
                  <div className="mt-2">
                    <span className="text-purple-400 text-sm bg-purple-900/30 px-3 py-1 rounded-full">
                      {job.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-purple-300">{job.rate}</p>
                  <p className="text-sm text-zinc-400">{job.duration}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(job)}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                >
                  Apply Now
                  <FaCode className="text-sm" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-gray-800 max-w-3xl w-full rounded-xl p-8 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  {React.createElement(selectedJob.icon, {
                    className: 'h-6 w-6 text-purple-400',
                  })}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">{selectedJob.title}</h2>
                  <p className="text-purple-400 mt-1">{selectedJob.category}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">About Cognito AI</h3>
                  <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
                    {selectedJob.about_cognito_ai}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">About the Role</h3>
                  <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
                    {selectedJob.about_the_role}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Responsibilities</h3>
                  <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                    {selectedJob.responsibilities.map((item, i) => (
                      <li key={i} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Qualifications</h3>
                  <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                    {selectedJob.qualifications.map((qual, i) => (
                      <li key={i} className="leading-relaxed">
                        {qual}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-2">✨ Perks and Benefits</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-900/40 p-3 rounded-xl flex items-start gap-2">
                      <FaGlobe className="text-purple-400 mt-1 h-4 w-4 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold">Remote work</p>
                        <p className="text-zinc-400 text-sm">Work from the comfort of your home</p>
                      </div>
                    </div>
                    <div className="bg-gray-900/40 p-3 rounded-xl flex items-start gap-2">
                      <FaClock className="text-purple-400 mt-1 h-4 w-4 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold">Flexible hours</p>
                        <p className="text-zinc-400 text-sm">You set your schedule</p>
                      </div>
                    </div>
                    <div className="bg-gray-900/40 p-3 rounded-xl flex items-start gap-2">
                      <FaMoneyBillWave className="text-purple-400 mt-1 h-4 w-4 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold">Weekly payouts</p>
                        <p className="text-zinc-400 text-sm">Get paid promptly every week</p>
                      </div>
                    </div>
                    <div className="bg-gray-900/40 p-3 rounded-xl flex items-start gap-2">
                      <FaLightbulb className="text-purple-400 mt-1 h-4 w-4 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold">Flex your expertise</p>
                        <p className="text-zinc-400 text-sm">Help shape the future of AI</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold text-white mb-4">📝 What to Expect</h3>
                  <div className="hidden md:flex items-center justify-between">
                    {[{ icon: FaFileAlt, text: 'Fill in your application' }, { icon: FaCheckCircle, text: 'Verify your details and certification' }, { icon: FaClipboardList, text: 'Pass a skills assessment or interview' }, { icon: FaRocket, text: 'Start working and earning!' }].map((step, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div className="bg-purple-500/20 p-3 rounded-full mb-2">
                            <step.icon className="h-6 w-6 text-purple-400" />
                          </div>
                          <p className="text-white font-medium text-center max-w-[120px]">{step.text}</p>
                        </div>
                        {index < 3 && (
                          <div className="mx-2">
                            <FaArrowRight className="h-5 w-5 text-purple-400 mx-4" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="md:hidden">
                    {[{ icon: FaFileAlt, text: 'Fill in your application' }, { icon: FaCheckCircle, text: 'Verify your details and certification' }, { icon: FaClipboardList, text: 'Pass a skills assessment or interview' }, { icon: FaRocket, text: 'Start working and earning!' }].map((step, index) => (
                      <div key={index} className="flex">
                        <div className="flex flex-col items-center mr-4">
                          <div className="bg-purple-500/20 p-3 rounded-full mb-2">
                            <step.icon className="h-6 w-6 text-purple-400" />
                          </div>
                          {index < 3 && (
                            <div className="flex-grow">
                              <FaArrowDown className="h-5 w-5 text-purple-400 my-1" />
                            </div>
                          )}
                        </div>
                        <div className="py-2">
                          <p className="text-white font-medium">{step.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <button onClick={() => setSelectedJob(null)} className="px-4 py-2 text-zinc-300 hover:text-white transition-colors cursor-pointer">Close</button>
                <a href="https://forms.gle/fACNFy3vMSc5AU857" target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer">
                  Continue to Application
                  <FaCode className="text-sm" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}

        <motion.div initial={{ scale: 0.9 }} whileInView={{ scale: 1 }} className="mt-20 text-center">
          <div className="bg-gray-800/30 p-8 rounded-2xl border border-purple-400/20">
            <h2 className="text-3xl font-bold text-white mb-4">Not Seeing Your Expertise?</h2>
            <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
              We're constantly expanding our domains. Join our talent network to be notified of new opportunities matching your skills.
            </p>
            <a href="mailto:talent@cognitoai.io?subject=Talent%20Network%20Application&body=Please%20include%3A%0A-%20Your%20full%20name%0A-%20Areas%20of%20expertise%0A-%20Relevant%20experience%0A-%20Certifications%0A-%20Availability" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:scale-105 transition-transform inline-block cursor-pointer">
              Join Talent Network
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OpportunitiesPage;
