'use client';

import { useState, useEffect, useRef } from 'react';
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

import { FaThumbsUp } from 'react-icons/fa';
import Confetti from 'react-confetti';
import axios from 'axios';

// A dedicated component for the new Application form.
const ApplicationFormComponent = ({ jobTitle }: { jobTitle: string }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: null as File | null,
    certificateName: '',
    issuingOrganization: '',
    certificateNo: '',
    certificateUrl: '',
    certificateFile: null as File | null,
    educationLevel: '',
    country: '',
    state: '',
    availability: '',
    computerSpecs: null as File | null,
    internetSpeedScreenshot: null as File | null,
    languages: '',
    weeklyHours: '',
    privacyPolicy: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fileNames, setFileNames] = useState({
    resume: '',
    certificateFile: '',
    computerSpecs: '',
    internetSpeedScreenshot: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setFileNames((prev) => ({ ...prev, [name]: files[0].name }));
    }
  };

  const handleRemoveFile = (name: keyof typeof fileNames) => {
    setFormData((prev) => ({ ...prev, [name]: null }));
    setFileNames((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    const data = new FormData();
    data.append('jobTitle', jobTitle);
    for (const key in formData) {
      const value = formData[key as keyof typeof formData];
      if (value instanceof File) {
        data.append(key, value);
      } else {
        data.append(key, String(value));
      }
    }

    try {
      await axios.post('/api/apply', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(true);
      setShowConfetti(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', resume: null, certificateName: '', issuingOrganization: '', certificateNo: '', certificateUrl: '', certificateFile: null, educationLevel: '', country: '', state: '', availability: '', computerSpecs: null, internetSpeedScreenshot: null, languages: '', weeklyHours: '', privacyPolicy: false });
      setFileNames({ resume: '', certificateFile: '', computerSpecs: '', internetSpeedScreenshot: '' });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setShowConfetti(false), 10000); // Confetti lasts for 10 seconds
      return () => clearTimeout(timer);
    }
  }, [success]);

  const FileInput = ({ name, label, required, accept }: { name: keyof typeof fileNames, label: string, required: boolean, accept: string }) => (
    <div>
      <label className="block text-sm font-medium text-zinc-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {fileNames[name] ? (
        <div className="mt-1 flex items-center">
          <span className="text-green-400">✓</span>
          <span className="ml-2 text-white">{fileNames[name]}</span>
          <button type="button" onClick={() => handleRemoveFile(name)} className="ml-4 text-red-400 hover:text-red-500">Remove</button>
        </div>
      ) : (
        <input
          type="file"
          name={name}
          id={name}
          onChange={handleFileChange}
          required={required}
          accept={accept}
          className="w-full text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-900/50 file:text-cyan-300 hover:file:bg-cyan-800/50 file:cursor-pointer"
        />
      )}
      <p className="mt-1 text-xs text-zinc-500">Accepted file types: {accept}.</p>
    </div>
  );

  if (success) {
    return (
        <div className="h-full flex items-center justify-center text-center p-8">
            <div>
                {showConfetti && <Confetti />}
                <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                    }}
                    className="flex justify-center mb-4"
                >
                    <FaThumbsUp className="text-6xl text-green-400" />
                </motion.div>
                <h1 className="text-3xl font-bold text-center mb-4 text-white">Thank You!</h1>
                <div className="bg-green-900/50 border border-green-400 text-green-300 p-4 rounded-lg mb-4">
                    Application submitted successfully!
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="p-8">
        <p className="text-center text-zinc-400 mb-8">
            Please ensure all required fields marked with a red asterisk (<span className="text-red-500">*</span>) are completed. Missing or incomplete information may delay your application.
        </p>
        {error && (
            <div className="bg-red-900/50 border border-red-400 text-red-300 p-4 rounded-lg mb-6">
                {error}
            </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-zinc-300">
                        First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-zinc-300">
                        Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                    Email Address <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                />
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-zinc-300">
                    Phone
                </label>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                />
            </div>
            <FileInput name="resume" label="Upload Resume" required={true} accept=".pdf,.doc,.docx" />

            <div className="space-y-6 pt-6 border-t border-gray-700">
                <h2 className="text-2xl font-bold text-white">Education & Qualifications</h2>
                <p className="text-lg font-medium text-zinc-300">Add your AI Annotation certificate</p>
                <p className="text-sm text-zinc-400">
                    Please upload a valid certificate from <a href="https://www.udemy.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Udemy</a> or <a href="https://www.skillshare.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Skillshare</a>. Certificates that cannot be verified will not be accepted.
                </p>
                <div>
                    <label htmlFor="certificateName" className="block text-sm font-medium text-zinc-300">
                        Certificate Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="certificateName"
                        id="certificateName"
                        value={formData.certificateName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>
                <div>
                    <label htmlFor="issuingOrganization" className="block text-sm font-medium text-zinc-300">
                        Issuing Organization <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="issuingOrganization"
                        id="issuingOrganization"
                        value={formData.issuingOrganization}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    >
                        <option value="">Select an organization</option>
                        <option value="Udemy">Udemy</option>
                        <option value="Skillshare">Skillshare</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="certificateNo" className="block text-sm font-medium text-zinc-300">
                        Certificate No. <span className="text-red-500">*</span> <span className="text-zinc-500 text-xs">(Input the unique certificate number.)</span>
                    </label>
                    <input
                        type="text"
                        name="certificateNo"
                        id="certificateNo"
                        value={formData.certificateNo}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>
                <div>
                    <label htmlFor="certificateUrl" className="block text-sm font-medium text-zinc-300">
                        Certificate URL <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="url"
                        name="certificateUrl"
                        id="certificateUrl"
                        value={formData.certificateUrl}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="https://www.example.com/certificate/123"
                    />
                </div>
                <FileInput name="certificateFile" label="Certificate File" required={true} accept=".pdf,.jpg,.jpeg,.png" />
                <div>
                    <label htmlFor="educationLevel" className="block text-sm font-medium text-zinc-300">
                        Highest level of education completed <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="educationLevel"
                        id="educationLevel"
                        value={formData.educationLevel}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    >
                        <option value="">Select level</option>
                        <option value="High School">High School Diploma or GED</option>
                        <option value="Some College">Some College, no degree</option>
                        <option value="Associate">Associate Degree</option>
                        <option value="Bachelor">Bachelor's Degree</option>
                        <option value="Master">Master's Degree</option>
                        <option value="Doctorate">Doctorate or higher</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-zinc-300">
                        Country of residence <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="country"
                        id="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>
                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-zinc-300">
                        State of residence (if in USA)
                    </label>
                    <input
                        type="text"
                        name="state"
                        id="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-gray-700">
                <h2 className="text-2xl font-bold text-white">Availability & Technical Specs</h2>
                <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-zinc-300">
                        Are you available for up to 40 hours a week? <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="availability"
                        id="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    >
                        <option value="">Select an option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <FileInput name="computerSpecs" label="Computer Specifications Screenshot" required={true} accept=".pdf,.doc,.jpg,.jpeg,.png" />
                <div className="mt-1 text-xs text-zinc-500 space-y-2">
                    <p className="font-semibold">Windows Instructions:</p>
                    <ol className="list-decimal list-inside pl-2">
                        <li>Search for and navigate to "About Your PC".</li>
                        <li>Take a full, unedited screenshot showing Device Name, Processor, RAM, etc.</li>
                    </ol>
                    <p className="font-semibold">Mac Instructions:</p>
                    <ol className="list-decimal list-inside pl-2">
                        <li>Navigate to "About This Mac".</li>
                        <li>Take a full, unedited screenshot showing model, processor, memory, serial number, and macOS version.</li>
                    </ol>
                    <p className="font-bold text-red-400">NOTE: Edited or cropped screenshots will not be accepted.</p>
                </div>
                <FileInput name="internetSpeedScreenshot" label="Internet Speed Screenshot" required={true} accept=".pdf,.doc,.jpg,.jpeg,.png" />
                <div className="mt-1 text-xs text-zinc-500 space-y-2">
                    <ol className="list-decimal list-inside pl-2">
                        <li>Navigate to <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">speedtest.net</a>.</li>
                        <li>Click "GO" and wait for the test to complete.</li>
                        <li>Take a full, unedited screenshot of the results.</li>
                    </ol>
                    <p className="font-bold text-red-400">NOTE: Edited or cropped screenshots will not be accepted.</p>
                </div>
                <div>
                    <label htmlFor="languages" className="block text-sm font-medium text-zinc-300">
                        List all languages you're proficient in <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="languages"
                        id="languages"
                        value={formData.languages}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>
                <div>
                    <label htmlFor="weeklyHours" className="block text-sm font-medium text-zinc-300">
                        On average, how many hours per week are you available? <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="weeklyHours"
                        id="weeklyHours"
                        value={formData.weeklyHours}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="privacyPolicy"
                        id="privacyPolicy"
                        checked={formData.privacyPolicy}
                        onChange={handleChange}
                        required
                        className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-500 rounded bg-gray-800"
                    />
                    <label htmlFor="privacyPolicy" className="ml-2 block text-sm text-zinc-300">
                        I acknowledge that I've read and agree to the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Privacy Policy</a>. <span className="text-red-500">*</span>
                    </label>
                </div>
            </div>

            <div className="text-center pt-4">
                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 cursor-pointer"
                >
                    {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
            </div>
        </form>
    </div>
  );
};


const OpportunitiesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
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
  
  const handleCloseJobModal = () => {
    setSelectedJob(null);
    setShowApplicationForm(false);
  };

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
            className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg block mx-auto cursor-pointer"
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
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
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
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
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
              className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-cyan-400 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600/20 rounded-lg">
                  {React.createElement(job.icon, {
                    className: 'h-6 w-6 text-cyan-400',
                  })}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{job.title}</h2>
                  <div className="mt-2">
                    <span className="text-cyan-400 text-sm bg-cyan-900/30 px-3 py-1 rounded-full">
                      {job.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-cyan-300">{job.rate}</p>
                  <p className="text-sm text-zinc-400">{job.duration}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(job)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
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
            onClick={handleCloseJobModal}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-gray-800 max-w-3xl w-full rounded-xl p-8 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600/20 rounded-lg">
                  {React.createElement(selectedJob.icon, {
                    className: 'h-6 w-6 text-cyan-400',
                  })}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">{selectedJob.title}</h2>
                  <p className="text-cyan-400 mt-1">{selectedJob.category}</p>
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
                      <FaGlobe className="text-cyan-400 mt-1 h-4 w-4 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold">Remote work</p>
                        <p className="text-zinc-400 text-sm">Work from the comfort of your home</p>
                      </div>
                    </div>
                    <div className="bg-gray-900/40 p-3 rounded-xl flex items-start gap-2">
                      <FaClock className="text-cyan-400 mt-1 h-4 w-4 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold">Flexible hours</p>
                        <p className="text-zinc-400 text-sm">You set your schedule</p>
                      </div>
                    </div>
                    <div className="bg-gray-900/40 p-3 rounded-xl flex items-start gap-2">
                      <FaMoneyBillWave className="text-cyan-400 mt-1 h-4 w-4 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold">Weekly payouts</p>
                        <p className="text-zinc-400 text-sm">Get paid promptly every week</p>
                      </div>
                    </div>
                    <div className="bg-gray-900/40 p-3 rounded-xl flex items-start gap-2">
                      <FaLightbulb className="text-cyan-400 mt-1 h-4 w-4 flex-shrink-0" />
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
                          <div className="bg-gradient-to-r from-cyan-500 to-blue-600/20 p-3 rounded-full mb-2">
                            <step.icon className="h-6 w-6 text-cyan-400" />
                          </div>
                          <p className="text-white font-medium text-center max-w-[120px]">{step.text}</p>
                        </div>
                        {index < 3 && (
                          <div className="mx-2">
                            <FaArrowRight className="h-5 w-5 text-cyan-400 mx-4" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="md:hidden">
                    {[{ icon: FaFileAlt, text: 'Fill in your application' }, { icon: FaCheckCircle, text: 'Verify your details and certification' }, { icon: FaClipboardList, text: 'Pass a skills assessment or interview' }, { icon: FaRocket, text: 'Start working and earning!' }].map((step, index) => (
                      <div key={index} className="flex">
                        <div className="flex flex-col items-center mr-4">
                          <div className="bg-gradient-to-r from-cyan-500 to-blue-600/20 p-3 rounded-full mb-2">
                            <step.icon className="h-6 w-6 text-cyan-400" />
                          </div>
                          {index < 3 && (
                            <div className="flex-grow">
                              <FaArrowDown className="h-5 w-5 text-cyan-400 my-1" />
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
                <button onClick={handleCloseJobModal} className="px-4 py-2 text-zinc-300 hover:text-white transition-colors cursor-pointer">Close</button>
                <button onClick={() => setShowApplicationForm(true)} className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer">
                  Continue to Application
                  <FaCode className="text-sm" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {selectedJob && showApplicationForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-[60]"
            >
              <motion.div
                initial={{ opacity: 0.95, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900 w-full h-full flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-gray-700 flex justify-between items-center flex-shrink-0">
                    <h2 className="text-xl font-bold text-white">Apply for {selectedJob.title}</h2>
                    <button
                        onClick={() => setShowApplicationForm(false)}
                        className="text-zinc-400 hover:text-white transition-colors text-5xl font-light leading-none p-2 rounded-full hover:bg-gray-700 w-12 h-12 flex items-center justify-center"
                        aria-label="Close application form"
                    >
                        &times;
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto">
                  <ApplicationFormComponent jobTitle={selectedJob.title} />
                </div>
              </motion.div>
            </motion.div>
        )}

        <motion.div initial={{ scale: 0.9 }} whileInView={{ scale: 1 }} className="mt-20 text-center">
          <div className="bg-gray-800/30 p-8 rounded-2xl border border-cyan-400/20">
            <h2 className="text-3xl font-bold text-white mb-4">Not Seeing Your Expertise?</h2>
            <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
              We're constantly expanding our domains. Join our talent network to be notified of new opportunities matching your skills.
            </p>
            <a href="mailto:talent@cognitoai.io?subject=Talent%20Network%20Application&body=Please%20include%3A%0A-%20Your%20full%20name%0A-%20Areas%20of%20expertise%0A-%20Relevant%20experience%0A-%20Certifications%0A-%20Availability" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:scale-105 transition-transform inline-block cursor-pointer">
              Join Talent Network
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OpportunitiesPage;