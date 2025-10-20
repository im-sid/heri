'use client';

import React from 'react';
import { Zap, RefreshCw, BookOpen, Shield, Sparkles, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Zap,
    title: 'Super-Resolution Enhancement',
    description: 'Transform blurry historical images into crystal-clear high-resolution artifacts using advanced AI algorithms.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: RefreshCw,
    title: 'AI-Powered Restoration',
    description: 'Restore degraded and damaged parts of ancient artifacts with intelligent regeneration technology.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    icon: BookOpen,
    title: 'Historical Knowledge Base',
    description: 'Access comprehensive historical information about artifacts, monuments, and archaeological sites instantly.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: ImageIcon,
    title: 'Artifact Recognition',
    description: 'Automatically identify and classify artifacts using computer vision and deep learning models.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    icon: Sparkles,
    title: 'Interactive AI Chatbot',
    description: 'Chat with our AI assistant to request enhancements, ask questions, and explore historical contexts.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Shield,
    title: 'Secure & Scalable',
    description: 'Enterprise-grade security with role-based access control for museums, researchers, and institutions.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
];

const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-glow">
            Cutting-Edge Features
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-4">
            Powerful AI tools designed for archaeologists, museum curators, and researchers
          </p>
          <p className="text-sm text-primary">
            ✨ All features available after free sign up
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-effect p-6 rounded-lg border border-primary/30 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 border-glow group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-sans text-xl font-semibold mb-3 group-hover:text-glow transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Features;


