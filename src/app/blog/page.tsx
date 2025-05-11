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
        <h2 class="text-2xl font-bold text-white mb-4">From Automation to Cognitive Partnership</h2>
        <p class="text-zinc-300 mb-6">Modern AI development has shifted from pure automation to <em>cognitive partnership</em>. Our latest architectures employ <strong>Reinforcement Learning with Human Feedback (RLHF)</strong> frameworks where:</p>
        
        <div class="bg-gray-800/30 p-6 rounded-xl mb-6">
          <h3 class="text-xl font-semibold text-purple-400 mb-3">Core Innovations</h3>
          <ul class="list-disc pl-6 space-y-2 text-zinc-300">
            <li>Expert-annotated real-time performance metrics</li>
            <li>Biologically-inspired parameter adaptation algorithms</li>
            <li>Hybrid validation layers combining statistical and human intuition</li>
          </ul>
        </div>

        <div class="bg-gray-800/30 p-6 rounded-xl mb-6">
          <h3 class="text-xl font-semibold text-purple-400 mb-3">Autonomous Vehicle Case Study</h3>
          <p class="text-zinc-300 mb-4">Implementing <strong>neuro-symbolic programming</strong> resulted in:</p>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 bg-gray-900/50 rounded-lg">
              <p class="text-purple-400">38%</p>
              <p class="text-sm text-zinc-300">Reduction in edge-case errors</p>
            </div>
            <div class="p-4 bg-gray-900/50 rounded-lg">
              <p class="text-purple-400">92%</p>
              <p class="text-sm text-zinc-300">Faster model convergence</p>
            </div>
          </div>
        </div>
      `,
      readTime: "8 min read"
    },
    {
      title: "Ethical AI: Implementing Human-Centric Validation Frameworks",
      date: "March 10, 2024",
      category: "AI Ethics",
      image: "/blog/ai-ethics.jpg",
      content: `
        <h2 class="text-2xl font-bold text-white mb-4">The Ethical AI Matrix</h2>
        <p class="text-zinc-300 mb-6">Our validation framework addresses the black box dilemma through multilayered analysis:</p>

        <div class="bg-gray-800/30 p-6 rounded-xl mb-6">
          <pre class="text-zinc-300 whitespace-pre-wrap break-words">
            <code class="text-sm">
class EthicalValidator:
    def __init__(self):
        self.bias_detector = MultiLayerBiasScanner()
        self.transparency_engine = DecisionUnfoldingModule()
        self.human_override = NeuralInterruptSystem()
            </code>
          </pre>
        </div>

        <div class="bg-gray-800/30 p-6 rounded-xl mb-6">
          <h3 class="text-xl font-semibold text-purple-400 mb-4">Performance Metrics</h3>
          <table class="w-full text-zinc-300">
            <thead>
              <tr class="border-b border-gray-700">
                <th class="py-2 text-left">Validation Layer</th>
                <th class="py-2 text-right">Success Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-700">
                <td class="py-3">Contextual Fairness</td>
                <td class="py-3 text-right">98.7%</td>
              </tr>
              <tr class="border-b border-gray-700">
                <td class="py-3">Explainability Index</td>
                <td class="py-3 text-right">94.2</td>
              </tr>
              <tr>
                <td class="py-3">Human Consensus Alignment</td>
                <td class="py-3 text-right">96.5%</td>
              </tr>
            </tbody>
          </table>
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
        <h2 class="text-2xl font-bold text-white mb-4">OmniTranslate X Architecture</h2>
        <p class="text-zinc-300 mb-6">Our platform revolutionizes cross-cultural communication through:</p>

        <div class="bg-gray-800/30 p-6 rounded-xl mb-6">
          <h3 class="text-xl font-semibold text-purple-400 mb-3">Technical Breakthroughs</h3>
          <ul class="list-disc pl-6 space-y-2 text-zinc-300">
            <li>Temporal Attention Networks processing speech prosody</li>
            <li>152D cultural context embeddings</li>
            <li>&lt;350ms code switching between 84 languages</li>
          </ul>
        </div>

        <div class="bg-gray-800/30 p-6 rounded-xl">
          <h3 class="text-xl font-semibold text-purple-400 mb-3">Translation Engine</h3>
          <pre class="text-zinc-300 text-sm">
            <code>
fn contextual_translate(input: MultimodalData) -> LocalizedOutput {
    let cultural_weight = calculate_context_weights(input.metadata);
    apply_sociolinguistic_rules(input, cultural_weight)
}
            </code>
          </pre>
          <p class="text-zinc-300 mt-4">Achieved <strong>97.4% accuracy</strong> in humor intent preservation for English→Japanese translations.</p>
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
        <h2 class="text-2xl font-bold text-white mb-4">Cognitive Workforce Platform</h2>
        <p class="text-zinc-300 mb-6">Redefining collaboration through three pillars:</p>

        <div class="bg-gray-800/30 p-6 rounded-xl mb-6">
          <div class="grid md:grid-cols-3 gap-4">
            <div class="p-4 bg-gray-900/50 rounded-lg">
              <h3 class="text-purple-400 mb-2">Neural Task Allocation</h3>
              <p class="text-sm text-zinc-300">Real-time human-machine task optimization</p>
            </div>
            <div class="p-4 bg-gray-900/50 rounded-lg">
              <h3 class="text-purple-400 mb-2">Cognitive Load Balancing</h3>
              <p class="text-sm text-zinc-300">Voice pattern stress analysis</p>
            </div>
            <div class="p-4 bg-gray-900/50 rounded-lg">
              <h3 class="text-purple-400 mb-2">Hybrid Decision Trees</h3>
              <p class="text-sm text-zinc-300">ML predictions + human values</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-800/30 p-6 rounded-xl">
          <h3 class="text-xl font-semibold text-purple-400 mb-3">Performance Metrics</h3>
          <div class="flex gap-6">
            <div class="flex-1 p-4 bg-gray-900/50 rounded-lg">
              <p class="text-3xl font-bold text-purple-400">142%</p>
              <p class="text-sm text-zinc-300">Faster project completion</p>
            </div>
            <div class="flex-1 p-4 bg-gray-900/50 rounded-lg">
              <p class="text-3xl font-bold text-purple-400">3.2x</p>
              <p class="text-sm text-zinc-300">Innovation improvement</p>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            AI Insights & Research
          </h1>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
            Cutting-edge artificial intelligence research and implementation strategies
          </p>
        </motion.div>

        <div className="grid gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className={`bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 cursor-pointer ${
                expandedPost === index ? '!border-purple-400' : ''
              }`}
            >
              <button
                onClick={() => setExpandedPost(expandedPost === index ? null : index)}
                className="w-full text-left cursor-pointer"
              >
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
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

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