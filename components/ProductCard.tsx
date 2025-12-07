'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ElectricBorder from '@/components/ElectricBorder';
import { useCartStore } from '@/lib/store/cart-store';
import { useFavoritesStore } from '@/lib/store/favorites-store';
import type { Sneaker } from '@/lib/action/general.actions';
import { toast } from 'sonner';

interface ProductCardProps {
  sneaker: Sneaker;
  index?: number;
}

const ProductCard = ({ sneaker, index = 0 }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(sneaker.id));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(sneaker);
    toast.success('Agregado al carrito', {
      description: sneaker.name,
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(sneaker.id);
    toast.success(isFavorite ? 'Eliminado de favoritos' : 'Agregado a favoritos', {
      description: sneaker.name,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <ElectricBorder color="#7df9ff" speed={0.8} chaos={0.2} thickness={2}>
        <Link href={`/productos/${sneaker.id}`} className="block">
          <div className="bg-gradient-to-br from-black/80 to-gray-900/60 backdrop-blur-sm overflow-hidden group">
            {/* Product Image */}
            <div className="relative h-64 bg-gradient-to-br from-gray-800/50 to-gray-900/50 overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              
              <div className="w-full h-full flex items-center justify-center p-4 group-hover:scale-110 transition-transform duration-500">
                {sneaker.image && sneaker.image.startsWith('http') ? (
                  <Image
                    src={sneaker.image}
                    alt={sneaker.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-6xl">👟</div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={handleToggleFavorite}
                  className="p-2 bg-black/60 backdrop-blur-sm hover:bg-black/80 rounded-lg transition-all"
                >
                  <Heart 
                    className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                  />
                </button>
                <div className="p-2 bg-black/60 backdrop-blur-sm hover:bg-black/80 rounded-lg transition-all">
                  <Eye className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-[#7df9ff] text-black text-xs font-bold rounded-full">
                  {sneaker.category}
                </span>
              </div>

              {/* Gender Badge */}
              {sneaker.gender && (
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
                    {sneaker.gender}
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  {sneaker.brand}
                </p>
                <h3 className="text-lg font-bold text-white line-clamp-1 hover:text-cyan-400 transition-colors">
                  {sneaker.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{sneaker.colorway}</p>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(sneaker.rating)
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-400 ml-1">
                  ({sneaker.rating})
                </span>
              </div>

              {/* Color Options */}
              <div className="flex gap-2">
                {sneaker.colors.slice(0, 3).map((color, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => e.preventDefault()}
                    className="w-6 h-6 rounded-full border-2 border-white/20 hover:border-white/60 transition-colors"
                    style={{ backgroundColor: color }}
                  />
                ))}
                {sneaker.colors.length > 3 && (
                  <div className="w-6 h-6 rounded-full border-2 border-white/20 flex items-center justify-center text-xs text-gray-400">
                    +{sneaker.colors.length - 3}
                  </div>
                )}
              </div>

              {/* Price and CTA */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-2xl font-bold text-white">
                    ${sneaker.price.toFixed(2)}
                  </span>
                </div>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-[#7df9ff] text-black font-bold hover:scale-105 transition-transform"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Añadir
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </ElectricBorder>
    </motion.div>
  );
};

export default ProductCard;