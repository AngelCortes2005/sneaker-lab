'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store/user-store';
import OrdersContent from '@/components/OrdersContent';

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useUserStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return <OrdersContent userId={user.id} />;
}