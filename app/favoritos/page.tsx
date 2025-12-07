import React from 'react';
import FavoritesContent from '@/components/FavoritesContent';
import { getSneakers } from '@/lib/action/general.actions';

export default async function FavoritosPage() {
  const allSneakers = await getSneakers(100);
  
  return <FavoritesContent allSneakers={allSneakers} />;
}