'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  CreditCard,
  ShoppingBag,
  Lock,
  ArrowLeft,
  MapPin,
  User,
  Mail,
  Phone,
  Package,
  Truck,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/lib/store/cart-store';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';

const checkoutSchema = z.object({
  // Información personal
  firstName: z.string().min(2, 'Nombre requerido'),
  lastName: z.string().min(2, 'Apellido requerido'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Teléfono inválido'),
  
  // Dirección de envío
  address: z.string().min(5, 'Dirección requerida'),
  city: z.string().min(2, 'Ciudad requerida'),
  state: z.string().min(2, 'Estado requerido'),
  zipCode: z.string().min(4, 'Código postal requerido'),
  country: z.string().min(2, 'País requerido'),
  
  // Información de pago
  cardNumber: z.string().min(16, 'Número de tarjeta inválido'),
  cardName: z.string().min(3, 'Nombre en tarjeta requerido'),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, 'Formato MM/YY'),
  cvv: z.string().min(3, 'CVV inválido'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutContent = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.getTotal());
  const clearCart = useCartStore((state) => state.clearCart);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
  });

  const shippingOptions = [
    { id: 'standard', name: 'Envío Estándar', time: '5-7 días', price: 0 },
    { id: 'express', name: 'Envío Express', time: '2-3 días', price: 15 },
    { id: 'overnight', name: 'Envío Nocturno', time: '1 día', price: 30 },
  ];

  const selectedShipping = shippingOptions.find(s => s.id === shippingMethod)!;
  const subtotal = total;
  const tax = subtotal * 0.1;
  const shipping = selectedShipping.price;
  const grandTotal = subtotal + tax + shipping;

  const nextStep = async () => {
    let fieldsToValidate: (keyof CheckoutFormData)[] = [];
    
    if (step === 1) {
      fieldsToValidate = ['firstName', 'lastName', 'email', 'phone'];
    } else if (step === 2) {
      fieldsToValidate = ['address', 'city', 'state', 'zipCode', 'country'];
    }
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);
    
    // Simular procesamiento de pago
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simular éxito (90% de probabilidad)
    const isSuccess = Math.random() > 0.1;
    
    if (isSuccess) {
      toast.success('¡Pago procesado exitosamente!', {
        description: 'Recibirás un email de confirmación',
      });
      clearCart();
      router.push('/checkout/success');
    } else {
      toast.error('Error al procesar el pago', {
        description: 'Por favor, intenta nuevamente',
      });
    }
    
    setIsProcessing(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center py-20">
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-700 mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-400 mb-8">
              Agrega productos antes de proceder al checkout
            </p>
            <Link href="/productos">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-bold">
                Ir a Productos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continuar comprando
          </Link>
          <h1 className="text-4xl lg:text-5xl font-black text-white">
            Finalizar Compra
          </h1>
        </motion.div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Información' },
              { num: 2, label: 'Envío' },
              { num: 3, label: 'Pago' },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      step >= s.num
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-400 text-black'
                        : 'bg-white/10 text-gray-500'
                    }`}
                  >
                    {s.num}
                  </div>
                  <span className={`mt-2 text-sm ${step >= s.num ? 'text-white' : 'text-gray-500'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div
                    className={`h-1 flex-1 transition-all ${
                      step > s.num ? 'bg-gradient-to-r from-blue-600 to-cyan-400' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-8">
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <User className="w-6 h-6 text-cyan-400" />
                      <h2 className="text-2xl font-bold text-white">
                        Información Personal
                      </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-semibold mb-2">
                          Nombre *
                        </label>
                        <Input
                          {...register('firstName')}
                          placeholder="John"
                          className="bg-white/5 border-white/10 text-white"
                        />
                        {errors.firstName && (
                          <p className="text-red-400 text-sm mt-1">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-2">
                          Apellido *
                        </label>
                        <Input
                          {...register('lastName')}
                          placeholder="Doe"
                          className="bg-white/5 border-white/10 text-white"
                        />
                        {errors.lastName && (
                          <p className="text-red-400 text-sm mt-1">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Email *
                      </label>
                      <Input
                        {...register('email')}
                        type="email"
                        placeholder="john@example.com"
                        className="bg-white/5 border-white/10 text-white"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Teléfono *
                      </label>
                      <Input
                        {...register('phone')}
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="bg-white/5 border-white/10 text-white"
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Shipping Information */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <MapPin className="w-6 h-6 text-cyan-400" />
                      <h2 className="text-2xl font-bold text-white">
                        Dirección de Envío
                      </h2>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Dirección *
                      </label>
                      <Input
                        {...register('address')}
                        placeholder="123 Main St, Apt 4B"
                        className="bg-white/5 border-white/10 text-white"
                      />
                      {errors.address && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.address.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-semibold mb-2">
                          Ciudad *
                        </label>
                        <Input
                          {...register('city')}
                          placeholder="New York"
                          className="bg-white/5 border-white/10 text-white"
                        />
                        {errors.city && (
                          <p className="text-red-400 text-sm mt-1">
                            {errors.city.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-2">
                          Estado *
                        </label>
                        <Input
                          {...register('state')}
                          placeholder="NY"
                          className="bg-white/5 border-white/10 text-white"
                        />
                        {errors.state && (
                          <p className="text-red-400 text-sm mt-1">
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-semibold mb-2">
                          Código Postal *
                        </label>
                        <Input
                          {...register('zipCode')}
                          placeholder="10001"
                          className="bg-white/5 border-white/10 text-white"
                        />
                        {errors.zipCode && (
                          <p className="text-red-400 text-sm mt-1">
                            {errors.zipCode.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-2">
                          País *
                        </label>
                        <Input
                          {...register('country')}
                          placeholder="Estados Unidos"
                          className="bg-white/5 border-white/10 text-white"
                        />
                        {errors.country && (
                          <p className="text-red-400 text-sm mt-1">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Shipping Options */}
                    <div className="pt-6 border-t border-white/10">
                      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Truck className="w-5 h-5" />
                        Método de Envío
                      </h3>
                      <div className="space-y-3">
                        {shippingOptions.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setShippingMethod(option.id)}
                            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                              shippingMethod === option.id
                                ? 'border-cyan-400 bg-cyan-400/10'
                                : 'border-white/10 bg-white/5 hover:border-white/30'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-white font-semibold">
                                  {option.name}
                                </p>
                                <p className="text-sm text-gray-400">
                                  {option.time}
                                </p>
                              </div>
                              <p className="text-white font-bold">
                                {option.price === 0 ? 'Gratis' : `$${option.price}`}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Payment Information */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <CreditCard className="w-6 h-6 text-cyan-400" />
                      <h2 className="text-2xl font-bold text-white">
                        Información de Pago
                      </h2>
                    </div>

                    <div className="bg-gradient-to-br from-blue-600/20 to-cyan-400/20 border border-cyan-400/30 rounded-lg p-4 flex items-start gap-3">
                      <Lock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white text-sm font-semibold">
                          Pago Seguro
                        </p>
                        <p className="text-gray-300 text-xs">
                          Tu información está protegida con encriptación SSL
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Número de Tarjeta *
                      </label>
                      <Input
                        {...register('cardNumber')}
                        placeholder="1234 5678 9012 3456"
                        maxLength={16}
                        className="bg-white/5 border-white/10 text-white"
                      />
                      {errors.cardNumber && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.cardNumber.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Nombre en la Tarjeta *
                      </label>
                      <Input
                        {...register('cardName')}
                        placeholder="JOHN DOE"
                        className="bg-white/5 border-white/10 text-white uppercase"
                      />
                      {errors.cardName && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.cardName.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-semibold mb-2">
                          Fecha de Expiración *
                        </label>
                        <Input
                          {...register('expiryDate')}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="bg-white/5 border-white/10 text-white"
                        />
                        {errors.expiryDate && (
                          <p className="text-red-400 text-sm mt-1">
                            {errors.expiryDate.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-2">
                          CVV *
                        </label>
                        <Input
                          {...register('cvv')}
                          placeholder="123"
                          maxLength={4}
                          type="password"
                          className="bg-white/5 border-white/10 text-white"
                        />
                        {errors.cvv && (
                          <p className="text-red-400 text-sm mt-1">
                            {errors.cvv.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-6 border-t border-white/10">
                  {step > 1 && (
                    <Button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      variant="outline"
                      className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
                    >
                      Atrás
                    </Button>
                  )}
                  
                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-bold"
                    >
                      Continuar
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-bold"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5 mr-2" />
                          Pagar ${grandTotal.toFixed(2)}
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Resumen del Pedido
              </h3>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.image && item.image.startsWith('http') ? (
                        <Image
                          src={item.thumbnail || item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-2xl">👟</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-semibold line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-gray-400 text-xs">{item.brand}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-gray-400 text-xs">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-cyan-400 font-bold text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Envío ({selectedShipping.name})</span>
                  <span>
                    {selectedShipping.price === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Impuestos (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-cyan-400">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badges */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Pago seguro SSL</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Garantía de devolución 30 días</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Productos 100% originales</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutContent;