'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/lib/store/cart-store';
import { useUserStore } from '@/lib/store/user-store';
import { useOrdersStore } from '@/lib/store/orders-store';
import { 
  CreditCard, 
  Truck, 
  Package, 
  ShieldCheck, 
  ArrowRight,
  Trash2,
  Lock
} from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import GlowBorder from './GlowBorder';

export default function CheckoutContent() {
  const router = useRouter();
  const { items, getTotal, clearCart, removeItem, updateQuantity } = useCartStore();
  const { isAuthenticated, user } = useUserStore();
  const { addOrder } = useOrdersStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    // Shipping
    fullName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'México',
    // Payment
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      toast.error('Debes iniciar sesión', {
        description: 'Inicia sesión para continuar con tu compra',
      });
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (items.length === 0 && isAuthenticated) {
      router.push('/productos');
    }
  }, [items, isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setIsProcessing(true);

    try {
      // Simulación de procesamiento de pago
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Crear pedido
      addOrder({
        userId: user!.id,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          brand: item.brand,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total: finalTotal,
        status: 'pending',
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        paymentMethod: `Tarjeta terminada en ${formData.cardNumber.slice(-4)}`,
        trackingNumber: `TRK-${Date.now()}`,
      });

      toast.success('¡Pedido realizado!', {
        description: 'Redirigiendo...',
        duration: 1500,
      });

      // Limpiar carrito ANTES de redirigir
      clearCart();

      // Pequeño delay antes de redirigir
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Redirigir usando window.location como fallback
      window.location.href = '/checkout/success';
      
    } catch (error) {
      console.error('Error en checkout:', error);
      toast.error('Error al procesar el pago', {
        description: 'Por favor intenta nuevamente',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = getTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.16;
  const finalTotal = subtotal + shipping + tax;

  if (!isAuthenticated || items.length === 0) {
    return null;
  }

  const steps = [
    { number: 1, title: 'Carrito', icon: Package },
    { number: 2, title: 'Envío', icon: Truck },
    { number: 3, title: 'Pago', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-4">
            Checkout
          </h1>
          <p className="text-xl text-gray-400">
            Completa tu compra en 3 simples pasos
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-400 scale-110'
                          : isCompleted
                          ? 'bg-green-500'
                          : 'bg-gray-800'
                      }`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        isActive || isCompleted ? 'text-white' : 'text-gray-600'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 rounded-full transition-all ${
                        isCompleted
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-400'
                          : 'bg-gray-800'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Cart Review */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <GlowBorder color="#7df9ff" thickness={2}>
                    <div className="bg-black p-8 rounded-2xl">
                      <h2 className="text-3xl font-black text-white mb-6">
                        Revisa tu carrito
                      </h2>
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-4 p-4 bg-white/5 rounded-lg border border-white/10"
                          >
                            <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={96}
                                height={96}
                                className="object-contain w-full h-full"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-white mb-1">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-400 mb-2">
                                {item.brand}
                              </p>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                                    }
                                    className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-white"
                                  >
                                    -
                                  </button>
                                  <span className="text-white font-bold w-8 text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-white"
                                  >
                                    +
                                  </button>
                                </div>
                                <span className="text-cyan-400 font-bold">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlowBorder>
                </motion.div>
              )}

              {/* Step 2: Shipping Info */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <GlowBorder color="#7df9ff" thickness={2}>
                    <div className="bg-black p-8 rounded-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <Truck className="w-8 h-8 text-cyan-400" />
                        <h2 className="text-3xl font-black text-white">
                          Información de Envío
                        </h2>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          placeholder="Nombre completo *"
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          required
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        />
                        <Input
                          type="email"
                          placeholder="Email *"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        />
                        <Input
                          type="tel"
                          placeholder="Teléfono *"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        />
                        <Input
                          placeholder="Código Postal *"
                          value={formData.zipCode}
                          onChange={(e) =>
                            setFormData({ ...formData, zipCode: e.target.value })
                          }
                          required
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        />
                        <Input
                          placeholder="Dirección *"
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })
                          }
                          required
                          className="md:col-span-2 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        />
                        <Input
                          placeholder="Ciudad *"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          required
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        />
                        <Input
                          placeholder="Estado *"
                          value={formData.state}
                          onChange={(e) =>
                            setFormData({ ...formData, state: e.target.value })
                          }
                          required
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        />
                      </div>
                    </div>
                  </GlowBorder>
                </motion.div>
              )}

              {/* Step 3: Payment Info */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <GlowBorder color="#7df9ff" thickness={2}>
                    <div className="bg-black p-8 rounded-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <CreditCard className="w-8 h-8 text-cyan-400" />
                        <h2 className="text-3xl font-black text-white">
                          Información de Pago
                        </h2>
                      </div>

                      <div className="space-y-4">
                        <Input
                          placeholder="Número de tarjeta *"
                          value={formData.cardNumber}
                          onChange={(e) =>
                            setFormData({ ...formData, cardNumber: e.target.value })
                          }
                          required
                          maxLength={16}
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        />
                        <Input
                          placeholder="Nombre en la tarjeta *"
                          value={formData.cardName}
                          onChange={(e) =>
                            setFormData({ ...formData, cardName: e.target.value })
                          }
                          required
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            placeholder="MM/AA *"
                            value={formData.expiryDate}
                            onChange={(e) =>
                              setFormData({ ...formData, expiryDate: e.target.value })
                            }
                            required
                            maxLength={5}
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                          />
                          <Input
                            placeholder="CVV *"
                            type="password"
                            value={formData.cvv}
                            onChange={(e) =>
                              setFormData({ ...formData, cvv: e.target.value })
                            }
                            required
                            maxLength={3}
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                          />
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                          <Lock className="w-4 h-4 text-green-400" />
                          <span>Transacción segura encriptada SSL</span>
                        </div>
                      </div>
                    </div>
                  </GlowBorder>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    variant="outline"
                    className="flex-1 border-white/20 text-white bg-white/5"
                    disabled={isProcessing}
                  >
                    Anterior
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-bold hover:scale-105 transition-transform disabled:opacity-50"
                >
                  {isProcessing
                    ? 'Procesando...'
                    : currentStep === 3
                    ? 'Confirmar Pago'
                    : 'Continuar'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Order Summary - Sticky Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24"
              >
                <GlowBorder color="#7df9ff" thickness={2}>
                  <div className="bg-black p-6 rounded-2xl">
                    <h3 className="text-2xl font-black text-white mb-6">
                      Resumen del Pedido
                    </h3>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-400">
                        <span>Subtotal ({items.length} items)</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Envío</span>
                        <span className={shipping === 0 ? 'text-green-400' : ''}>
                          {shipping === 0 ? '¡Gratis!' : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Impuestos (16%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>

                      <div className="border-t border-white/10 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-black text-white">Total</span>
                          <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                            ${finalTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="space-y-3 pt-6 border-t border-white/10">
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <ShieldCheck className="w-5 h-5 text-green-400" />
                        <span>Compra 100% segura</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <Truck className="w-5 h-5 text-blue-400" />
                        <span>Envío gratis en compras +$100</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <Package className="w-5 h-5 text-purple-400" />
                        <span>Garantía de devolución 30 días</span>
                      </div>
                    </div>
                  </div>
                </GlowBorder>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}