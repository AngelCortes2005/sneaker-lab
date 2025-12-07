'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, Search, ArrowLeft, Package, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const quickLinks = [
    {
      icon: Home,
      label: 'Inicio',
      href: '/',
      color: 'from-blue-600 to-cyan-400',
    },
    {
      icon: Package,
      label: 'Productos',
      href: '/productos',
      color: 'from-purple-600 to-pink-400',
    },
    {
      icon: TrendingUp,
      label: 'Categorías',
      href: '/categorias',
      color: 'from-green-600 to-emerald-400',
    },
    {
      icon: Search,
      label: 'Buscar',
      href: '/productos',
      color: 'from-orange-600 to-amber-400',
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * -2,
          y: mousePosition.y * -2,
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <motion.h1
              className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-black leading-none"
              style={{
                background: 'linear-gradient(to right, #3b82f6, #7df9ff, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              404
            </motion.h1>
          </motion.div>
          

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              ¡Ups! Página no encontrada
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Parece que esta zapatilla se perdió en el camino. 
              No te preocupes, tenemos muchas otras opciones increíbles esperándote.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={link.href}>
                  <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer overflow-hidden">
                    {/* Gradient Background on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
                    
                    <div className="relative z-10">
                      <link.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <p className="text-white font-bold">{link.label}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={() => router.back()}
              variant="outline"
              size="lg"
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 backdrop-blur-sm group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Volver Atrás
            </Button>

            <Link href="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-bold hover:scale-105 transition-transform shadow-xl"
              >
                <Home className="w-5 h-5 mr-2" />
                Ir al Inicio
              </Button>
            </Link>
          </motion.div>

          {/* Fun Facts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 pt-8 border-t border-white/10"
          >
            <p className="text-gray-500 text-sm">
              💡 ¿Sabías que? El código de error 404 fue creado en 1992 en el CERN
            </p>
          </motion.div>
        </div>
      </div>

      {/* Animated Sneaker Trail */}
      <motion.div
        className="absolute bottom-10 left-0 right-0 flex justify-center gap-8 opacity-20"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-6xl">
            👟
          </span>
        ))}
      </motion.div>
    </div>
  );
}