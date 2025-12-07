'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useOrdersStore, type Order, type OrderStatus } from '@/lib/store/orders-store';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock,
  MapPin,
  CreditCard,
  ArrowLeft,
  Eye,
  RotateCcw
} from 'lucide-react';
import { toast } from 'sonner';

interface OrdersContentProps {
  userId: string;
}

const statusConfig: Record<OrderStatus, { 
  label: string; 
  icon: any; 
  color: string;
  bgColor: string;
}> = {
  pending: {
    label: 'Pendiente',
    icon: Clock,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
  },
  processing: {
    label: 'Procesando',
    icon: Package,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
  },
  shipped: {
    label: 'Enviado',
    icon: Truck,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
  },
  delivered: {
    label: 'Entregado',
    icon: CheckCircle,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
  },
  cancelled: {
    label: 'Cancelado',
    icon: XCircle,
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
  },
};

export default function OrdersContent({ userId }: OrdersContentProps) {
  const { getUserOrders, cancelOrder } = useOrdersStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const orders = getUserOrders(userId);

  const handleCancelOrder = (orderId: string) => {
    cancelOrder(orderId);
    toast.success('Pedido cancelado', {
      description: 'Tu pedido ha sido cancelado exitosamente',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (selectedOrder) {
    const StatusIcon = statusConfig[selectedOrder.status].icon;

    return (
      <div className="min-h-screen bg-black pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => setSelectedOrder(null)}
            className="text-white hover:text-cyan-400 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a mis pedidos
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl border border-white/10 p-8"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-white/10">
              <div>
                <h1 className="text-3xl font-black text-white mb-2">
                  Pedido {selectedOrder.id}
                </h1>
                <p className="text-gray-400">
                  Realizado el {formatDate(selectedOrder.createdAt)}
                </p>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig[selectedOrder.status].bgColor} mt-4 md:mt-0`}>
                <StatusIcon className={`w-5 h-5 ${statusConfig[selectedOrder.status].color}`} />
                <span className={`font-semibold ${statusConfig[selectedOrder.status].color}`}>
                  {statusConfig[selectedOrder.status].label}
                </span>
              </div>
            </div>

            {/* Products */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Productos</h2>
              <div className="space-y-4">
                {selectedOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{item.name}</h3>
                      <p className="text-sm text-gray-400">{item.brand}</p>
                      <div className="flex items-center gap-4 mt-2">
                        {item.size && (
                          <span className="text-xs text-gray-400">
                            Talla: {item.size}
                          </span>
                        )}
                        <span className="text-xs text-gray-400">
                          Cantidad: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-cyan-400">
                        ${item.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        c/u
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping & Payment Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-white">Dirección de Envío</h3>
                </div>
                <div className="space-y-1 text-gray-400">
                  <p className="text-white font-semibold">{selectedOrder.shippingAddress.fullName}</p>
                  <p>{selectedOrder.shippingAddress.address}</p>
                  <p>
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}{' '}
                    {selectedOrder.shippingAddress.zipCode}
                  </p>
                  <p>{selectedOrder.shippingAddress.country}</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-white">Método de Pago</h3>
                </div>
                <p className="text-gray-400">{selectedOrder.paymentMethod}</p>
                {selectedOrder.trackingNumber && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-sm text-gray-400 mb-1">Número de Seguimiento</p>
                    <p className="font-mono text-cyan-400">{selectedOrder.trackingNumber}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Total */}
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-400/20 rounded-lg p-6 border border-cyan-400/30">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-white">Total</span>
                <span className="text-3xl font-black text-cyan-400">
                  ${selectedOrder.total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Actions */}
            {selectedOrder.status === 'pending' && (
              <div className="mt-6 flex gap-4">
                <Button
                  onClick={() => handleCancelOrder(selectedOrder.id)}
                  variant="outline"
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancelar Pedido
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">
            Mis <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Pedidos</span>
          </h1>
          <p className="text-gray-400 text-lg">
            {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'} en total
          </p>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Package className="w-24 h-24 mx-auto text-gray-700 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">
              No tienes pedidos aún
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Cuando realices tu primera compra, aparecerá aquí para que puedas hacer seguimiento
            </p>
            <Link href="/productos">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-bold">
                Explorar Productos
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => {
              const StatusIcon = statusConfig[order.status].icon;
              
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-cyan-400/30 transition-all"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">
                            {order.id}
                          </h3>
                          <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${statusConfig[order.status].bgColor}`}>
                            <StatusIcon className={`w-4 h-4 ${statusConfig[order.status].color}`} />
                            <span className={`text-sm font-semibold ${statusConfig[order.status].color}`}>
                              {statusConfig[order.status].label}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="text-left lg:text-right">
                        <p className="text-sm text-gray-400 mb-1">Total</p>
                        <p className="text-2xl font-black text-cyan-400">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-6">
                      {order.items.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="object-contain w-full h-full"
                          />
                        </div>
                      ))}
                      {order.items.length > 4 && (
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 font-bold">
                            +{order.items.length - 4}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={() => setSelectedOrder(order)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-bold hover:scale-105 transition-transform"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalles
                      </Button>
                      {order.status === 'delivered' && (
                        <Button
                          variant="outline"
                          className="flex-1 border-white/20 text-white hover:bg-white/5"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Volver a Comprar
                        </Button>
                      )}
                      {order.status === 'pending' && (
                        <Button
                          onClick={() => handleCancelOrder(order.id)}
                          variant="outline"
                          className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}