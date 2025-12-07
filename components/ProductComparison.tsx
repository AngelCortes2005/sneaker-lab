'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, GitCompare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import type { Sneaker } from '@/lib/action/general.actions';

interface ProductComparisonProps {
  allSneakers: Sneaker[];
}

const ProductComparison = ({ allSneakers }: ProductComparisonProps) => {
  const [selectedProducts, setSelectedProducts] = useState<Sneaker[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addProduct = (product: Sneaker) => {
    if (selectedProducts.length < 3 && !selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const removeProduct = (id: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== id));
  };

  return (
    <>
      {/* Floating Compare Button */}
      <AnimatePresence>
        {selectedProducts.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-bold shadow-2xl relative"
              size="lg"
            >
              <GitCompare className="w-5 h-5 mr-2" />
              Comparar ({selectedProducts.length})
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {selectedProducts.length}
              </span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-y-auto"
          >
            <div className="container mx-auto px-6 py-12">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-white">
                  Comparación de Productos
                </h2>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="icon"
                  className="text-white"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 relative"
                  >
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="absolute top-4 right-4 w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-full flex items-center justify-center"
                    >
                      <X className="w-4 h-4 text-red-400" />
                    </button>

                    <div className="relative h-48 mb-4">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                          👟
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h3 className="text-white font-bold text-lg">{product.name}</h3>
                        <p className="text-gray-400 text-sm">{product.brand}</p>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Precio:</span>
                          <span className="text-cyan-400 font-bold">${product.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Categoría:</span>
                          <span className="text-white">{product.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Rating:</span>
                          <span className="text-white">{product.rating}/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Género:</span>
                          <span className="text-white">{product.gender || 'Unisex'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add More Placeholder */}
                {selectedProducts.length < 3 && (
                  <div className="bg-white/5 border-2 border-dashed border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[400px]">
                    <Plus className="w-12 h-12 text-gray-600 mb-4" />
                    <p className="text-gray-400 text-center">
                      Agrega hasta {3 - selectedProducts.length} productos más para comparar
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductComparison;