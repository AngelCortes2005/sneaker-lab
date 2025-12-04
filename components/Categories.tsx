'use client';
import { motion } from 'framer-motion';
import ElectricBorder from './ElectricBorder';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Categories = () => {
  const categories = [
    {
      name: 'Running',
      count: 150,
      image: '🏃',
      gradient: 'from-red-600 to-orange-500',
    },
    {
      name: 'Lifestyle',
      count: 230,
      image: '👟',
      gradient: 'from-blue-600 to-cyan-500',
    },
    {
      name: 'Basketball',
      count: 95,
      image: '🏀',
      gradient: 'from-purple-600 to-pink-500',
    },
    {
      name: 'Skateboarding',
      count: 120,
      image: '🛹',
      gradient: 'from-green-600 to-teal-500',
    },
  ];

  return (
    <section className="relative py-24 bg-black">
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
            >
              <ElectricBorder
                color="#7df9ff"
                speed={0.8}
                chaos={0.2}
                thickness={2}
              >
                <div className="relative bg-gradient-to-br from-black/80 to-gray-900/60 backdrop-blur-sm overflow-hidden group cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity`} />
                  
                  <div className="p-8 text-center">
                    <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">
                      {category.image}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {category.count} productos
                    </p>
                    <Button
                      className="text-white hover:text-[#7df9ff] group-hover:translate-x-2 transition-transform bg-transparent hover:bg-transparent"
                    >
                      Explorar
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </ElectricBorder>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;