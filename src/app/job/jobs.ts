
import { IconType } from "react-icons";
import {
  FaNotesMedical, FaSeedling, FaSolarPanel, FaCloudRain, FaTractor, FaLanguage, FaHeadset,
  FaGavel, FaPalette, FaChartLine, FaMusic, FaSchool,
  FaThumbsUp, FaShieldAlt, FaCalculator, FaCarBattery, FaBook, FaDna, FaCode
} from 'react-icons/fa';
import { FaFlaskVial, FaMagnifyingGlassChart, FaMobileScreenButton, FaMoneyCheckDollar, FaScaleBalanced, FaWheatAwn } from 'react-icons/fa6';

export interface Job {
  title: string;
  category: string;
  icon: IconType;
  rate: string;
  duration: string;
  description: string;
  requirements: string[];
  qualifications: string[];
}

export const jobListings: Job[] = [
  {
    title: "AI Training Specialist – Healthcare & Life Sciences (Worldwide - Remote)",
    category: "Healthcare",
    icon: FaNotesMedical,
    rate: "$45-$75/hr",
    duration: "contract",
    description: "Train AI models in healthcare diagnostics and medical research applications. Work with clinical data and medical imaging systems.",
    requirements: [
      "Advanced degree in Medicine or Life Sciences",
      "5+ years clinical/research experience",
      "Familiarity with AI/ML concepts in healthcare"
    ],
    qualifications: [
      "Medical board certification",
      "Published research papers",
      "Experience with medical AI systems"
    ]
  },
  {
    title: "AI Data Annotator – Environmental Impact & Sustainability (Worldwide - Remote)",
    category: "Environment",
    icon: FaSeedling,
    rate: "$15-$25/hr",
    duration: "contract",
    description: "Annotate and validate environmental data for climate prediction models and sustainability initiatives.",
    requirements: [
      "Background in Environmental Science",
      "Understanding of climate datasets",
      "Attention to detail"
    ],
    qualifications: [
      "Certification in sustainability studies",
      "GIS software experience",
      "Carbon accounting knowledge"
    ]
  },
  {
    title: "AI Model Trainer – Biomedical Research & Genomics (Worldwide - Remote)",
    category: "Biology",
    icon: FaNotesMedical,
    rate: "$45-$75/hr",
    duration: "contract",
    description: "Develop training protocols for AI systems in genomic analysis and drug discovery.",
    requirements: [
      "PhD in Molecular Biology or related field",
      "Experience with genomic datasets",
      "Understanding of ML pipelines"
    ],
    qualifications: [
      "Published in peer-reviewed journals",
      "CRISPR technology experience",
      "Bioinformatics certification"
    ]
  },
  {
    title: "AI Trainer – Renewable Energy Systems & Smart Grids (Worldwide - Remote)",
    category: "Environment",
    icon: FaSolarPanel,
    rate: "$25-$35/hr",
    duration: "contract",
    description: "Optimize AI models for energy grid management and renewable resource allocation.",
    requirements: [
      "Electrical Engineering background",
      "Knowledge of smart grid technologies",
      "2+ years energy sector experience"
    ],
    qualifications: [
      "Certified Energy Manager",
      "SCADA system experience",
      "Renewable energy certifications"
    ]
  },
  {
    title: "AI Training Expert – Climate Science & Carbon Modeling (Worldwide - Remote)",
    category: "Environment",
    icon: FaCloudRain,
    rate: "$15-$25/hr",
    duration: "contract",
    description: "Refine climate prediction models through expert data validation and feedback loops.",
    requirements: [
      "Meteorology/Climatology degree",
      "Python programming skills",
      "Understanding of IPCC reports"
    ],
    qualifications: [
      "Published climate research",
      "CMIP6 model experience",
      "Carbon credit market knowledge"
    ]
  },
  {
    title: "AI Annotation Analyst – Smart Farming & Precision Agriculture (Worldwide - Remote)",
    category: "Agriculture",
    icon: FaTractor,
    rate: "$10-$15/hr",
    duration: "contract",
    description: "Label agricultural data for AI systems optimizing crop yields and farm operations.",
    requirements: [
      "Agriculture background",
      "Understanding of IoT sensors",
      "Basic data entry skills"
    ],
    qualifications: [
      "Precision ag certification",
      "Drone operation license",
      "Soil science knowledge"
    ]
  },
  {
    title: "AI Training Associate – Crop & Soil Intelligence (Worldwide - Remote)",
    category: "Agriculture",
    icon: FaWheatAwn,
    rate: "$10-$20/hr",
    duration: "contract",
    description: "Develop training datasets for AI-powered crop monitoring systems.",
    requirements: [
      "Agronomy background",
      "Understanding of satellite imagery",
      "Attention to detail"
    ],
    qualifications: [
      "NDVI interpretation skills",
      "Crop rotation expertise",
      "Soil chemistry knowledge"
    ]
  },
  {
    title: "Digital Marketing & Brand Strategy AI Data Trainer (Worldwide - Remote)",
    category: "Marketing",
    icon: FaMagnifyingGlassChart,
    rate: "$10-$15/hr",
    duration: "contract",
    description: "Train AI models on brand positioning and digital marketing strategies.",
    requirements: [
      "5+ years marketing experience",
      "Understanding of SEO/SEM",
      "Social media expertise"
    ],
    qualifications: [
      "Google Analytics certified",
      "AdWords certification",
      "Campaign case studies"
    ]
  },
  {
    title: "AI Content Trainer – SEO & Copywriting Optimization (Worldwide - Remote)",
    category: "Marketing",
    icon: FaLanguage,
    rate: "$10-$15/hr",
    duration: "contract",
    description: "Optimize AI content generation systems for SEO effectiveness and brand voice.",
    requirements: [
      "Professional copywriting experience",
      "Deep SEO knowledge",
      "Portfolio of work"
    ],
    qualifications: [
      "Google SEO certification",
      "Content marketing awards",
      "Multilingual capabilities"
    ]
  },
  {
    title: "Finance AI Data Trainer (Worldwide - Remote)",
    category: "Finance",
    icon: FaMoneyCheckDollar,
    rate: "$25-$35/hr",
    duration: "contract",
    description: "Train financial AI models on market analysis and risk assessment.",
    requirements: [
      "CFA/CPA certification",
      "5+ years finance experience",
      "Understanding of fintech"
    ],
    qualifications: [
      "Bloomberg Terminal expertise",
      "FRM certification",
      "Algorithmic trading knowledge"
    ]
  },
  {
    title: "Law Expert AI Data Trainer (Worldwide- Remote)",
    category: "Law",
    icon: FaScaleBalanced,
    rate: "$25-$35/hr",
    duration: "contract",
    description: "Train legal AI systems on case law analysis and contract review.",
    requirements: [
      "Juris Doctor degree",
      "Active law license",
      "5+ years practice"
    ],
    qualifications: [
      "Specialized legal expertise",
      "Legal tech experience",
      "Published legal papers"
    ]
  },
  {
    title: "Customer Support Expert AI Data Trainer (Worldwide- Remote)",
    category: "Support",
    icon: FaHeadset,
    rate: "$20-$30/hr",
    duration: "contract",
    description: "Develop training data for AI customer service chatbots and support systems.",
    requirements: [
      "3+ years support experience",
      "Zendesk/ServiceNow expertise",
      "Multilingual abilities"
    ],
    qualifications: [
      "CRM certification",
      "CX design experience",
      "Troubleshooting guides authored"
    ]
  },
  {
    title: "AI Ethics Data Trainer – Bias, Fairness & Responsible AI Use (Worldwide- Remote)",
    category: "Ethics",
    icon: FaGavel,
    rate: "$45-$60/hr",
    duration: "contract",
    description: "Ensure ethical AI development through bias detection and fairness training.",
    requirements: [
      "Philosophy/Ethics advanced degree",
      "AI ethics research background",
      "Understanding of ML fairness"
    ],
    qualifications: [
      "Published ethics papers",
      "FAT* conference participation",
      "Algorithmic audit experience"
    ]
  },
  {
    title: "Creative Writing Expert AI Data Trainer",
    category: "Writing",
    icon: FaPalette,
    rate: "$15-$30/hr",
    duration: "contract",
    description: "Refine AI creative writing capabilities across multiple genres and styles.",
    requirements: [
      "Published author",
      "Creative writing degree",
      "Portfolio of work"
    ],
    qualifications: [
      "Writing awards",
      "Genre specialization",
      "Scriptwriting experience"
    ]
  },
  {
    title: "Business Expert AI Data Trainer (Worldwide - Remote)",
    category: "Finance",
    icon: FaChartLine,
    rate: "$40-$60/hr",
    duration: "contract",
    description: "Train AI models on business strategy and market analysis.",
    requirements: [
      "MBA or equivalent",
      "10+ years exec experience",
      "Case study development"
    ],
    qualifications: [
      "Top-tier consulting background",
      "Exit experience",
      "Business modeling expertise"
    ]
  },
  {
    title: "Music Expert AI Data Trainer (Worldwide - Remote)",
    category: "Music",
    icon: FaMusic,
    rate: "$20-$30/hr",
    duration: "contract",
    description: "Develop AI music composition systems across genres and styles.",
    requirements: [
      "Formal music training",
      "Music production experience",
      "Understanding of music theory"
    ],
    qualifications: [
      "Published compositions",
      "DAW expertise",
      "Music copyright knowledge"
    ]
  },
  {
    title: "AI Data Trainer – Educational Content & Curriculum Design (Worldwide - Remote)",
    category: "Writing",
    icon: FaSchool,
    rate: "$45-$60/hr",
    duration: "contract",
    description: "Train AI systems on pedagogical approaches and curriculum development.",
    requirements: [
      "Education degree",
      "Curriculum design experience",
      "Understanding of learning theories"
    ],
    qualifications: [
      "Teaching license",
      "Edtech experience",
      "Published educational materials"
    ]
  },
  {
    title: "AI Data Trainer – Social Media Trends & Moderation (Worldwide - Remote)",
    category: "Social Media",
    icon: FaMobileScreenButton,
    rate: "$30-$40/hr",
    duration: "contract",
    description: "Train AI models to understand social media dynamics and content moderation policies.",
    requirements: [
      "3+ years social media management",
      "Platform guidelines expertise",
      "Internet culture knowledge"
    ],
    qualifications: [
      "Content moderation tools experience",
      "Multilingual capabilities",
      "Crisis management training"
    ]
  },
  {
    title: "AI Content Curator – Memes, Pop Culture & Internet Language (Worldwide - Remote)",
    category: "Social Media",
    icon: FaThumbsUp,
    rate: "$50-$70/hr",
    duration: "contract",
    description: "Curate and annotate internet culture data for AI comprehension systems.",
    requirements: [
      "Deep meme culture knowledge",
      "Linguistics background",
      "Trend forecasting experience"
    ],
    qualifications: [
      "Viral content creation",
      "Sociolinguistics research",
      "Multilingual meme expertise"
    ]
  },
  {
    title: "Cybersecurity AI Developer (Worldwide - Remote)",
    category: "Cybersecurity",
    icon: FaShieldAlt,
    rate: "$100-$175/hr",
    duration: "contract",
    description: "Develop AI-powered cybersecurity threat detection systems.",
    requirements: [
      "10+ years security experience",
      "CEH/CISSP certification",
      "ML security expertise"
    ],
    qualifications: [
      "Zero-day discovery",
      "MITRE ATT&CK knowledge",
      "Reverse engineering skills"
    ]
  },
  {
    title: "Mathematics Expert AI Data Trainer (Worldwide - Remote)",
    category: "Math",
    icon: FaCalculator,
    rate: "$60-$75/hr",
    duration: "contract",
    description: "Train AI systems on advanced mathematical problem-solving and proof validation.",
    requirements: [
      "PhD in Mathematics",
      "Research publications",
      "Mathematical logic expertise"
    ],
    qualifications: [
      "Fields medal consideration",
      "Math Olympiad medals",
      "Theorem proof experience"
    ]
  },
  {
    title: "Physics Expert AI Data Trainer (Worldwide - Remote)",
    category: "Physics",
    icon: FaCarBattery,
    rate: "$60-$85/hr",
    duration: "contract",
    description: "Develop physics simulation training data for AI systems.",
    requirements: [
      "PhD in Physics",
      "Computational physics experience",
      "ML in physics knowledge"
    ],
    qualifications: [
      "Particle physics research",
      "Quantum computing knowledge",
      "Published papers in top journals"
    ]
  },
  {
    title: "History Expert AI Data Trainer (Worldwide - Remote)",
    category: "History",
    icon: FaBook,
    rate: "$50-$60/hr",
    duration: "contract",
    description: "Train AI models on historical analysis and contextual understanding.",
    requirements: [
      "History PhD",
      "Archival research experience",
      "Historiography knowledge"
    ],
    qualifications: [
      "Published historical works",
      "Ancient languages proficiency",
      "Museum curation experience"
    ]
  },
  {
    title: "Biology Expert AI Data Trainer (Worldwide - Remote)",
    category: "Biology",
    icon: FaDna,
    rate: "$50-$60/hr",
    duration: "contract",
    description: "Develop training protocols for biological AI applications.",
    requirements: [
      "PhD in Biology",
      "Lab research experience",
      "Bioinformatics skills"
    ],
    qualifications: [
      "CRISPR expertise",
      "Peer-reviewed publications",
      "Field research experience"
    ]
  },
  {
    title: "Chemistry Expert AI Data Trainer (Worldwide - Remote)",
    category: "Chemistry",
    icon: FaFlaskVial,
    rate: "$50-$60/hr",
    duration: "contract",
    description: "Train AI models on chemical interactions and material science.",
    requirements: [
      "PhD in Chemistry",
      "Lab management experience",
      "Computational chemistry knowledge"
    ],
    qualifications: [
      "Patent filings",
      "Mass spectrometry expertise",
      "Polymer science specialization"
    ]
  },
  {
    title: "Coding Expert AI Data Trainer (Worldwide - Remote)",
    category: "Coding",
    icon: FaCode,
    rate: "$50-$60/hr",
    duration: "contract",
    description: "Develop programming training data for AI code generation systems.",
    requirements: [
      "10+ years coding experience",
      "Multiple language proficiency",
      "Software architecture knowledge"
    ],
    qualifications: [
      "Open source contributions",
      "Programming competition wins",
      "Security audit experience"
    ]
  }
];