'use client';

import { motion } from 'framer-motion';
import { FaStar, FaEdit, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const TrainingInterface = () => {
  return (
    <section className="relative py-20 bg-gray-900 border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rating & Ranking Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaStar className="text-2xl text-yellow-400" />
            <h2 className="text-3xl font-bold text-white">Rating & Ranking</h2>
          </div>
          
          <div className="bg-gray-800/30 p-6 rounded-xl border border-cyan-400/30">
            <p className="text-zinc-300 mb-4">
              Evaluate AI responses based on accuracy and quality. Your expertise helps train models to deliver better results.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Sample Task:</h3>
                <p className="text-zinc-300">Which response better explains quantum computing?</p>
                <div className="mt-4 grid gap-4">
                  <div className="p-3 rounded-lg bg-gray-800">
                    <p className="text-zinc-300 text-sm">Response A: Quantum bits exist in superposition...</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-800 border border-cyan-400/30">
                    <p className="text-zinc-300 text-sm">Response B: Qubits leverage quantum states to...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Open Rewrite Workflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaEdit className="text-2xl text-cyan-400" />
            <h2 className="text-3xl font-bold text-white">Open Rewrite Process</h2>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Step 1 */}
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <div className="text-cyan-400 mb-2">1. Write Prompt</div>
                <p className="text-zinc-300 text-sm">
                  Create clear instructions for the AI model to follow
                </p>
                <div className="mt-4 p-3 bg-gray-800 rounded text-sm italic text-zinc-400">
                  "Explain quantum computing to a beginner"
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <div className="text-cyan-400 mb-2">2. Edit Response</div>
                <p className="text-zinc-300 text-sm">
                  Refine the AI's output to improve clarity and accuracy
                </p>
                <div className="mt-4 p-3 bg-gray-800 rounded text-sm text-zinc-400">
                  <span className="line-through">"Qubits leverage..."</span>
                  <span className="block text-cyan-300">"Quantum bits can exist in multiple states at once..."</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <div className="text-cyan-400 mb-2">3. Finalize</div>
                <p className="text-zinc-300 text-sm">
                  Submit your improved version to train the AI model
                </p>
                <div className="mt-4 flex justify-center">
                  <FaCheckCircle className="text-2xl text-green-400" />
                </div>
              </div>
            </div>

            <div className="text-zinc-400 text-sm">
              <FaArrowRight className="inline-block mr-2" />
              Your edits directly improve the AI's future responses
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          className="text-center"
        >
          <a
            href="/opportunities"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:scale-105 transition-transform"
          >
            Start Contributing
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingInterface;