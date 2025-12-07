'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { useFavoritesStore } from '@/lib/store/favorites-store';
import type { Sneaker } from '@/lib/action/general.actions';
import Link from 'next/link';

interface FavoritesContentProps {
  allSneakers: Sneaker[];
}

const FavoritesContent = ({ allSneakers }: FavoritesContentProps) => {
  // Acceder directamente al array de favoritos
  const favoriteIds = useFavoritesStore((state) => state.favorites);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);

  const favoriteSneakers = useMemo(() => {
    return allSneakers.filter((sneaker) => favoriteIds.includes(sneaker.id));
  }, [allSneakers, favoriteIds]);

  const favoriteCount = favoriteIds.length;

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-5xl lg:text-7xl font-black text-white mb-4">
                Mis Favoritos
              </h1>
              <p className="text-xl text-gray-400">
                {favoriteCount} {favoriteCount === 1 ? 'producto' : 'productos'} guardados
              </p>
            </div>

            {favoriteCount > 0 && (
              <Button
                onClick={clearFavorites}
                variant="outline"
                className="bg-white/5 border-white/10 text-white hover:bg-red-500/20 hover:border-red-500"
              >
                Limpiar Favoritos
              </Button>
            )}
          </div>
        </motion.div>

        {/* Products Grid */}
        {favoriteSneakers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteSneakers.map((sneaker, index) => (
              <ProductCard key={sneaker.id} sneaker={sneaker} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="mb-6">
              <Heart className="w-24 h-24 mx-auto text-gray-700" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              No tienes favoritos aún
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Explora nuestra colección y guarda tus zapatillas favoritas para encontrarlas fácilmente
            </p>
            <Link href="/productos">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-bold">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Explorar Productos
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FavoritesContent;