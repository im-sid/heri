'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getAllArtifacts } from '@/lib/firestore';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Search, Filter, Download, Zap, RefreshCw, Loader, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface Artifact {
  id: string;
  userId: string;
  imageUrl: string;
  processedImageUrl?: string;
  name: string;
  description?: string;
  origin?: string;
  era?: string;
  processingType?: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

const GalleryPageContent = () => {
  const { user } = useAuth();
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [filteredArtifacts, setFilteredArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'super-resolution' | 'restoration'>('all');
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);

  useEffect(() => {
    fetchArtifacts();
  }, []);

  useEffect(() => {
    filterArtifacts();
  }, [searchTerm, filterType, artifacts]);

  const fetchArtifacts = async () => {
    try {
      const data = await getAllArtifacts();
      setArtifacts(data);
    } catch (error) {
      console.error('Error fetching artifacts:', error);
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const filterArtifacts = () => {
    let filtered = artifacts;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(a => a.processingType?.toLowerCase().includes(filterType));
    }

    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(a => 
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.origin?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArtifacts(filtered);
  };

  const handleDownload = (imageUrl: string, name: string) => {
    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${name}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Image downloaded!');
    } catch (error) {
      toast.error('Download failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ancient-glyph">
        <Loader className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="min-h-screen ancient-glyph stone-texture relative overflow-hidden py-8">
      {/* Hindu Decorative Elements */}
      <div className="absolute top-10 right-10 text-6xl opacity-10 animate-float text-primary">
        🕉️
      </div>
      <div className="absolute bottom-20 left-10 text-5xl opacity-10 animate-float text-secondary" style={{ animationDelay: '1s' }}>
        ☸️
      </div>
      <div className="absolute top-1/2 left-1/4 text-4xl opacity-10 animate-float text-copper" style={{ animationDelay: '2s' }}>
        🪷
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-decorative text-4xl sm:text-5xl font-bold text-glow mb-2">
            Heritage Gallery
          </h1>
          <p className="text-wheat/80 text-lg">
            Explore restored artifacts & enhanced historical imagery
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 glass-effect p-6 rounded-lg border border-primary/30 hindu-pattern">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
              <input
                type="text"
                placeholder="Search artifacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-lighter border-2 border-primary/30 rounded-lg focus:border-primary focus:outline-none transition-all"
              />
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-lg border-2 transition-all flex items-center gap-2 ${
                  filterType === 'all' 
                    ? 'bg-primary border-primary text-dark' 
                    : 'border-primary/30 hover:border-primary'
                }`}
              >
                <Filter className="w-4 h-4" />
                All
              </button>
              <button
                onClick={() => setFilterType('super-resolution')}
                className={`px-4 py-2 rounded-lg border-2 transition-all flex items-center gap-2 ${
                  filterType === 'super-resolution' 
                    ? 'bg-primary border-primary text-dark' 
                    : 'border-primary/30 hover:border-primary'
                }`}
              >
                <Zap className="w-4 h-4" />
                Enhanced
              </button>
              <button
                onClick={() => setFilterType('restoration')}
                className={`px-4 py-2 rounded-lg border-2 transition-all flex items-center gap-2 ${
                  filterType === 'restoration' 
                    ? 'bg-secondary border-secondary text-dark' 
                    : 'border-secondary/30 hover:border-secondary'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                Restored
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-wheat/60">
            Showing {filteredArtifacts.length} of {artifacts.length} artifacts
          </div>
        </div>

        {/* Pinterest-Style Masonry Grid */}
        {filteredArtifacts.length === 0 ? (
          <div className="text-center py-20 glass-effect rounded-lg border border-primary/30">
            <p className="text-xl text-wheat/60">No artifacts found</p>
            <p className="text-sm text-wheat/40 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredArtifacts.map((artifact, index) => (
              <motion.div
                key={artifact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="break-inside-avoid"
              >
                <div className="glass-effect rounded-lg border-2 border-primary/30 overflow-hidden group hover:border-primary transition-all duration-300 saffron-glow">
                  {/* Image */}
                  <div className="relative cursor-pointer" onClick={() => setSelectedArtifact(artifact)}>
                    <Image
                      src={artifact.processedImageUrl || artifact.imageUrl}
                      alt={artifact.name}
                      width={400}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                    {artifact.processingType && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-primary/90 rounded-full text-xs font-bold">
                        {artifact.processingType === 'super-resolution' ? <Zap className="w-3 h-3" /> : <RefreshCw className="w-3 h-3" />}
                      </div>
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(artifact.processedImageUrl || artifact.imageUrl, artifact.name);
                          }}
                          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-primary hover:bg-primary-dark rounded-lg transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-serif font-bold text-lg text-primary mb-1">{artifact.name}</h3>
                    {artifact.description && (
                      <p className="text-sm text-wheat/70 mb-2 line-clamp-2">{artifact.description}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-wheat/50">
                      <span>{artifact.origin || 'Unknown'}</span>
                      <span>{artifact.era || 'Ancient'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedArtifact && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedArtifact(null)}
            >
              <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setSelectedArtifact(null)}
                  className="absolute -top-12 right-0 p-2 text-white hover:text-primary transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>

                <div className="glass-effect rounded-lg border-2 border-primary p-6">
                  <div className="relative aspect-video mb-4">
                    <Image
                      src={showOriginal ? selectedArtifact.imageUrl : (selectedArtifact.processedImageUrl || selectedArtifact.imageUrl)}
                      alt={selectedArtifact.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-decorative text-2xl font-bold text-primary mb-2">{selectedArtifact.name}</h2>
                      <p className="text-wheat/70">{selectedArtifact.description}</p>
                    </div>

                    <div className="flex gap-3">
                      {selectedArtifact.processedImageUrl && (
                        <button
                          onClick={() => setShowOriginal(!showOriginal)}
                          className="px-4 py-2 glass-effect border border-secondary rounded-lg hover:bg-secondary/20 transition-colors"
                        >
                          {showOriginal ? 'Show Enhanced' : 'Show Original'}
                        </button>
                      )}
                      <button
                        onClick={() => handleDownload(selectedArtifact.processedImageUrl || selectedArtifact.imageUrl, selectedArtifact.name)}
                        className="px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

const GalleryPage = () => {
  return (
    <ProtectedRoute>
      <GalleryPageContent />
    </ProtectedRoute>
  );
};

export default GalleryPage;


