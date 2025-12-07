'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { searchSneakers } from '@/lib/action/general.actions';
import type { Sneaker } from '@/lib/action/general.actions';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Sneaker[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const trendingSearches = ['Jordan 1', 'Yeezy', 'Dunk Low', 'Air Max'];

  useEffect(() => {
    // Cargar búsquedas recientes
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Click fuera para cerrar
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchProducts = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const products = await searchSneakers(query, 5);
        setResults(products);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Guardar en búsquedas recientes
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
    setIsOpen(false);
    setQuery('');
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <div ref={searchRef} className="relative">
      {/* Search Button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="ghost"
        size="icon"
        className="text-white hover:text-cyan-400"
      >
        <Search className="w-5 h-5" />
      </Button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Search Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Search Input */}
              <div className="p-6 border-b border-white/10">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Buscar zapatillas..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-12 pr-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-14 text-lg"
                    autoFocus
                  />
                  {query && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {isLoading ? (
                  <div className="p-8 text-center">
                    <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Buscando...</p>
                  </div>
                ) : query.length >= 2 && results.length > 0 ? (
                  <div className="p-4 space-y-2">
                    {results.map((sneaker) => (
                      <Link
                        key={sneaker.id}
                        href={`/productos/${sneaker.id}`}
                        onClick={() => handleSearch(query)}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                          {sneaker.image && sneaker.image.startsWith('http') ? (
                            <Image
                              src={sneaker.thumbnail || sneaker.image}
                              alt={sneaker.name}
                              width={64}
                              height={64}
                              className="object-contain"
                            />
                          ) : (
                            <span className="text-2xl">👟</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold group-hover:text-cyan-400 transition-colors truncate">
                            {sneaker.name}
                          </h4>
                          <p className="text-sm text-gray-400">{sneaker.brand}</p>
                        </div>
                        <span className="text-white font-bold">${sneaker.price}</span>
                      </Link>
                    ))}
                  </div>
                ) : query.length >= 2 ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-400">No se encontraron resultados</p>
                  </div>
                ) : (
                  <div className="p-6 space-y-6">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div>
                        <h3 className="text-white font-semibold mb-3">Búsquedas recientes</h3>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => setQuery(search)}
                              className="px-3 py-1.5 bg-white/5 text-gray-300 rounded-full text-sm hover:bg-white/10 transition-colors"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Trending Searches */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-5 h-5 text-cyan-400" />
                        <h3 className="text-white font-semibold">Búsquedas populares</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => setQuery(search)}
                            className="px-3 py-1.5 bg-gradient-to-r from-blue-600/20 to-cyan-400/20 text-cyan-400 rounded-full text-sm hover:from-blue-600/30 hover:to-cyan-400/30 transition-colors border border-cyan-400/30"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;