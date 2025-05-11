'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaNotesMedical, FaBrain, FaFlask, FaChartLine, FaShieldAlt, FaLanguage, FaMusic, FaPalette, FaBalanceScale, FaRobot, FaSeedling, FaSolarPanel, FaCloudRain, FaTractor, FaHeadset, FaGavel, FaSchool, FaPhone, FaThumbsUp, FaCalculator, FaCarBattery, FaBook, FaDna } from 'react-icons/fa';
import Link from 'next/link';
import { FaFlaskVial, FaMagnifyingGlassChart, FaMobileScreenButton, FaMoneyCheckDollar, FaScaleBalanced, FaWheatAwn } from 'react-icons/fa6';

const OpportunitiesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const jobListings = [
    {
      title: "AI Training Specialist – Healthcare & Life Sciences (Worldwide - Remote)",
      category: "Healthcare",
      icon: FaNotesMedical,
      description: "Help shape the future of medical AI by annotating, reviewing, and training models with accurate domain knowledge in healthcare, diagnostics, and life sciences.",
      requirements: [
        "Annotate and review biomedical and clinical datasets",
        "Provide feedback on AI-generated health content",
        "Collaborate with experts to refine life sciences taxonomies",
        "Background in healthcare, biology, or life sciences",
        "Familiarity with medical terminology",
        "Detail-oriented and comfortable with complex material"
      ],
      rate: "$45-$75/hr",
      duration: "contract"
    },
    {
      title: "AI Data Annotator – Environmental Impact & Sustainability (Worldwide - Remote)",
      category: "Environment",
      icon: FaSeedling,
      description: "Train AI models to understand climate data, sustainability reports, and environmental language.",
      requirements: [
        "Train models to detect sustainability goals and eco-impacts",
        "Label and structure environmental documents and datasets",
        "Experience in environmental science, climate policy, or sustainability",
        "Strong reading comprehension and critical analysis skills"
      ],
      rate: "$15-$25/hr",
      duration: "contract"
    },
    {
      title: " AI Model Trainer – Biomedical Research & Genomics (Worldwide - Remote)",
      category: "Biology",
      icon: FaNotesMedical,
      description: "Support the training of AI models in genetic analysis and research documentation.",
      requirements: [
        "Annotate genomic sequences, biomedical abstracts, and clinical trial data",
        "Collaborate with AI scientists to improve language understanding in genomics",
        "Evaluate and improve model-generated summaries of research",
        "Background in genomics, bioinformatics, or molecular biology",
        "Experience with academic/scientific writing"
      ],
      rate: "$45-$75/hr",
      duration: "contract"
    },
    {
      title: "AI Trainer – Renewable Energy Systems & Smart Grids (Worldwide - Remote)",
      category: "Environment",
      icon: FaSolarPanel,
      description: "Train AI to interpret data related to solar, wind, and energy grid systems.",
      requirements: [
        "Evaluate AI performance in energy modeling and grid optimization tasks",
        "Background in electrical engineering, energy systems, or environmental policy",
        "Label and curate data from renewable energy sources",
        "Provide insights into sector-specific terminology and logic",
        "Strong analytical skills"
      ],
      rate: "$25-$35/hr",
      duration: "contract"
    },
    {
      title: "AI Training Expert – Climate Science & Carbon Modeling (Worldwide - Remote)",
      category: "Environment",
      icon: FaCloudRain,
      description: "Contribute domain knowledge to help AI systems understand complex climate models.      ",
      requirements: [
        "Review and annotate climate data and scientific literature",
        "Guide AI understanding of emissions, carbon offsets, and impact scenarios",
        "Strong understanding of modeling techniques",
        "Provide technical and scientific feedback to improve AI accuracy"
      ],
      rate: "$15-$25/hr",
      duration: "contracts"
    },
    {
      title: "AI Annotation Analyst – Smart Farming & Precision Agriculture (Worldwide - Remote)",
      category: "Agriculture",
      icon: FaTractor,
      description: "Bring real-world agricultural expertise to AI models helping farmers increase yields and reduce waste.",
      requirements: [
        "Label agricultural images, drone data, and crop diagnostics",
        "Train AI to understand soil data, pest trends, and weather variables",
        "Review AI-generated agricultural advice for accuracy",
        "Practical understanding of modern farming practices"
      ],
      rate: "$10-$15/hr",
      duration: "contract"
    },
    {
      title: "AI Training Associate – Crop & Soil Intelligence (Worldwide - Remote)",
      category: "Agriculture",
      icon: FaWheatAwn,
      description: "Help develop AI models that optimize planting schedules and resource usage.",
      requirements: [
        "Annotate datasets on crop rotation, irrigation, and nutrient cycles",
        "Evaluate model output against known agricultural practices",
        "Train models on region-specific conditions and terminology",
        "Background in crop science, environmental science, or sustainable agriculture",
        "Familiarity with precision ag tools (a plus)"
      ],
      rate: "$10-$20/hr",
      duration: "contract"
    },
    {
      title: "Digital Marketing & Brand Strategy AI Data Trainer (Worldwide - Remote)",
      category: "Marketing",
      icon: FaMagnifyingGlassChart,
      description: "Guide AI to generate more effective marketing content aligned with brand voice and objectives.",
      requirements: [
        "Craft and optimize prompts for campaign generation",
        "Evaluate AI outputs for tone, accuracy, and conversion potential",
        "Experience in digital marketing, brand strategy, or content marketing",
        "Provide insights on current trends and consumer language",
        "Strong copywriting and creative thinking skills"
      ],
      rate: "$10-$15/hr",
      duration: "contracts"
    },
    {
      title: "AI Content Trainer – SEO & Copywriting Optimization (Worldwide - Remote)",
      category: "Marketing",
      icon: FaLanguage,
      description: "Refine AI writing capabilities in the areas of SEO, keywords, and performance-driven content.",
      requirements: [
        "Annotate blog content, landing pages, and metadata",
        "Test and improve AI SEO strategies and keyword placement",
        " Experience in SEO writing, digital content, or growth marketing",
        "Familiar with tools like SEMrush, Ahrefs, or Google Search Console",
        "Review AI-written content for engagement and clarity"
      ],
      rate: "$10-$15/hr",
      duration: "contract"
    },
    {
      title: "Finance AI Data Trainer (Worldwide - Remote)",
      category: "Finance",
      icon: FaMoneyCheckDollar,
      description: "Help train AI to understand finance reports, investment strategies, and risk models.",
      requirements: [
        "Annotate financial statements and economic indicators",
        "Validate AI-generated financial forecasts and risk assessments",
        "Background in finance, economics, or accounting",
        "Collaborate on model improvements using real-world finance logic"
      ],
      rate: "$25-$35/hr",
      duration: "contract"
    },
    {
      title: "Law Expert AI Data Trainer (Worldwide- Remote)",
      category: "Law",
      icon: FaScaleBalanced,
      description: "Train AI to better understand legal documents, policies, and compliance frameworks.",
      requirements: [
        "Annotate contracts, legal memos, and compliance documentation",
        "Validate AI-generated summaries of laws or policies",
        "Detail-oriented with strong reading comprehension",
        "Help align outputs with jurisdiction-specific requirements",
        "Experience in law, policy analysis, or legal writing"
      ],
      rate: "$25-$35/hr",
      duration: "contract"
    },
    {
      title: "Customer Support Expert AI Data Trainer (Worldwide- Remote)",
      category: "Support",
      icon: FaHeadset,
      description: "Improve chatbots and virtual assistants by training them to communicate clearly and empathetically.",
      requirements: [
        "Review chatbot conversations and suggest improvements",
        "Annotate intent, sentiment, and escalation logic",
        "Train AI to handle FAQs and nuanced customer issuess",
        "Background in customer service, communications, or call center operations",
        "Strong interpersonal and written communication skills"
      ],
      rate: "$20-$30/hr",
      duration: "contract"
    },
    {
      title: "AI Ethics Data Trainer – Bias, Fairness & Responsible AI Use (Worldwide- Remote)",
      category: "Ethics",
      icon: FaGavel,
      description: "Help make AI fairer by identifying biased or harmful outputs and training for inclusivity.",
      requirements: [
        "Review and flag bias in AI responses",
        "Annotate datasets for fairness, representation, and inclusivity",
        "Collaborate with product and ethics teams to improve models",
        "Awareness of DEI principles and responsible AI standards",
        "Background in ethics, sociology, or social sciences"
      ],
      rate: "$45-$60/hr",
      duration: "contract"
    },
    {
      title: "Creative Writing Expert AI Data Trainer",
      category: "Writing",
      icon: FaPalette,
      description: "Train AI models to write more like humans; compelling, imaginative, and emotionally engaging.",
      requirements: [
        "Provide feedback on AI-generated narratives, dialogue, and plot structure",
        "Annotate character arcs, tone, and literary devices",
        "Help shape creative prompts and genre-based outputs"
      ],
      rate: "$15-$30/hr",
      duration: "contract"
    },
    {
      title: "Business Expert AI Data Trainer (Worldwide - Remote)",
      category: "Finance",
      icon: FaChartLine,
      description: "Train business AI with your strategy, operations, and management expertise.",
      requirements: [
        "Review AI-generated business content for accuracy, clarity, and relevance",
        "Annotate business datasets, documents, and scenarios for training purposes",
        "Professional experience in business, consulting, entrepreneurship, finance, operations, or a related field",
        "Strong written communication and critical thinking skills"
      ],
      rate: "$40-$60/hr",
      duration: "contract"
    },
    {
      title: "Music Expert AI Data Trainer (Worldwide - Remote)",
      category: "Music",
      icon: FaMusic,
      description: "Help refine AI models in music generation. ",
      requirements: [
        "Strong listening and critical analysis skills",
        "DAW proficiency",
        "Cross-genre expertise"
      ],
      rate: "$20-$30/hr",
      duration: "contract"
    },
    {
      title: "AI Data Trainer – Educational Content & Curriculum Design (Worldwide - Remote)",
      category: "Writing",
      icon: FaSchool,
      description: "Ensure AI systems provide accurate and age-appropriate educational material across subjects.",
      requirements: [
        "Annotate lessons, quizzes, and instructional materials",
        "Review AI-generated tutoring content for clarity and accuracy",
        "Map content to educational standards and grade levels"
      ],
      rate: "$45-$60/hr",
      duration: "contract"
    },
    {
      title: "AI Data Trainer – Social Media Trends & Moderation (Worldwide - Remote)",
      category: "Social Media",
      icon: FaMobileScreenButton,
      description: "Teach AI to understand slang, trends, and moderation cues across major platforms.",
      requirements: [
        "Label viral content, memes, hashtags, and platform-specific slang",
        "Help train moderation models to flag toxic or inappropriate content",
        "Familiarity with platforms like TikTok, Instagram, X, Reddit e.t.c",
        "Strong sense of online communities and digital culture",
        "Keep AI models aligned with evolving social norms and pop culture"
      ],
      rate: "$30-$40/hr",
      duration: "contract"
    },
    {
      title: "AI Content Curator – Memes, Pop Culture & Internet Language (Worldwide - Remote)",
      category: "Social Media",
      icon: FaThumbsUp,
      description: "Guide AI in interpreting the humor, references, and nuance of internet culture.",
      requirements: [
        "Label and explain memes, cultural references, and inside jokes",
        "Help fine-tune generative models for humor and tone",
        "Provide feedback on AI outputs across diverse subcultures",
        "Deep understanding of internet trends, niche communities, and meme formats",
        "Strong writing and communication skills"
      ],
      rate: "$50-$70/hr",
      duration: "contract"
    },
    {
      title: "Cybersecurity AI Developer (Worldwide - Remote)",
      category: "Cybersecurity",
      icon: FaShieldAlt,
      description: "Train AI threat detection systems",
      requirements: [
        "CISSP certification",
        "Pen testing experience",
        "ML security expertise"
      ],
      rate: "$100-$175/hr",
      duration: "contract"
    },
    {
      title: "Mathematics Expert AI Data Trainer (Worldwide - Remote)",
      category: "Math",
      icon: FaCalculator,
      description: "Train cutting-edge AI models to understand and solve complex mathematical problems.",
      requirements: [
        "Strong background in mathematics (academic or applied)",
        "Bachelor’s degree or higher in Mathematics, Applied Math, Engineering, or related field",
        "Experience in teaching, tutoring, or technical writing is a plus",
        "Ability to explain and evaluate step-by-step solutions",
        "Detail-oriented and comfortable working independently"
      ],
      rate: "$60-$75/hr",
      duration: "contract"
    },
    {
      title: "Physics Expert AI Data Trainer (Worldwide - Remote)",
      category: "Physics",
      icon: FaCarBattery,
      description: "Help train AI to reason through complex physics problems across classical and modern domains.",
      requirements: [
        "Bachelor’s degree or higher in Physics, Engineering, or a related field",
        "Strong understanding of theoretical and applied physics",
        "Experience in teaching, tutoring, or academic writing (preferred)",
        "Detail-oriented with clear analytical and communication skills"
      ],
      rate: "$60-$85/hr",
      duration: "contract"
    },
    {
      title: "History Expert AI Data Trainer (Worldwide - Remote)",
      category: "History",
      icon: FaBook,
      description: "Train AI to understand and analyze historical events, timelines, and narratives with accuracy and context.",
      requirements: [
        "Review and annotate historical texts, timelines, and AI-generated content",
        "Bachelor’s degree or higher in History, Political Science, or a related field",
        "Ensure factual accuracy and contextual relevance across global history topics",
        "Strong critical thinking and historical analysis skills",
        "Experience with academic writing or teaching is a plus"
      ],
      rate: "$50-$60/hr",
      duration: "contract"
    },
    {
      title: "Biology Expert AI Data Trainer (Worldwide - Remote)",
      category: "Biology",
      icon: FaDna,
      description: "Help train AI to understand biological systems, terminology, and problem-solving across a range of life sciences.",
      requirements: [
        "Review and annotate AI-generated biology content and explanations",
        "Bachelor’s degree or higher in Biology, Life Sciences, or a related field",
        "Ensure scientific accuracy across subjects like cell biology, genetics, physiology, and ecology",
        "Strong foundation in biological concepts and terminology",
        "Experience in teaching, tutoring, or academic writing is a plus"
      ],
      rate: "$50-$60/hr",
      duration: "contract"
    },
    {
      title: "Chemistry Expert AI Data Trainer (Worldwide - Remote)",
      category: "Chemistry",
      icon: FaFlaskVial,
      description: "Train AI to accurately understand and generate chemistry-related content across theoretical and practical domains.",
      requirements: [
        "Ensure scientific accuracy and clarity in chemical equations, explanations, and problem sets",
        "Bachelor’s degree or higher in Chemistry, Chemical Engineering, or a related field",
        "Strong grasp of chemical principles, lab practices, and technical terminology",
        "Review and annotate AI outputs on topics such as organic, inorganic, physical, and analytical chemistry",
        "Teaching, tutoring, or academic writing experience is a plus"
      ],
      rate: "$50-$60/hr",
      duration: "contract"
    },
    {
      title: "Coding Expert AI Data Trainer (Worldwide - Remote)",
      category: "Coding",
      icon: FaFlaskVial,
      description: "Help train AI to write, debug, and understand code across real-world programming tasks.",
      requirements: [
        "Review and annotate code in languages like Python, JavaScript, Java, C++, etc.",
        "Degree in Computer Science, IT, ICT, or equivalent hands-on experience",
        "Evaluate AI-generated solutions, debug logic, and improve code clarity",
        "Self-taught developers with strong portfolios are welcome",
        "Provide context around programming concepts, best practices, and performance",
        "Proficiency in one or more programming languages",
        "Experience in teaching, tutoring, or code review is a plus"
      ],
      rate: "$50-$60/hr",
      duration: "contract"
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
            className={`px-6 py-2 rounded-full cursor-pointer ${
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
                <a
                  href="https://forms.gle/fACNFy3vMSc5AU857"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  Apply Now
                  <FaCode className="text-sm" />
                </a>
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
    <a
      href="mailto:talent@cognitoai.io?subject=Talent%20Network%20Application&body=Please%20include%3A%0A-%20Your%20full%20name%0A-%20Areas%20of%20expertise%0A-%20Relevant%20experience%0A-%20Certifications%0A-%20Availability"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:scale-105 transition-transform inline-block cursor-pointer"
    >
      Join Talent Network
    </a>
  </div>
</motion.div>

      </div>
    </div>
  );
};

export default OpportunitiesPage;