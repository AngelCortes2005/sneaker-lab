'use client';
import { motion } from 'framer-motion';
import ElectricBorder from './ElectricBorder';
import { Truck, Shield, Sparkles, HeadphonesIcon } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Truck,
      title: 'Envío Gratis',
      description: 'En pedidos superiores a $100',
      color: 'from-blue-600 to-[#7df9ff]',
    },
    {
      icon: Shield,
      title: 'Garantía Premium',
      description: '2 años de garantía en todos los productos',
      color: 'from-purple-600 to-pink-600',
    },
    {
      icon: Sparkles,
      title: 'Personalización',
      description: 'Diseña tus zapatillas únicas',
      color: 'from-orange-600 to-yellow-500',
    },
    {
      icon: HeadphonesIcon,
      title: 'Soporte 24/7',
      description: 'Atención al cliente siempre disponible',
      color: 'from-green-600 to-emerald-500',
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ElectricBorder
                color="#7df9ff"
                speed={1}
                chaos={0.3}
                thickness={2}
              >
                <div className="bg-black/60 backdrop-blur-sm p-6 text-center group hover:bg-black/80 transition-colors">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </ElectricBorder>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;