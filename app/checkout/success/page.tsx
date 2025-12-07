'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutSuccessPage() {
  const [orderNumber] = useState(`ORD-${Date.now()}`);

  useEffect(() => {
    // Confetti explosion
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(125,249,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-32 h-32 mb-8 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-2xl opacity-50 animate-pulse" />
            <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-8">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl lg:text-7xl font-black text-white mb-4"
          >
            ¡Pedido <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Confirmado!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-400 mb-12"
          >
            Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
          </motion.p>

          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Package className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Número de Pedido</h2>
            </div>
            <div className="bg-black/50 rounded-lg p-6 border border-cyan-400/30">
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 tracking-wider">
                {orderNumber}
              </p>
            </div>

            <div className="mt-8 space-y-4 text-left">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-400 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Confirmación por Email</h3>
                  <p className="text-sm text-gray-400">
                    Recibirás un correo electrónico con los detalles de tu pedido
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-400 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Preparación del Pedido</h3>
                  <p className="text-sm text-gray-400">
                    Procesaremos tu pedido en 24-48 horas
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-400 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Envío y Entrega</h3>
                  <p className="text-sm text-gray-400">
                    Recibirás un número de seguimiento para rastrear tu paquete
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/pedidos" className="flex-1 sm:flex-initial">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-bold hover:scale-105 transition-transform"
              >
                <Package className="w-5 h-5 mr-2" />
                Ver Mis Pedidos
              </Button>
            </Link>

            <Link href="/productos" className="flex-1 sm:flex-initial">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/5"
              >
                Seguir Comprando
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <Link href="/" className="flex-1 sm:flex-initial">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/5"
              >
                <Home className="w-5 h-5 mr-2" />
                Ir al Inicio
              </Button>
            </Link>
          </motion.div>

          {/* Thank You Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 p-6 bg-gradient-to-r from-blue-600/20 to-cyan-400/20 rounded-lg border border-cyan-400/30"
          >
            <p className="text-lg text-white font-semibold mb-2">
              🎉 ¡Gracias por confiar en SneakerLab!
            </p>
            <p className="text-gray-400">
              Tu satisfacción es nuestra prioridad. Si tienes alguna pregunta, no dudes en contactarnos.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}