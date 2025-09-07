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
  const [fileNames, setFileNames] = useState({
    resume: '',
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

    try {
      // Step 1: Get signed URLs and upload files
      const fileFields: (keyof typeof formData)[] = ['resume', 'computerSpecs', 'internetSpeedScreenshot'];
      const filepaths: { [key: string]: string } = {};

      for (const field of fileFields) {
        const file = formData[field];
        if (file instanceof File) {
          try {
            // Get signed URL from your API
            const signedUrlResponse = await axios.post('/api/storage/signed-url', {
              fileName: file.name,
              fileType: file.type,
            });

            const { signedUrl, path } = signedUrlResponse.data;

            // Upload file to signed URL
            await axios.put(signedUrl, file, {
              headers: { 'Content-Type': file.type },
            });

            filepaths[field] = path;

          } catch (error) {
            console.error(`Error uploading ${field}:`, error);
            throw new Error(`Failed to upload ${file.name}. Please try again.`);
          }
        }
      }

      // Step 2: Store form data (without files) and filepaths in localStorage
      const dataToStore: any = {};
      for (const key in formData) {
          if (!(formData[key as keyof typeof formData] instanceof File)) {
              dataToStore[key] = formData[key as keyof typeof formData];
          }
      }
      
      localStorage.setItem('applicationData', JSON.stringify({
          jobTitle,
          formData: dataToStore,
          filepaths,
      }));

      // Step 3: Initialize Paystack payment
      const paystackResponse = await axios.post('/api/paystack', {
          email: formData.email,
          amount: 500, // 500 KES
      });

      // Step 4: Redirect to Paystack
      if (paystackResponse.data.authorization_url) {
          window.location.href = paystackResponse.data.authorization_url;
      } else {
          setError('Could not initialize payment.');
          setSubmitting(false);
      }

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      setSubmitting(false);
    }
  };

  const FileInput = ({ name, label, required, accept }: { name: keyof typeof fileNames, label: string, required: boolean, accept: string }) => (
    <div>
      <label className="block text-sm font-medium text-zinc-100">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {fileNames[name] ? (
        <div className="mt-1 flex items-center">
          <span className="text-green-400">✓</span>
          <span className="ml-2 text-white">{fileNames[name]}</span>
          <button type="button" onClick={() => handleRemoveFile(name)} className="ml-4 text-red-400 hover:text-red-600">Remove</button>
        </div>
      ) : (
        <input
          type="file"
          name={name}
          id={name}
          onChange={handleFileChange}
          required={required}
          accept={accept}
          className="w-full text-zinc-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-900/50 file:text-white hover:file:bg-gray-800/50 file:cursor-pointer"
        />
      )}
      <p className="mt-1 text-xs text-zinc-500">Accepted file types: {accept}.</p>
    </div>
  );

  return (
    <div className="p-8">
        <p className="text-center text-zinc-400 mb-8">
            Please ensure all required fields marked with a red asterisk (<span className="text-red-500">*</span>) are completed. Missing or incomplete information may delay your application.
        </p>
        {error && (
            <div className="bg-red-900/50 border border-red-400 text-red-200 p-4 rounded-lg mb-6">
                {error}
            </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-zinc-100">
                        First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full bg-gray-900 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-zinc-100">
                        Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full bg-gray-900 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-100">
                    Email Address <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full bg-gray-900 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                />
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-zinc-100">
                    Phone
                </label>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-gray-900 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                />
            </div>
            <FileInput name="resume" label="Upload Resume" required={true} accept=".pdf,.doc,.docx" />

            <div className="space-y-6 pt-6 border-t border-gray-700">
                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-zinc-100">
                        Country of residence <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="country"
                        id="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full bg-gray-900 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                    />
                </div>
                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-zinc-100">
                        State of residence (if in USA)
                    </label>
                    <input
                        type="text"
                        name="state"
                        id="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="mt-1 block w-full bg-gray-900 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                    />
                </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-gray-700">
                <h2 className="text-2xl font-bold text-white">Availability & Technical Specs</h2>
                <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-zinc-100">
                        Are you available for up to 40 hours a week? <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="availability"
                        id="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full bg-gray-900 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
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
                        <li>Search for and navigate to &quot;About Your PC&quot;.</li>
                        <li>Take a full, unedited screenshot showing Device Name, Processor, RAM, etc.</li>
                    </ol>
                    <p className="font-semibold">Mac Instructions:</p>
                    <ol className="list-decimal list-inside pl-2">
                        <li>Navigate to &quot;About This Mac&quot;.</li>
                        <li>Take a full, unedited screenshot showing model, processor, memory, serial number, and macOS version.</li>
                    </ol>
                    <p className="font-bold text-red-400">NOTE: Edited or cropped screenshots will not be accepted.</p>
                </div>
                <FileInput name="internetSpeedScreenshot" label="Internet Speed Screenshot" required={true} accept=".pdf,.doc,.jpg,.jpeg,.png" />
                <div className="mt-1 text-xs text-zinc-500 space-y-2">
                    <ol className="list-decimal list-inside pl-2">
                        <li>Navigate to <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">speedtest.net</a>.</li>
                        <li>Click "GO" and wait for the test to complete.</li>
                        <li>Take a full, unedited screenshot of the results.</li>
                    </ol>
                    <p className="font-bold text-red-400">NOTE: Edited or cropped screenshots will not be accepted.</p>
                </div>
                <div>
                    <label htmlFor="languages" className="block text-sm font-medium text-zinc-100">
                        List all languages you&apos;re proficient in <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="languages"
                        id="languages"
                        value={formData.languages}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full bg-gray-900 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                    />
                </div>
                <div>
                    <label htmlFor="weeklyHours" className="block text-sm font-medium text-zinc-100">
                        On average, how many hours per week are you available? <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="weeklyHours"
                        id="weeklyHours"
                        value={formData.weeklyHours}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full bg-gray-900 border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
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
                        className="h-4 w-4 text-gray-500 focus:ring-gray-400 border-gray-500 rounded bg-gray-900"
                    />
                    <label htmlFor="privacyPolicy" className="ml-2 block text-sm text-zinc-100">
                        I acknowledge that I've read and agree to the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Privacy Policy</a>. <span className="text-red-500">*</span>
                    </label>
                </div>
            </div>

            <div className="text-center pt-4">
                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-white text-black font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 cursor-pointer hover:bg-gray-200"
                >
                    {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
            </div>
        </form>
    </div>
  );
};

const SuccessMessageComponent = () => {
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 10000); // Confetti lasts for 10 seconds
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-8">
            <div className="max-w-md">
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
                    <FaThumbsUp className="text-6xl text-green-300" />
                </motion.div>
                <h1 className="text-3xl font-bold text-center mb-4 text-white">Thank You!</h1>
                <div className="bg-green-900/50 border border-green-400 text-green-200 p-4 rounded-lg mb-8">
                    Application submitted successfully!
                </div>
                <a
                    href="/opportunities"
                    className="bg-white text-black font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 cursor-pointer hover:bg-gray-200"
                >
                    Back to Opportunities
                </a>
            </div>
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const submitFinalApplication = async (paymentReference: string) => {
        setIsProcessingPayment(true);
        const storedData = localStorage.getItem('applicationData');
        if (storedData) {
            const { jobTitle, formData, filepaths } = JSON.parse(storedData);
            
            const finalData = {
                ...formData,
                jobTitle,
                paymentReference,
                filepaths,
            };

            try {
                await axios.post('/api/apply', finalData);
                localStorage.removeItem('applicationData');
                setShowSuccess(true);
            } catch (err) {
                setError('Failed to submit application. Please contact support.');
                localStorage.removeItem('applicationData'); // Clear data on failure
            } finally {
                setIsProcessingPayment(false);
            }
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const paymentReference = urlParams.get('reference');
    const status = urlParams.get('status');

    if (paymentReference) {
        submitFinalApplication(paymentReference);
    } else if (status === 'success') {
        setShowSuccess(true);
        window.history.replaceState(null, '', '/opportunities');
    }
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

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
  }, [isClient]);
  
  const handleCloseJobModal = () => {
    setSelectedJob(null);
    setShowApplicationForm(false);
  };

  const categories = Array.from(new Set(jobs.map((job) => job.category)));
  const filteredJobs = selectedCategory
    ? jobs.filter((job) => job.category === selectedCategory)
    : jobs;

  if (loading || isSubmitting || isProcessingPayment) {
    let message = 'Loading opportunities...';
    if (isProcessingPayment) {
      message = 'Finalizing your application...';
    } else if (isSubmitting) {
      message = 'Submitting...';
    }

    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">
        {message}
      </div>
    );
  }

  if (showSuccess) {
      return <SuccessMessageComponent />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-300 text-xl max-w-md text-center p-6 bg-gray-900/50 rounded-xl">
          {error}
          <button
            onClick={() => window.location.href = '/opportunities'}
            className="mt-4 bg-white text-black px-4 py-2 rounded-lg block mx-auto cursor-pointer hover:bg-gray-200"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            AI Training Opportunities
          </h1>
          <p className="text-xl text-zinc-100 max-w-3xl mx-auto">
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
                ? 'bg-white text-black'
                : 'bg-gray-900 text-zinc-100 hover:bg-gray-800'
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
                  ? 'bg-white text-black'
                  : 'bg-gray-900 text-zinc-100 hover:bg-gray-800'
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
              className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-2xl border border-gray-500 hover:border-gray-400 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-800/20 rounded-lg">
                  {React.createElement(job.icon, {
                    className: 'h-6 w-6 text-gray-300',
                  })}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{job.title}</h2>
                  <div className="mt-2">
                    <span className="text-gray-300 text-sm bg-gray-700/30 px-3 py-1 rounded-full">
                      {job.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-200">{job.rate}</p>
                  <p className="text-sm text-zinc-100">{job.duration}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(job)}
                  className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer hover:bg-gray-200"
                >
                  Apply Now
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
              className="bg-gray-900 max-w-3xl w-full rounded-xl p-8 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-800/20 rounded-lg">
                  {React.createElement(selectedJob.icon, {
                    className: 'h-6 w-6 text-gray-300',
                  })}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">{selectedJob.title}</h2>
                  <p className="text-gray-300 mt-1">{selectedJob.category}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">About Trainova</h3>
                  <p className="text-zinc-100 leading-relaxed whitespace-pre-line">
                    {selectedJob.about_cognito_ai}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">About the Role</h3>
                  <p className="text-zinc-100 leading-relaxed whitespace-pre-line">
                    {selectedJob.about_the_role}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Responsibilities</h3>
                  <ul className="list-disc pl-6 space-y-2 text-zinc-100">
                    {selectedJob.responsibilities.map((item, i) => (
                      <li key={i} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Qualifications</h3>
                  <ul className="list-disc pl-6 space-y-2 text-zinc-100">
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
                      <FaGlobe className="text-gray-300 mt-1 h-4 w-4 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold">Remote work</p>
                        <p className="text-zinc-400 text-sm">Work from the comfort of your home</p>
                      </div>
                    </div>
                    <div className="bg-gray-900/40 p-3 rounded-xl flex items-start gap-2">
                      <FaClock className="text-gray-300 mt-1 h-4 w-4 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold">Flexible hours</p>
                        <p className="text-zinc-400 text-sm">You set your schedule</p>
                      </div>
                    </div>
                    <div className="bg-gray-900/40 p-3 rounded-xl flex items-start gap-2">
                      <FaMoneyBillWave className="text-gray-300 mt-1 h-4 w-4 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold">Weekly payouts</p>
                        <p className="text-zinc-400 text-sm">Get paid promptly every week</p>
                      </div>
                    </div>
                    <div className="bg-gray-900/40 p-3 rounded-xl flex items-start gap-2">
                      <FaLightbulb className="text-gray-300 mt-1 h-4 w-4 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold">Flex your expertise</p>
                        <p className="text-zinc-400 text-sm">Help shape the future of AI</p>
                      </div>
                    </div>
                  </div>
                  <div className="md:hidden">
                    {[{ icon: FaFileAlt, text: 'Fill in your application' }, { icon: FaCheckCircle, text: 'Verify your details and certification' }, { icon: FaClipboardList, text: 'Pass a skills assessment or interview' }, { icon: FaRocket, text: 'Start working and earning!' }].map((step, index) => (
                      <div key={index} className="flex">
                        <div className="flex flex-col items-center mr-4">
                          <div className="bg-gray-900/20 p-3 rounded-full mb-2">
                            <step.icon className="h-6 w-6 text-white" />
                          </div>
                          {index < 3 && (
                            <div className="flex-grow">
                              <FaArrowDown className="h-5 w-5 text-white my-1" />
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
                <button onClick={handleCloseJobModal} className="px-4 py-2 text-zinc-100 hover:text-zinc-100 transition-colors cursor-pointer">Close</button>
                <button onClick={() => setShowApplicationForm(true)} className="bg-white text-black px-6 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer hover:bg-gray-200">
                  Continue to Application
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
                className="bg-black w-full h-full flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-gray-700 flex justify-between items-center flex-shrink-0">
                    <h2 className="text-xl font-bold text-white">Apply for {selectedJob.title}</h2>
                    <button
                        onClick={() => setShowApplicationForm(false)}
                        className="text-zinc-200 hover:text-white transition-colors text-5xl font-light leading-none p-2 rounded-full hover:bg-gray-800 w-12 h-12 flex items-center justify-center cursor-pointer"
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
          <div className="bg-gray-900/30 p-8 rounded-2xl border border-gray-500/20">
            <h2 className="text-3xl font-bold text-white mb-4">Not Seeing Your Expertise?</h2>
            <p className="text-zinc-100 mb-6 max-w-xl mx-auto">
              We&apos;re constantly expanding our domains. Join our talent network to be notified of new opportunities matching your skills.
            </p>
            <a href="mailto:talent@trainova.io?subject=Talent%20Network%20Application&body=Please%20include%3A%0A-%20Your%20full%20name%0A-%20Areas%20of%20expertise%0A-%20Relevant%20experience%0A-%20Certifications%0A-%20Availability" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-8 py-3 rounded-lg hover:scale-105 transition-transform inline-block cursor-pointer hover:bg-gray-200">
              Join Talent Network
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OpportunitiesPage;