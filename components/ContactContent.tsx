'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageSquare,
  Instagram,
  Twitter,
  Facebook
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Teléfono inválido').optional(),
  subject: z.string().min(5, 'El asunto debe tener al menos 5 caracteres'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactContent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    console.log('Form data:', data);
    
    toast.success('Mensaje enviado correctamente', {
      description: 'Te responderemos lo antes posible',
    });
    
    reset();
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'info@sneakerlab.com',
      link: 'mailto:info@sneakerlab.com',
    },
    {
      icon: Phone,
      title: 'Teléfono',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Dirección',
      value: '123 Sneaker Street, NY 10001',
      link: 'https://maps.google.com',
    },
    {
      icon: Clock,
      title: 'Horario',
      value: 'Lun - Vie: 9:00 - 18:00',
      link: null,
    },
  ];

  const socialLinks = [
    { icon: Instagram, link: 'https://instagram.com', color: 'hover:text-pink-500' },
    { icon: Twitter, link: 'https://twitter.com', color: 'hover:text-blue-400' },
    { icon: Facebook, link: 'https://facebook.com', color: 'hover:text-blue-600' },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-4">
            Contáctanos
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-8 h-8 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Envíanos un mensaje</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Nombre *
                </label>
                <Input
                  {...register('name')}
                  placeholder="Tu nombre completo"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Email *
                </label>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="tu@email.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Teléfono
                </label>
                <Input
                  {...register('phone')}
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Asunto *
                </label>
                <Input
                  {...register('subject')}
                  placeholder="¿En qué podemos ayudarte?"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
                {errors.subject && (
                  <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Mensaje *
                </label>
                <textarea
                  {...register('message')}
                  rows={5}
                  placeholder="Escribe tu mensaje aquí..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-bold text-lg py-6 hover:scale-105 transition-transform"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Mensaje
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-lg group-hover:scale-110 transition-transform">
                      <info.icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-400">{info.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-white font-bold text-xl mb-4">Síguenos</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 bg-white/5 rounded-lg border border-white/10 transition-all hover:scale-110 ${social.color}`}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden h-64">
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
                  <p className="text-gray-400">Mapa interactivo</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactContent;