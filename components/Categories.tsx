'use client';
import { motion } from 'framer-motion';
import ResponsiveBorder from './ResponsiveBorder'; // ← Cambiar aquí
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Categories = () => {
  const categories = [
    {
      name: 'Running',
      count: 150,
      gradient: 'from-red-600 to-orange-500',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&q=80',
      description: 'Alto rendimiento',
    },
    {
      name: 'Lifestyle',
      count: 230,
      gradient: 'from-blue-600 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&q=80',
      description: 'Estilo urbano',
    },
    {
      name: 'Basketball',
      count: 95,
      gradient: 'from-purple-600 to-pink-500',
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=1200&q=80',
      description: 'Domina la cancha',
    },
    {
      name: 'Training',
      count: 120,
      gradient: 'from-green-600 to-teal-500',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=1200&q=80',
      description: 'Sin límites',
    },
  ];

  return (
    <section className="relative py-24 bg-black" id="categories">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-7xl font-black text-white mb-4">
            Categorías
          </h2>
          <p className="text-xl text-gray-400">
            Encuentra el estilo perfecto para ti
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <ResponsiveBorder
                color="#7df9ff"
                speed={0.8}
                chaos={0.2}
                thickness={2}
              >
                <Link href="/categorias">
                  <div className="relative bg-gradient-to-br from-black/80 to-gray-900/60 backdrop-blur-sm overflow-hidden cursor-pointer h-80">
                    {/* Background Image - Normal State */}
                    <div className="absolute inset-0 transition-opacity duration-500">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-all duration-500 group-hover:opacity-0 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>

                    {/* Background Image - Hover State */}
                    <div className="absolute inset-0 transition-opacity duration-500">
                      <Image
                        src={category.hoverImage}
                        alt={`${category.name} hover`}
                        fill
                        className="object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} transition-opacity duration-500 opacity-70 group-hover:opacity-60`}
                    />

                    {/* Dark Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />

                    {/* Shine Effect on Hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ 
                        duration: 0.8,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-8">
                      <motion.div
                        className="transform transition-all duration-500 group-hover:-translate-y-2"
                      >
                        {/* Category Name */}
                        <h3 className="text-3xl font-black text-white mb-2 drop-shadow-lg">
                          {category.name}
                        </h3>

                        {/* Description */}
                        <p className="text-white/90 text-sm mb-3 drop-shadow-md">
                          {category.description}
                        </p>

                        {/* Product Count */}
                        <p className="text-white/70 mb-4 text-sm font-semibold">
                          {category.count} productos disponibles
                        </p>

                        {/* CTA Button */}
                        <Button
                          className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-black transition-all duration-300 group-hover:translate-x-2 shadow-lg"
                        >
                          Explorar
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </motion.div>

                      {/* Hover Indicator */}
                      <motion.div
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                          <ArrowRight className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>

                      {/* Animated Border on Hover */}
                      <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 transition-all duration-300 rounded-lg" />
                    </div>

                    {/* Glowing Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
                    </div>

                    {/* Particle Effect Dots */}
                    <div className="absolute top-4 left-4 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-white/60"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </ResponsiveBorder>
            </motion.div>
          ))}
        </div>

        {/* View All Categories Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/categorias">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-bold text-lg px-8 hover:scale-105 transition-transform shadow-xl"
            >
              Ver Todas las Categorías
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;