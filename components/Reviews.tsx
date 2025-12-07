'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const Reviews = () => {
  const reviews = [
    {
      name: 'Carlos Martínez',
      avatar: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      text: 'La mejor experiencia comprando zapatillas online. Llegaron en perfectas condiciones y super rápido. 100% recomendado!',
      product: 'Nike Air Max 270',
      verified: true,
    },
    {
      name: 'Ana García',
      avatar: 'https://i.pravatar.cc/150?img=45',
      rating: 5,
      text: 'Calidad excepcional y atención al cliente de primera. Las zapatillas son exactamente como se muestran en las fotos.',
      product: 'Adidas Ultraboost',
      verified: true,
    },
    {
      name: 'Miguel Torres',
      avatar: 'https://i.pravatar.cc/150?img=33',
      rating: 5,
      text: 'Increíble selección de modelos exclusivos. El proceso de compra fue súper fácil y el envío gratuito es un plus.',
      product: 'Jordan 1 Retro',
      verified: true,
    },
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-7xl font-black text-white mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <div className="flex items-center justify-center gap-2 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-500" />
            ))}
            <span className="text-white ml-2 text-xl font-bold">4.9/5</span>
            <span className="text-gray-400 ml-2">(1,247 reseñas)</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 relative"
            >
              <Quote className="absolute top-4 right-4 w-12 h-12 text-cyan-400/20" />
              
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h4 className="text-white font-bold">{review.name}</h4>
                  {review.verified && (
                    <span className="text-xs text-green-400">✓ Compra verificada</span>
                  )}
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              <p className="text-gray-300 mb-4 italic">"{review.text}"</p>
              
              <div className="text-sm text-gray-500 border-t border-white/10 pt-4">
                Producto: <span className="text-cyan-400">{review.product}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;