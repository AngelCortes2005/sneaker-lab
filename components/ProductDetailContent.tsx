'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Share2, 
  TruckIcon,
  ShieldCheck,
  RotateCcw,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { useCartStore } from '@/lib/store/cart-store';
import { useFavoritesStore } from '@/lib/store/favorites-store';
import type { Sneaker } from '@/lib/action/general.actions';
import { toast } from 'sonner';

interface ProductDetailContentProps {
  sneaker: Sneaker;
  relatedSneakers: Sneaker[];
}

const ProductDetailContent = ({ sneaker, relatedSneakers }: ProductDetailContentProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const addItem = useCartStore((state) => state.addItem);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(sneaker.id));

  const sizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'];
  const images = [sneaker.image, sneaker.thumbnail, sneaker.image];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Por favor selecciona una talla');
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addItem(sneaker);
    }
    
    toast.success('Agregado al carrito', {
      description: `${sneaker.name} - Talla ${selectedSize}`,
    });
  };

  const handleToggleFavorite = () => {
    toggleFavorite(sneaker.id);
    toast.success(isFavorite ? 'Eliminado de favoritos' : 'Agregado a favoritos', {
      description: sneaker.name,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: sneaker.name,
          text: sneaker.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Enlace copiado al portapapeles');
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            href="/productos"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Volver a productos
          </Link>
        </motion.div>

        {/* Product Detail */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl overflow-hidden border border-white/10">
              {sneaker.image && sneaker.image.startsWith('http') ? (
                <Image
                  src={images[selectedImage]}
                  alt={sneaker.name}
                  fill
                  className="object-contain p-8"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-9xl">👟</span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx 
                      ? 'border-cyan-400 scale-105' 
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  {img && img.startsWith('http') ? (
                    <Image
                      src={img}
                      alt={`${sneaker.name} - ${idx + 1}`}
                      fill
                      className="object-contain p-4"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl">👟</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Brand & Category */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-400 text-black text-sm font-bold rounded-full">
                {sneaker.brand}
              </span>
              <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">
                {sneaker.category}
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-2">
                {sneaker.name}
              </h1>
              <p className="text-gray-400 text-lg">{sneaker.colorway}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(sneaker.rating)
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-white font-semibold">{sneaker.rating}</span>
              <span className="text-gray-400">(128 reseñas)</span>
            </div>

            {/* Price */}
            <div className="py-6 border-y border-white/10">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-black text-white">
                  ${sneaker.price.toFixed(2)}
                </span>
                {sneaker.retailPrice > sneaker.price && (
                  <span className="text-2xl text-gray-500 line-through">
                    ${sneaker.retailPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-green-400 mt-2">
                Ahorras ${(sneaker.retailPrice - sneaker.price).toFixed(2)}
              </p>
            </div>

            {/* Color Options */}
            <div>
              <h3 className="text-white font-semibold mb-3">Colores disponibles</h3>
              <div className="flex gap-3">
                {sneaker.colors.map((color, idx) => (
                  <button
                    key={idx}
                    className="w-10 h-10 rounded-full border-2 border-white/20 hover:border-white/60 transition-all hover:scale-110"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-white font-semibold mb-3">Selecciona tu talla (US)</h3>
              <div className="grid grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg border-2 font-semibold transition-all ${
                      selectedSize === size
                        ? 'border-cyan-400 bg-cyan-400/20 text-cyan-400'
                        : 'border-white/10 text-white hover:border-white/30'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-white font-semibold mb-3">Cantidad</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                >
                  -
                </Button>
                <span className="text-white font-bold text-xl w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-bold text-lg py-6 hover:scale-105 transition-transform"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Agregar al Carrito
              </Button>
              <Button
                onClick={handleToggleFavorite}
                variant="outline"
                size="icon"
                className={`py-6 px-6 ${
                  isFavorite 
                    ? 'bg-red-500/20 border-red-500 text-red-500' 
                    : 'bg-white/5 border-white/10 text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : ''}`} />
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                size="icon"
                className="py-6 px-6 bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="flex flex-col items-center text-center p-4 bg-white/5 rounded-lg">
                <TruckIcon className="w-8 h-8 text-cyan-400 mb-2" />
                <span className="text-white text-sm font-semibold">Envío Gratis</span>
                <span className="text-gray-400 text-xs">En compras +$100</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white/5 rounded-lg">
                <ShieldCheck className="w-8 h-8 text-cyan-400 mb-2" />
                <span className="text-white text-sm font-semibold">Garantía</span>
                <span className="text-gray-400 text-xs">100% Original</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white/5 rounded-lg">
                <RotateCcw className="w-8 h-8 text-cyan-400 mb-2" />
                <span className="text-white text-sm font-semibold">Devoluciones</span>
                <span className="text-gray-400 text-xs">30 días</span>
              </div>
            </div>

            {/* Description */}
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-white font-bold text-xl mb-3">Descripción</h3>
              <p className="text-gray-400 leading-relaxed">
                {sneaker.description || sneaker.story}
              </p>
            </div>

            {/* Product Details */}
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-white font-bold text-xl mb-4">Detalles del Producto</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">SKU:</span>
                  <span className="text-white ml-2 font-semibold">{sneaker.sku}</span>
                </div>
                <div>
                  <span className="text-gray-400">Style ID:</span>
                  <span className="text-white ml-2 font-semibold">{sneaker.styleID}</span>
                </div>
                <div>
                  <span className="text-gray-400">Género:</span>
                  <span className="text-white ml-2 font-semibold">{sneaker.gender}</span>
                </div>
                <div>
                  <span className="text-gray-400">Fecha de Lanzamiento:</span>
                  <span className="text-white ml-2 font-semibold">{sneaker.releaseDate}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedSneakers.length > 0 && (
          <div>
            <h2 className="text-4xl font-black text-white mb-8">
              Productos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedSneakers.map((product, index) => (
                <ProductCard key={product.id} sneaker={product} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailContent;