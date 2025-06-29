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
          <h3 class="text-xl font-semibold text-cyan-400 mb-3">Core Innovations</h3>
          <ul class="list-disc pl-6 space-y-2 text-zinc-300">
            <li>Expert-annotated real-time performance metrics</li>
            <li>Biologically-inspired parameter adaptation algorithms</li>
            <li>Hybrid validation layers combining statistical and human intuition</li>
          </ul>
        </div>

        <div class="bg-gray-800/30 p-6 rounded-xl mb-6">
          <h3 class="text-xl font-semibold text-cyan-400 mb-3">Autonomous Vehicle Case Study</h3>
          <p class="text-zinc-300 mb-4">Implementing <strong>neuro-symbolic programming</strong> resulted in:</p>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 bg-gray-900/50 rounded-lg">
              <p class="text-cyan-400">38%</p>
              <p class="text-sm text-zinc-300">Reduction in edge-case errors</p>
            </div>
            <div class="p-4 bg-gray-900/50 rounded-lg">
              <p class="text-cyan-400">92%</p>
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
          <h3 class="text-xl font-semibold text-cyan-400 mb-4">Performance Metrics</h3>
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
          <h3 class="text-xl font-semibold text-cyan-400 mb-3">Technical Breakthroughs</h3>
          <ul class="list-disc pl-6 space-y-2 text-zinc-300">
            <li>Temporal Attention Networks processing speech prosody</li>
            <li>152D cultural context embeddings</li>
            <li>&lt;350ms code switching between 84 languages</li>
          </ul>
        </div>

        <div class="bg-gray-800/30 p-6 rounded-xl">
          <h3 class="text-xl font-semibold text-cyan-400 mb-3">Translation Engine</h3>
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
              <h3 class="text-cyan-400 mb-2">Neural Task Allocation</h3>
              <p class="text-sm text-zinc-300">Real-time human-machine task optimization</p>
            </div>
            <div class="p-4 bg-gray-900/50 rounded-lg">
              <h3 class="text-cyan-400 mb-2">Cognitive Load Balancing</h3>
              <p class="text-sm text-zinc-300">Voice pattern stress analysis</p>
            </div>
            <div class="p-4 bg-gray-900/50 rounded-lg">
              <h3 class="text-cyan-400 mb-2">Hybrid Decision Trees</h3>
              <p class="text-sm text-zinc-300">ML predictions + human values</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-800/30 p-6 rounded-xl">
          <h3 class="text-xl font-semibold text-cyan-400 mb-3">Performance Metrics</h3>
          <div class="flex gap-6">
            <div class="flex-1 p-4 bg-gray-900/50 rounded-lg">
              <p class="text-3xl font-bold text-cyan-400">142%</p>
              <p class="text-sm text-zinc-300">Faster project completion</p>
            </div>
            <div class="flex-1 p-4 bg-gray-900/50 rounded-lg">
              <p class="text-3xl font-bold text-cyan-400">3.2x</p>
              <p class="text-sm text-zinc-300">Innovation improvement</p>
            </div>
          </div>
        </div>
      `,
      readTime: "5 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8 sm:py-12 md:py-16 px-4 xs:px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-14 lg:mb-20"
        >
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 px-2">
            AI Insights & Research
          </h1>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto">
            Cutting-edge artificial intelligence research and implementation strategies
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-100px 0px", once: true }}              className={`bg-gray-800/30 backdrop-blur-sm rounded-lg xs:rounded-xl sm:rounded-2xl border border-gray-700 cursor-pointer ${
                expandedPost === index ? '!border-cyan-400' : ''
              }`}
            >
              <button
                onClick={() => setExpandedPost(expandedPost === index ? null : index)}
                className="w-full text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <div className="p-3 xs:p-4 sm:p-5 md:p-6">
                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 xs:gap-x-3 xs:gap-y-2 text-xs xs:text-sm sm:text-base text-zinc-400 mb-2 xs:mb-3 sm:mb-4">
                    <FiClock className="inline-block flex-shrink-0" />
                    <span>{post.readTime}</span>
                    <FiTag className="ml-1 xs:ml-2 sm:ml-4 inline-block flex-shrink-0" />
                    <span>{post.category}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 xs:mb-3 sm:mb-4">
                    {post.title}
                  </h2>

                  {/* Image Container */}
                  <div className="relative aspect-video w-full rounded-lg xs:rounded-xl overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                      priority={index < 2} // Load first two images immediately
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
                <div className="px-3 xs:px-4 sm:px-5 md:px-6 pb-3 xs:pb-4 sm:pb-5 md:pb-6">
                  <div className="prose prose-invert max-w-none 
                    prose-sm xs:prose-base sm:prose-lg  // Responsive typography
                    prose-table:overflow-x-auto prose-table:max-w-[calc(100vw-2rem)] xs:prose-table:max-w-[calc(100vw-3rem)]  // Table overflow
                    prose-code:break-words prose-code:font-mono prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                    prose-td:px-2 prose-td:py-1.5 prose-th:px-2 prose-th:py-1.5">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          className="mt-10 sm:mt-14 md:mt-20 text-center"
        >
          <a
            href="/opportunities"
            className="inline-block w-full xs:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2.5 xs:px-6 xs:py-3 sm:px-8 sm:py-4 text-sm xs:text-base sm:text-lg font-semibold rounded-md xs:rounded-lg sm:rounded-xl hover:scale-105 transition-transform"
          >
            Explore AI Training Opportunities
            <FiArrowUpRight className="ml-1.5 xs:ml-2 inline-block" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;