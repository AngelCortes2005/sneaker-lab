'use client';
import { motion } from 'framer-motion';
import ElectricBorder from './ElectricBorder';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import Image from 'next/image';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Air Max Velocity',
      price: 189.99,
      image: '/products/shoe1.jpg',
      category: 'Running',
      colors: ['#FF0000', '#0000FF', '#000000'],
    },
    {
      id: 2,
      name: 'Urban Street Pro',
      price: 159.99,
      image: '/products/shoe2.jpg',
      category: 'Lifestyle',
      colors: ['#FFFFFF', '#808080', '#FFD700'],
    },
    {
      id: 3,
      name: 'Elite Performance',
      price: 219.99,
      image: '/products/shoe3.jpg',
      category: 'Sports',
      colors: ['#00FF00', '#FF1493', '#FFA500'],
    },
    {
      id: 4,
      name: 'Classic Retro',
      price: 139.99,
      image: '/products/shoe4.jpg',
      category: 'Retro',
      colors: ['#8B4513', '#000080', '#DC143C'],
    },
  ];

  return (
    <section className="relative py-24 bg-black overflow-hidden">
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
            Productos Destacados
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Descubre nuestra colección exclusiva de zapatillas premium
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
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
                <div className="bg-gradient-to-br from-black/80 to-gray-900/60 backdrop-blur-sm overflow-hidden group">
                  {/* Product Image */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-800/50 to-gray-900/50 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    
                    {/* Placeholder - Reemplaza con tus imágenes reales */}
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-6xl opacity-20">👟</div>
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="bg-black/60 backdrop-blur-sm hover:bg-black/80">
                        <Heart className="w-4 h-4 text-white" />
                      </Button>
                      <Button size="icon" variant="ghost" className="bg-black/60 backdrop-blur-sm hover:bg-black/80">
                        <Eye className="w-4 h-4 text-white" />
                      </Button>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-[#7df9ff] text-black text-xs font-bold rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-xl font-bold text-white">{product.name}</h3>
                    
                    {/* Color Options */}
                    <div className="flex gap-2">
                      {product.colors.map((color, idx) => (
                        <button
                          key={idx}
                          className="w-6 h-6 rounded-full border-2 border-white/20 hover:border-white/60 transition-colors"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-2xl font-bold text-white">
                        ${product.price}
                      </span>
                      <Button className="bg-gradient-to-r from-blue-600 to-[#7df9ff] text-black font-bold hover:scale-105 transition-transform">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Añadir
                      </Button>
                    </div>
                  </div>
                </div>
              </ElectricBorder>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-[#7df9ff] text-black font-bold text-lg px-8 hover:scale-105 transition-transform"
          >
            Ver Todos los Productos
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;