"use client";
import { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { LiquidChrome } from "./LiquidChrome";
import { motion } from "framer-motion";
import GlowBorder from "./GlowBorder"; // ← Cambiar a GlowBorder
import { Button } from "./ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

const DynamicShoes = dynamic(() => import("./three-js/shoe"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#7df9ff]"></div>
        <div className="absolute inset-0 animate-pulse">
          <div className="h-16 w-16 rounded-full border-2 border-[#7df9ff]/30"></div>
        </div>
      </div>
    </div>
  ),
});

const Hero = () => {
  const [isMobile, setIsMobile] = useState(true); // Default mobile para SSR
  const [shouldLoad3D, setShouldLoad3D] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Solo cargar 3D en desktop después de 2 segundos
      if (!mobile && !shouldLoad3D) {
        setTimeout(() => setShouldLoad3D(true), 2000);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [shouldLoad3D]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background - Condicional para mobile/desktop */}
      {mounted && !isMobile ? (
        // Desktop: LiquidChrome animado
        <LiquidChrome
          baseColor={[0.1, 0.1, 0.1]}
          speed={0.1}
          amplitude={0.6}
          interactive={false}
          className="absolute inset-0 z-0"
        />
      ) : (
        // Mobile: Gradiente estático
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-black">
          {/* Efecto de textura sutil */}
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(125,249,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
      )}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />

      {/* Floating Elements - Solo desktop */}
      {!isMobile && (
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"
          />
        </div>
      )}

      {/* Content Grid */}
      <div className="relative z-20 container mx-auto px-4 md:px-6 min-h-screen flex items-center pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
          >
            {/* Title */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight"
              >
                <span className="text-white drop-shadow-2xl">
                  El Futuro
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-[#7df9ff] to-blue-400 bg-clip-text text-transparent animate-gradient">
                  Sneaker Lab
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-300 drop-shadow-lg max-w-xl mx-auto lg:mx-0"
              >
                Diseña, personaliza y visualiza tus zapatillas favoritas en tiempo real con tecnología 3D
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/productos">
                <Button 
                  size="lg"
                  className="group relative bg-gradient-to-r from-blue-600 to-[#7df9ff] text-black font-bold text-lg px-8 py-6 hover:scale-105 transition-transform overflow-hidden w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center gap-2 justify-center">
                    Explorar Colección
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7df9ff] to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
              
              <Link href="/contacto">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white font-bold text-lg px-8 py-6 hover:bg-white/10 hover:border-[#7df9ff]/50 transition-all w-full sm:w-auto"
                >
                  Contáctanos
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10"
            >
              {[
                { label: 'Modelos', value: '500+' },
                { label: 'Colores', value: '1000+' },
                { label: 'Usuarios', value: '50K+' },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Video Preview - Solo móvil */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-md mx-auto"
              >
                <GlowBorder
                  color="#7df9ff"
                  thickness={3}
                >
                  <div className="relative aspect-video">
                    <video
                      src="/runner-hero.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                </GlowBorder>
              </motion.div>
            )}
          </motion.div>

          {/* Right Content - 3D Model (Desktop only) */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex w-full flex-col gap-8"
            >
              <div className="relative flex justify-center items-center h-[500px] lg:h-[600px] w-full">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-[#7df9ff]/40 to-blue-600/30 rounded-3xl blur-3xl -z-10 animate-pulse" />

                <GlowBorder
                  color="#7df9ff"
                  thickness={3}
                >
                  <div className="relative h-[500px] lg:h-[400px] lg:w-[450px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 backdrop-blur-xl border border-white/10">
                    
                    {/* Header del viewer 3D */}
                    <div className="absolute z-10 m-2 flex items-center justify-between">
                      <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10">
                        <Zap className="w-4 h-4 text-[#7df9ff]" />
                        <span className="text-sm font-bold text-white">
                          Sneaker Lab
                        </span>
                      </div>
                    </div>

                    {/* Modelo 3D */}
                    {shouldLoad3D ? (
                      <Suspense
                        fallback={
                          <div className="flex h-full items-center justify-center">
                            <div className="text-center space-y-4">
                              <div className="relative mx-auto">
                                <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-[#7df9ff] animate-spin" />
                                <div className="absolute inset-0 h-16 w-16 rounded-full border-2 border-[#7df9ff]/20 animate-pulse" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white mb-1">
                                  Cargando modelo 3D...
                                </p>
                                <p className="text-xs text-gray-400">
                                  Preparando la experiencia
                                </p>
                              </div>
                            </div>
                          </div>
                        }
                      >
                        <DynamicShoes />
                      </Suspense>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                          <p className="text-gray-400">Inicializando...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </GlowBorder>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-400 uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-white"
            />
          </div>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;