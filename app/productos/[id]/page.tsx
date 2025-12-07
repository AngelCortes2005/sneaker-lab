import { notFound } from 'next/navigation';
import ProductDetailContent from '@/components/ProductDetailContent';
import { getSneakerById, getSneakers } from '@/lib/action/general.actions';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const sneakers = await getSneakers(50);
  
  return sneakers.map((sneaker) => ({
    id: sneaker.id,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await params en Next.js 15+
  const { id } = await params;
  const sneaker = await getSneakerById(id);

  if (!sneaker) {
    notFound();
  }

  const relatedSneakers = await getSneakers(4);

  return <ProductDetailContent sneaker={sneaker} relatedSneakers={relatedSneakers} />;
}