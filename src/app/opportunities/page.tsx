'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaBrain, FaFlask, FaChartLine, FaShieldAlt, FaLanguage, FaMusic, FaPalette, FaBalanceScale, FaRobot } from 'react-icons/fa';
import Link from 'next/link';

const OpportunitiesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const jobListings = [
    {
      title: "Natural Language Processing Specialist",
      category: "NLP",
      icon: FaLanguage,
      description: "Train cutting-edge language models on multilingual datasets",
      requirements: [
        "Advanced degree in Linguistics/Computational Linguistics",
        "Experience with semantic analysis",
        "Fluency in 3+ languages"
      ],
      rate: "$45-$75/hr",
      duration: "6-12 month projects"
    },
    {
      title: "Computer Vision Engineer",
      category: "Computer Vision",
      icon: FaRobot,
      description: "Develop image recognition systems for medical diagnostics",
      requirements: [
        "PhD in Computer Vision/ML",
        "TensorFlow/PyTorch expertise",
        "Medical imaging experience"
      ],
      rate: "$85-$120/hr",
      duration: "1+ year engagement"
    },
    {
      title: "AI Ethics Auditor",
      category: "Ethics",
      icon: FaBalanceScale,
      description: "Ensure ethical AI development through rigorous testing",
      requirements: [
        "Law/Philosophy background",
        "Bias detection expertise",
        "Technical documentation skills"
      ],
      rate: "$65-$90/hr",
      duration: "Ongoing contracts"
    },
    {
      title: "Healthcare AI Trainer",
      category: "Healthcare",
      icon: FaShieldAlt,
      description: "Annotate medical data for diagnostic AI systems",
      requirements: [
        "MD or Nursing qualification",
        "3+ years clinical experience",
        "HIPAA certification"
      ],
      rate: "$95-$150/hr",
      duration: "Project-based"
    },
    {
      title: "Creative Writing AI Coach",
      category: "Creative Writing",
      icon: FaPalette,
      description: "Develop narrative structures for generative AI",
      requirements: [
        "Published writing portfolio",
        "Genre fiction expertise",
        "MA in Creative Writing"
      ],
      rate: "$35-$60/hr",
      duration: "Flexible hours"
    },
    {
      title: "Financial AI Modeler",
      category: "Finance",
      icon: FaChartLine,
      description: "Train predictive models for market analysis",
      requirements: [
        "CFA/FRM certification",
        "Quantitative analysis background",
        "Python/R proficiency"
      ],
      rate: "$120-$200/hr",
      duration: "6+ month contracts"
    },
    {
      title: "Music Composition AI Expert",
      category: "Music",
      icon: FaMusic,
      description: "Curate musical datasets for generative AI",
      requirements: [
        "Music theory PhD",
        "DAW proficiency",
        "Cross-genre expertise"
      ],
      rate: "$50-$80/hr",
      duration: "Ongoing"
    },
    {
      title: "Climate Science AI Specialist",
      category: "Climate Science",
      icon: FaFlask,
      description: "Develop predictive climate models",
      requirements: [
        "Atmospheric science PhD",
        "Big data experience",
        "Python/MATLAB skills"
      ],
      rate: "$75-$110/hr",
      duration: "12+ month project"
    },
    {
      title: "Legal Document AI Trainer",
      category: "Legal",
      icon: FaBalanceScale,
      description: "Structure legal frameworks for contract AI",
      requirements: [
        "JD required",
        "5+ years practice experience",
        "Multijurisdictional knowledge"
      ],
      rate: "$90-$140/hr",
      duration: "Case-based"
    },
    {
      title: "Neuroscience AI Researcher",
      category: "Neuroscience",
      icon: FaBrain,
      description: "Model neural networks for cognitive AI",
      requirements: [
        "Neuroscience PhD",
        "fMRI analysis experience",
        "ML implementation skills"
      ],
      rate: "$80-$130/hr",
      duration: "Research grants"
    },
    {
      title: "Cybersecurity AI Developer",
      category: "Cybersecurity",
      icon: FaShieldAlt,
      description: "Train AI threat detection systems",
      requirements: [
        "CISSP certification",
        "Pen testing experience",
        "ML security expertise"
      ],
      rate: "$100-$175/hr",
      duration: "Confidential contracts"
    }
  ];

  const filteredJobs = selectedCategory 
    ? jobListings.filter(job => job.category === selectedCategory)
    : jobListings;

  const categories = Array.from(new Set(jobListings.map(job => job.category)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
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

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-12 flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full ${
              !selectedCategory 
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-zinc-300 hover:bg-gray-700'
            }`}
          >
            All Domains
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full flex items-center gap-2 ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-zinc-300 hover:bg-gray-700'
              }`}
            >
              <span>{category}</span>
            </button>
          ))}
        </motion.div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-purple-400 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <job.icon className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{job.title}</h2>
                  <p className="text-purple-400">{job.category}</p>
                </div>
              </div>

              <p className="text-zinc-300 mb-6">{job.description}</p>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-zinc-400 mb-2">Requirements:</h3>
                <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                  {job.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-sm text-zinc-400">{job.rate}</p>
                  <p className="text-sm text-zinc-400">{job.duration}</p>
                </div>
                <Link
                  href={`/apply/${job.title.toLowerCase().replace(/ /g, '-')}`}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  Apply Now
                  <FaCode className="text-sm" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          className="mt-20 text-center"
        >
          <div className="bg-gray-800/30 p-8 rounded-2xl border border-purple-400/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Not Seeing Your Expertise?
            </h2>
            <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
              We're constantly expanding our domains. Join our talent network to be notified
              of new opportunities matching your skills.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:scale-105 transition-transform">
              Join Talent Network
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OpportunitiesPage;