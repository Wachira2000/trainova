'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiClock, FiTag } from 'react-icons/fi';
import Image from 'next/image';

const BlogPage = () => {
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  const blogPosts = [
    {
      title: "The Evolution of Human-AI Collaboration in Model Training",
      date: "March 15, 2024",
      category: "AI Development",
      image: "/blog/ai-evolution.jpg",
      content: `
        <h2 class="text-2xl font-bold text-white mb-4">Redefining Expertise in the AI Era</h2>
        <p class="text-zinc-300 mb-6">The synergy between human expertise and machine learning has entered a transformative phase. Recent advancements in...</p>
        
        <div class="bg-gray-800/30 p-6 rounded-xl mb-6">
          <h3 class="text-xl font-semibold text-purple-400 mb-3">Key Developments</h3>
          <ul class="list-disc pl-6 space-y-2 text-zinc-300">
            <li>Hybrid training architectures combining human feedback loops</li>
            <li>Adaptive learning rate systems based on expert performance</li>
            <li>Cross-domain knowledge transfer frameworks</li>
          </ul>
        </div>

        <h3 class="text-xl font-semibold text-white mt-8 mb-4">Case Study: Medical Diagnosis Models</h3>
        <p class="text-zinc-300 mb-6">Our team collaborated with Johns Hopkins researchers to develop... <br/><br/>
        <strong>Results:</strong> 42% improvement in rare disease identification accuracy</p>
      `,
      readTime: "8 min read"
    },
    {
      title: "Ethical AI: Implementing Human-Centric Validation Frameworks",
      date: "March 10, 2024",
      category: "AI Ethics",
      image: "/blog/ai-ethics.jpg",
      content: `
        <h2 class="text-2xl font-bold text-white mb-4">Building Accountability into Machine Learning</h2>
        <p class="text-zinc-300 mb-6">As AI systems become more autonomous, the need for robust ethical validation...</p>

        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="bg-gray-800/30 p-6 rounded-xl">
            <h3 class="text-purple-400 mb-2">Core Principles</h3>
            <ul class="list-disc pl-6 space-y-2 text-zinc-300">
              <li>Transparency in decision pathways</li>
              <li>Bias detection at multiple network layers</li>
              <li>Human veto protocols</li>
            </ul>
          </div>
          <div class="bg-gray-800/30 p-6 rounded-xl">
            <h3 class="text-purple-400 mb-2">Implementation Metrics</h3>
            <ul class="list-disc pl-6 space-y-2 text-zinc-300">
              <li>93% reduction in biased outputs</li>
              <li>67% faster anomaly detection</li>
              <li>100% audit-ready systems</li>
            </ul>
          </div>
        </div>
      `,
      readTime: "6 min read"
    },
    {
      title: "Breaking Language Barriers: Next-Gen Multimodal Translation Systems",
      date: "March 5, 2024",
      category: "NLP",
      image: "/blog/language-tech.jpg",
      content: `
        <h2 class="text-2xl font-bold text-white mb-4">Beyond Text: Context-Aware Translation</h2>
        <p class="text-zinc-300 mb-6">Our latest language models now incorporate...</p>

        <div class="bg-gray-800/30 p-6 rounded-xl mb-6">
          <h3 class="text-xl font-semibold text-purple-400 mb-3">Technical Breakthroughs</h3>
          <table class="w-full text-zinc-300">
            <thead>
              <tr class="border-b border-gray-700">
                <th class="py-2">Feature</th>
                <th class="py-2">Improvement</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-700">
                <td class="py-3">Cultural Context Recognition</td>
                <td class="py-3">+57% accuracy</td>
              </tr>
              <tr>
                <td class="py-3">Real-Time Multimodal Processing</td>
                <td class="py-3">1.2s response time</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      readTime: "7 min read"
    },
    {
      title: "The Future of Work: Human-AI Hybrid Teams",
      date: "February 28, 2024",
      category: "Future Trends",
      image: "/blog/future-work.jpg",
      content: `
        <h2 class="text-2xl font-bold text-white mb-4">Redefining Professional Collaboration</h2>
        <p class="text-zinc-300 mb-6">Our 2-year study across 50 organizations reveals...</p>

        <div class="bg-gray-800/30 p-6 rounded-xl mb-6">
          <div class="flex gap-6">
            <div class="flex-1">
              <h3 class="text-purple-400 mb-3">Productivity Gains</h3>
              <p class="text-3xl font-bold text-white">142%<span class="text-lg text-zinc-300 ml-2">average increase</span></p>
            </div>
            <div class="flex-1">
              <h3 class="text-purple-400 mb-3">Adoption Rate</h3>
              <p class="text-3xl font-bold text-white">89%<span class="text-lg text-zinc-300 ml-2">of enterprises</span></p>
            </div>
          </div>
        </div>
      `,
      readTime: "5 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            AI Insights & Research
          </h1>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
            Deep dives into artificial intelligence advancements and their real-world applications
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className={`bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 ${
                expandedPost === index ? '!border-purple-400' : ''
              }`}
            >
              <button
                onClick={() => setExpandedPost(expandedPost === index ? null : index)}
                className="w-full text-left"
              >
                {/* Post Header */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-zinc-400 mb-4">
                    <FiClock className="inline-block" />
                    <span>{post.readTime}</span>
                    <FiTag className="ml-4 inline-block" />
                    <span>{post.category}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">{post.title}</h2>
                  <div className="relative h-64 rounded-xl overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  </div>
                </div>
              </button>

              {/* Expandable Content */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: expandedPost === index ? 'auto' : 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0">
                  <div 
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {/* Read More Section */}
                  <div className="mt-8 border-t border-gray-700 pt-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Continue Exploring</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {['Related Research Papers', 'Industry Case Studies', 'Technical Documentation', 'Expert Forum'].map((link, i) => (
                        <a
                          key={i}
                          href="#"
                          className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg hover:bg-purple-500/20 transition-colors"
                        >
                          <span className="text-zinc-300">{link}</span>
                          <FiArrowUpRight className="text-zinc-400" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          className="mt-20 text-center"
        >
          <a
            href="/opportunities"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-transform"
          >
            Explore AI Training Opportunities
            <FiArrowUpRight className="ml-2 inline-block" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;