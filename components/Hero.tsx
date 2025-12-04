"use client";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { LiquidChrome } from "./LiquidChrome";
import { motion } from "framer-motion";
import ElectricBorder from "./ElectricBorder";

const DynamicShoes = dynamic(() => import("./three-js/shoe"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  ),
});

const Hero = () => {
  return (
    <div className="relative w-full h-screen p-20">
      {/* Background */}
      <LiquidChrome
        baseColor={[0.1, 0.1, 0.1]}
        speed={0.1}
        amplitude={0.6}
        interactive={true}
        className="absolute inset-0 z-0 blur-sm"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10" />

      {/* Content Grid */}
      <div className="relative z-20 container mx-auto px-6 h-full grid lg:grid-cols-2 gap-8 items-center justify-center">
        {/* Left Content */}
        <div className="flex flex-col gap-4 max-w-xl">
          <div className="space-y-4 max-md:flex max-md:flex-col max-md:items-center">
            <h1 className="text-6xl lg:text-8xl font-black text-white drop-shadow-2xl leading-tight">
              Sneaker Lab
            </h1>
            <p className="text-xl text-gray-200 drop-shadow-lg">
              Diseña, personaliza y visualiza tus zapatillas en 3D
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-white/10 max-w-md">
            <ElectricBorder
              color="#7df9ff"
              speed={1}
              chaos={0.5}
              thickness={3}
            >
              <div className="p-1">
                <video
                src="runner-hero.mp4"
                style={{ margin: "0px", opacity: 0.8 }}
                autoPlay
                loop
                muted
                playsInline
                className="w-full"
              />
              </div>
              
            </ElectricBorder>

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>

        {/* Right Content - 3D Model */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex w-full flex-col gap-8 lg:w-7/7"
        >
          {/* Canvas del zapato mejorado */}
          <div className="relative flex justify-center items-center mt-2 h-[400px] w-full md:h-[450px] lg:h-[500px]">
            {/* Marco del canvas */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/40 to-[#7df9ff] rounded-3xl blur -z-10"></div>

            <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-black/60 to-gray-900/40 backdrop-blur-sm border border-white/10 p-1">
              {/* Header del viewer 3D */}
              <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
                <div className="rounded-full bg-black/60 backdrop-blur-sm px-3 py-1.5">
                  <span className="text-xs font-medium text-white">
                    Powered By Sneaker Lab
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1.5">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-medium text-white">
                      En línea
                    </span>
                  </div>
                </div>
              </div>

              {/* Carga diferida del modelo 3D */}
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-white"></div>
                      <p className="text-sm text-gray-300">
                        Cargando modelo 3D...
                      </p>
                    </div>
                  </div>
                }
              >
                <DynamicShoes />
              </Suspense>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
