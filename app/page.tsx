import React from 'react'
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import Reviews from '@/components/Reviews';
import Newsletter from '@/components/NewsLetter';
import FAQ from '@/components/FAQ';
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