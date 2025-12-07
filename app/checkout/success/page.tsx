'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import confetti from 'canvas-confetti';

export default function CheckoutSuccessPage() {
  useEffect(() => {
    // Confetti celebration
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3b82f6', '#7df9ff', '#06b6d4'],
      });
      
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3b82f6', '#7df9ff', '#06b6d4'],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const orderNumber = 'SK' + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
              ¡Pago Exitoso!
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Tu pedido ha sido confirmado y está siendo procesado
            </p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8"
          >
            <div className="space-y-6">
              <div>
                <p className="text-gray-400 text-sm mb-2">Número de Orden</p>
                <p className="text-2xl font-bold text-white font-mono">
                  #{orderNumber}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                <div className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-lg">
                  <Mail className="w-8 h-8 text-cyan-400" />
                  <div className="text-center">
                    <p className="text-white font-semibold">Email Enviado</p>
                    <p className="text-sm text-gray-400">
                      Revisa tu bandeja de entrada
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-lg">
                  <Package className="w-8 h-8 text-cyan-400" />
                  <div className="text-center">
                    <p className="text-white font-semibold">Envío Estimado</p>
                    <p className="text-sm text-gray-400">
                      5-7 días hábiles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/productos">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-bold">
                Seguir Comprando
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                Volver al Inicio
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}