'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import type { Sneaker } from '@/lib/action/general.actions';
import Image from 'next/image';

interface CategoriesContentProps {
  sneakers: Sneaker[];
}

const categories = [
  {
    name: 'Lifestyle',
    description: 'Zapatillas para el día a día',
    gradient: 'from-blue-600 to-cyan-400',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&q=80',
  },
  {
    name: 'Running',
    description: 'Rendimiento en cada zancada',
    gradient: 'from-green-600 to-emerald-400',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&q=80',
  },
  {
    name: 'Basketball',
    description: 'Domina la cancha',
    gradient: 'from-orange-600 to-amber-400',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=1200&q=80',
  },
  {
    name: 'Training',
    description: 'Entrena sin límites',
    gradient: 'from-purple-600 to-pink-400',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=1200&q=80',
  },
];

const CategoriesContent = ({ sneakers }: CategoriesContentProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const filteredSneakers = selectedCategory
    ? sneakers.filter((s) => s.category === selectedCategory)
    : sneakers;

  const getCategoryCount = (categoryName: string) => {
    return sneakers.filter((s) => s.category === categoryName).length;
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-4">
            Categorías
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explora nuestras colecciones especializadas
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => {
            const count = getCategoryCount(category.name);
            const isSelected = selectedCategory === category.name;
            const isHovered = hoveredCategory === category.name;

            return (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCategory(isSelected ? null : category.name)}
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`relative p-8 rounded-2xl border-2 transition-all group overflow-hidden ${
                  isSelected
                    ? 'border-white/40 scale-105'
                    : 'border-white/10 hover:border-white/30 hover:scale-105'
                }`}
              >
                {/* Background Image - Normal State */}
                <div className="absolute inset-0 transition-opacity duration-500">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className={`object-cover transition-all duration-500 ${
                      isHovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>

                {/* Background Image - Hover State */}
                <div className="absolute inset-0 transition-opacity duration-500">
                  <Image
                    src={category.hoverImage}
                    alt={`${category.name} hover`}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>

                {/* Gradient Overlay */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ${
                    category.gradient
                  } ${
                    isSelected 
                      ? 'opacity-80' 
                      : isHovered 
                        ? 'opacity-60' 
                        : 'opacity-70'
                  }`}
                />

                {/* Dark Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Animated Border Effect */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 border-2 border-white/50 rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end">
                  <motion.div
                    animate={{
                      y: isHovered ? -10 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className={`text-3xl font-black mb-2 transition-all duration-300 ${
                      isSelected || isHovered ? 'text-white drop-shadow-lg' : 'text-white'
                    }`}>
                      {category.name}
                    </h3>
                    
                    <p className={`text-sm mb-4 transition-all duration-300 ${
                      isSelected || isHovered 
                        ? 'text-white/90 drop-shadow-md' 
                        : 'text-white/70'
                    }`}>
                      {category.description}
                    </p>

                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                      isSelected 
                        ? 'bg-white text-black shadow-xl' 
                        : isHovered
                          ? 'bg-white/90 text-black shadow-lg'
                          : 'bg-white/20 text-white backdrop-blur-sm'
                    }`}>
                      {count} {count === 1 ? 'producto' : 'productos'}
                    </div>
                  </motion.div>

                  {/* Hover Indicator */}
                  <motion.div
                    className="mt-4 flex items-center justify-center gap-2 text-white text-sm font-semibold"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: isHovered ? 1 : 0,
                      y: isHovered ? 0 : 10 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {isSelected ? '✓ Seleccionada' : 'Click para filtrar'}
                  </motion.div>
                </div>

                {/* Selection Ring */}
                {isSelected && (
                  <motion.div
                    layoutId="selected-category"
                    className="absolute inset-0 border-4 border-white rounded-2xl shadow-2xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Shine Effect on Hover */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ 
                      duration: 0.8,
                      ease: 'easeInOut',
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Products */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <motion.h2 
              layout
              className="text-3xl font-bold text-white"
            >
              {selectedCategory ? `${selectedCategory}` : 'Todos los Productos'}
            </motion.h2>
            <motion.p 
              layout
              className="text-gray-400"
            >
              {filteredSneakers.length} {filteredSneakers.length === 1 ? 'producto' : 'productos'}
            </motion.p>
          </div>

          {filteredSneakers.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredSneakers.map((sneaker, index) => (
                <motion.div
                  key={sneaker.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard sneaker={sneaker} index={index} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 text-xl">
                No hay productos en esta categoría
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesContent;