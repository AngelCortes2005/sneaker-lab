import React from 'react'
import dynamic from 'next/dynamic';

import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';


const Reviews = dynamic(() => import('@/components/Reviews'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-800" />
});

const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-800" />
});

const Newsletter = dynamic(() => import('@/components/NewsLetter'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-800" />
});

import { getSneakers } from '@/lib/action/general.actions';

export default async function Home() {
  const sneakers = await getSneakers(8);

  return (
    <>
      <Hero />
      <FeaturedProducts sneakers={sneakers} />
      <Categories />
      <Reviews />
      <Newsletter />
      <FAQ />
    </>
  );
}