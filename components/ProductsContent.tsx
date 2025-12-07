'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/ProductCard';
import type { Sneaker } from '@/lib/action/general.actions';

interface ProductsContentProps {
  initialSneakers: Sneaker[];
  brands: string[];
}

const ProductsContent = ({ initialSneakers, brands }: ProductsContentProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Lifestyle', 'Running', 'Basketball', 'Training'];

  const filteredSneakers = useMemo(() => {
    return initialSneakers.filter((sneaker) => {
      const matchesSearch = sneaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sneaker.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBrand = !selectedBrand || sneaker.brand === selectedBrand;
      const matchesCategory = !selectedCategory || sneaker.category === selectedCategory;
      const matchesPrice = sneaker.price >= priceRange[0] && sneaker.price <= priceRange[1];

      return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
    });
  }, [initialSneakers, searchQuery, selectedBrand, selectedCategory, priceRange]);

  const clearFilters = () => {
    setSelectedBrand(null);
    setSelectedCategory(null);
    setPriceRange([0, 500]);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-4">
            Todos los Productos
          </h1>
          <p className="text-xl text-gray-400">
            Descubre nuestra colección completa de {initialSneakers.length} zapatillas
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar zapatillas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-6"
            >
              {/* Brands */}
              <div>
                <h3 className="text-white font-semibold mb-3">Marca</h3>
                <div className="flex flex-wrap gap-2">
                  {brands.map((brand) => (
                    <Button
                      key={brand}
                      onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                      variant={selectedBrand === brand ? 'default' : 'outline'}
                      size="sm"
                      className={selectedBrand === brand 
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-400 text-black'
                        : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                      }
                    >
                      {brand}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-white font-semibold mb-3">Categoría</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      className={selectedCategory === category 
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-400 text-black'
                        : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-white font-semibold mb-3">
                  Rango de Precio: ${priceRange[0]} - ${priceRange[1]}
                </h3>
                <div className="flex gap-4">
                  <Input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                onClick={clearFilters}
                variant="outline"
                className="w-full bg-white/5 text-white border-white/10 hover:bg-white/10"
              >
                <X className="w-4 h-4 mr-2" />
                Limpiar Filtros
              </Button>
            </motion.div>
          )}
        </div>

        {/* Active Filters */}
        {(selectedBrand || selectedCategory || searchQuery) && (
          <div className="mb-6 flex flex-wrap gap-2">
            {searchQuery && (
              <div className="px-3 py-1 bg-white/10 text-white rounded-full text-sm flex items-center gap-2">
                Búsqueda: "{searchQuery}"
                <button onClick={() => setSearchQuery('')}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            {selectedBrand && (
              <div className="px-3 py-1 bg-white/10 text-white rounded-full text-sm flex items-center gap-2">
                Marca: {selectedBrand}
                <button onClick={() => setSelectedBrand(null)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            {selectedCategory && (
              <div className="px-3 py-1 bg-white/10 text-white rounded-full text-sm flex items-center gap-2">
                Categoría: {selectedCategory}
                <button onClick={() => setSelectedCategory(null)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results Count */}
        <p className="text-gray-400 mb-6">
          {filteredSneakers.length} {filteredSneakers.length === 1 ? 'resultado' : 'resultados'}
        </p>

        {/* Products Grid */}
        {filteredSneakers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSneakers.map((sneaker, index) => (
              <ProductCard key={sneaker.id} sneaker={sneaker} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-gray-400 mb-6">
              Intenta ajustar tus filtros o búsqueda
            </p>
            <Button
              onClick={clearFilters}
              className="bg-gradient-to-r from-blue-600 to-cyan-400 text-black"
            >
              Limpiar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsContent;