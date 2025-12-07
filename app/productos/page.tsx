import React from 'react';
import ProductsContent from '@/components/ProductsContent';
import { getSneakers, getPopularBrands } from '@/lib/action/general.actions';

export default async function ProductosPage() {
  const [sneakers, brands] = await Promise.all([
    getSneakers(50),
    getPopularBrands(),
  ]);

  return <ProductsContent initialSneakers={sneakers} brands={brands} />;
}