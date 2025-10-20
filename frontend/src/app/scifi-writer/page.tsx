'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, BookOpen, Wand2, Lightbulb, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SciFiWriterPage = () => {
  return (
    <main className="min-h-screen ancient-glyph relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary/20 rounded-full mb-6 border-glow-cyan">
              <Sparkles className="w-10 h-10 text-secondary animate-glow-pulse" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4 text-glow-cyan">
              Sci-Fi Writer's Workshop
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Transform ancient artifacts into futuristic narratives. Where mythology meets science fiction.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-effect p-6 rounded-lg border border-secondary/30"
            >
              <Wand2 className="w-8 h-8 text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-3">Creative AI Assistant</h3>
              <p className="text-gray-400 mb-4">
                Upload historical artifacts and get AI-generated story concepts, plot hooks, and "what if" scenarios perfect for your next sci-fi novel.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>✨ Historical fact + speculative twist</li>
                <li>🚀 Ancient technology reimagined</li>
                <li>🌌 Alternate history scenarios</li>
                <li>⚡ Plot devices and MacGuffins</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-effect p-6 rounded-lg border border-primary/30"
            >
              <BookOpen className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Research Meets Fiction</h3>
              <p className="text-gray-400 mb-4">
                Get accurate historical context while exploring creative possibilities. Perfect blend of fact and imagination.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>📚 Authentic historical details</li>
                <li>🎭 Character inspiration</li>
                <li>🗺️ World-building elements</li>
                <li>🔮 Mystical science concepts</li>
              </ul>
            </motion.div>
          </div>

          {/* How It Works */}
          <div className="glass-effect p-8 rounded-lg border border-secondary/30 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center text-glow-cyan">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-secondary/50">
                  <span className="text-xl font-bold text-secondary">1</span>
                </div>
                <h4 className="font-semibold mb-2">Upload Artifact</h4>
                <p className="text-sm text-gray-400">
                  Upload any historical artifact, monument, or ancient object
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-secondary/50">
                  <span className="text-xl font-bold text-secondary">2</span>
                </div>
                <h4 className="font-semibold mb-2">AI Analysis</h4>
                <p className="text-sm text-gray-400">
                  AI identifies the artifact's origin, period, and significance
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-secondary/50">
                  <span className="text-xl font-bold text-secondary">3</span>
                </div>
                <h4 className="font-semibold mb-2">Generate Ideas</h4>
                <p className="text-sm text-gray-400">
                  Click "Generate Story Idea" for creative narratives
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-secondary/50">
                  <span className="text-xl font-bold text-secondary">4</span>
                </div>
                <h4 className="font-semibold mb-2">Write!</h4>
                <p className="text-sm text-gray-400">
                  Use the inspiration to craft your story
                </p>
              </div>
            </div>
          </div>

          {/* Example Output */}
          <div className="glass-effect p-8 rounded-lg border border-primary/30 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-secondary" />
              Example Story Concept
            </h2>
            <div className="bg-dark-lighter p-6 rounded-lg border border-secondary/20">
              <h4 className="text-secondary font-semibold mb-2">Artifact: Ancient Egyptian Scarab</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-primary">Historical Fact:</strong> Ancient Egyptians believed scarab beetles 
                  symbolized rebirth and were buried with the dead as protective amulets.
                </p>
                <p>
                  <strong className="text-secondary">Sci-Fi Twist:</strong> What if these weren't just symbols? In 3045, 
                  an archaeologist discovers that certain scarabs contain quantum encryption keys left by an advanced 
                  ancient civilization that could unlock dimensional portals.
                </p>
                <p>
                  <strong className="text-primary">Plot Hook:</strong> The protagonist must decipher hieroglyphic code 
                  hidden in the scarab's pattern before a rival faction uses it to unleash an ancient AI that was 
                  deliberately sealed away 5,000 years ago.
                </p>
                <p>
                  <strong className="text-secondary">Tech Concept:</strong> Ancient "magic" was actually advanced 
                  nanotechnology. The scarabs were data storage devices using bio-crystalline structures.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-secondary to-primary hover:from-secondary-dark hover:to-primary-dark border border-secondary rounded-lg transition-all duration-300 border-glow-cyan font-sans font-semibold"
            >
              <span>Start Creating Stories</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-gray-400 mt-4">
              Free to use • No credit card required • Instant AI-powered inspiration
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default SciFiWriterPage;


