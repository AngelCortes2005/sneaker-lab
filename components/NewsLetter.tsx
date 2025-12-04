'use client';
import { motion } from 'framer-motion';
import ElectricBorder from './ElectricBorder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

const Newsletter = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7df9ff15_0%,transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <ElectricBorder
            color="#7df9ff"
            speed={1}
            chaos={0.5}
            thickness={3}
          >
            <div className="bg-gradient-to-br from-black/80 to-gray-900/60 backdrop-blur-xl p-12 text-center">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-blue-600 to-[#7df9ff] mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-black text-white mb-4">
                Únete al Club
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Recibe ofertas exclusivas, lanzamientos y descuentos especiales
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#7df9ff]"
                />
                <Button className="bg-gradient-to-r from-blue-600 to-[#7df9ff] text-black font-bold hover:scale-105 transition-transform whitespace-nowrap">
                  Suscribirse
                </Button>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                🔒 Tus datos están seguros. No spam.
              </p>
            </div>
          </ElectricBorder>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;