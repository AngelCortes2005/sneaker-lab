'use client';
import { motion } from 'framer-motion';
import ElectricBorder from './ElectricBorder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Por favor ingresa un email válido');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubscribed(true);
      toast.success('¡Suscripción exitosa! Revisa tu email', {
        description: 'Te hemos enviado un email de confirmación',
      });
      setEmail('');
    } catch (error) {
      toast.error('Error al suscribirse', {
        description: 'Por favor intenta nuevamente',
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                {isSubscribed ? '¡Bienvenido al Club!' : 'Únete al Club'}
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                {isSubscribed 
                  ? 'Gracias por suscribirte. Prepárate para ofertas increíbles'
                  : 'Recibe ofertas exclusivas, lanzamientos y descuentos especiales'
                }
              </p>

              {!isSubscribed && (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#7df9ff] disabled:opacity-50"
                  />
                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-[#7df9ff] text-black font-bold hover:scale-105 transition-transform whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Suscribiendo...' : 'Suscribirse'}
                  </Button>
                </form>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Ofertas exclusivas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Lanzamientos anticipados</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Contenido premium</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Sin spam, lo prometemos</span>
                </div>
              </motion.div>
            </div>
          </ElectricBorder>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;