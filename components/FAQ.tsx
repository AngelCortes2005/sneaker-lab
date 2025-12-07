'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: '¿Cómo puedo hacer seguimiento de mi pedido?',
      answer: 'Una vez realizada tu compra, recibirás un email con el número de seguimiento. Puedes rastrear tu pedido en tiempo real desde nuestra sección "Mis Pedidos" o directamente con la empresa de envío.',
    },
    {
      question: '¿Cuál es la política de devoluciones?',
      answer: 'Ofrecemos devoluciones gratuitas dentro de los 30 días posteriores a la compra. Los productos deben estar sin usar, con etiquetas originales y en su caja original. El reembolso se procesa en 5-7 días hábiles.',
    },
    {
      question: '¿Los productos son 100% originales?',
      answer: 'Sí, todos nuestros productos son 100% auténticos y vienen directamente de distribuidores oficiales. Cada zapatilla incluye garantía de autenticidad y puede ser verificada.',
    },
    {
      question: '¿Ofrecen envío internacional?',
      answer: 'Actualmente enviamos a más de 50 países. Los costos y tiempos de envío varían según el destino. Puedes verificar la disponibilidad ingresando tu código postal durante el checkout.',
    },
    {
      question: '¿Puedo cambiar mi talla después de comprar?',
      answer: 'Sí, si la talla no te queda bien, puedes solicitar un cambio gratuito dentro de los 30 días. Simplemente contacta a nuestro equipo de soporte y te enviaremos una etiqueta de devolución.',
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express), PayPal, transferencias bancarias y pago contra entrega en zonas seleccionadas.',
    },
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block p-4 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl mb-6">
            <HelpCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-white mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-400">
            Encuentra respuestas a las dudas más comunes
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <h3 className="text-lg font-bold text-white pr-8">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;