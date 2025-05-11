'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaQuoteLeft } from 'react-icons/fa';

const ExpertsSection = () => {
  const experts = [
    {
      image: "/expert-tres.png",
      name: "Martin M.",
      field: "History",
      quote: "The flexibility is absolutely amazing. It was a blessing having this kind of freedom for the first time.",
      color: "from-amber-500 to-orange-500"
    },
    {
      image: "/expert-dos.png",
      name: "Gabriela S.",
      field: "Psychology & Education",
      quote: "Training AI engages my creativity like teaching students. Every interaction is a new challenge.",
      color: "from-purple-500 to-pink-500"
    },
    {
      image: "/expert-uno.png",
      name: "Daliah B.",
      field: "German Linguistics",
      quote: "I learn something new daily - from Swiss recipes to cultural nuances. The work itself is endlessly fascinating.",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <section className="relative py-20 bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Pioneers Shaping AI's Future
          </h2>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
            Meet the experts developing safe and beneficial AI across disciplines
          </p>
        </motion.div>

        {/* Expert Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group relative bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-purple-400 transition-all"
            >
              {/* Gradient Decoration */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${expert.color} rounded-t-2xl`} />

              <div className="space-y-6">
                {/* Expert Image */}
                <div className="p-3 bg-gray-900 rounded-full w-max">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-purple-400">
                    <Image
                      src={expert.image}
                      alt={`${expert.name} - ${expert.field}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <FaQuoteLeft className="text-4xl text-gray-700 absolute -top-4 -left-2" />
                  <p className="text-zinc-300 text-lg relative z-10">
                    {expert.quote}
                  </p>
                </div>

                {/* Expert Info */}
                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-2xl font-bold text-white">{expert.name}</h3>
                  <p className="text-purple-400">{expert.field}</p>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            </motion.div>
          ))}
        </div>

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center bg-gray-800/30 p-8 rounded-2xl border border-gray-700"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-4">
              <div className="text-4xl font-bold text-purple-400">100+</div>
              <div className="text-zinc-300">Active Experts</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-cyan-400">1.2M</div>
              <div className="text-zinc-300">Completed Tasks</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-amber-400">$1M+</div>
              <div className="text-zinc-300">Paid to Experts</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertsSection;