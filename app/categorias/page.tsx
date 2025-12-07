import React from 'react';
import CategoriesContent from '@/components/CategoriesContent';
import { getSneakers } from '@/lib/action/general.actions';

export default async function CategoriasPage() {
  const sneakers = await getSneakers(50);
  
  return <CategoriesContent sneakers={sneakers} />;
}