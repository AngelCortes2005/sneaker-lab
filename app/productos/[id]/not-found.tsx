'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Package, ArrowLeft, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProductNotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Sad Sneaker Icon */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
              <Package className="w-16 h-16 text-gray-600" />
            </div>
          </motion.div>

          <h1 className="text-5xl font-black text-white mb-4">
            Producto No Encontrado
          </h1>
          
          <p className="text-xl text-gray-400 mb-8">
            Lo sentimos, no pudimos encontrar este producto. 
            Puede que haya sido vendido o ya no esté disponible.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver
            </Button>

            <Link href="/productos">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-bold">
                <Search className="w-5 h-5 mr-2" />
                Ver Productos
              </Button>
            </Link>

            <Link href="/">
              <Button
                variant="outline"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                <Home className="w-5 h-5 mr-2" />
                Inicio
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}