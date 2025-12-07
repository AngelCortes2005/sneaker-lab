'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sneaker } from '@/lib/action/general.actions';
import ProductCard from './ProductCard';

interface FeaturedProductsProps {
  sneakers: Sneaker[];
}

const FeaturedProducts = ({ sneakers }: FeaturedProductsProps) => {
  return (
    <section className="relative py-24 bg-black overflow-hidden" id="products">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-7xl font-black text-white mb-4">
            Productos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#7df9ff]">Destacados</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Descubre nuestra colección exclusiva de zapatillas premium
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sneakers.map((sneaker, index) => (
            <ProductCard 
              key={sneaker.id} 
              sneaker={sneaker} 
              index={index} 
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/productos">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-[#7df9ff] text-black font-bold text-lg px-8 hover:scale-105 transition-transform"
            >
              Ver Todos los Productos ({sneakers.length}+)
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;