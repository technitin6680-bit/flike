'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth-provider';
import Link from 'next/link';
import Image from 'next/image';

interface Order {
  id: number;
  status: string;
  websiteName: string;
  websiteType: string;
  totalEstimatedCost: number;
  createdAt: string;
}

export default function DashboardPage() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      setOrdersLoading(true);
      try {
        const token = await user.getIdToken();
        const res = await fetch('/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setOrdersLoading(false);
      }
    }
    fetchOrders();
  }, [user]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h1 className="text-3xl font-heading font-bold mb-4">Client Portal</h1>
        <p className="text-gray-500 mb-8 max-w-md text-center">Login to track your website orders, communicate with the team, and view invoices.</p>
        <button 
          onClick={signInWithGoogle} 
          className="bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded-lg shadow-sm hover:bg-gray-50 font-medium flex items-center gap-3 transition-colors"
        >
          <Image src="https://www.google.com/favicon.ico" alt="Google" width={20} height={20} />
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-heading font-bold">Flike Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600">{user.email}</span>
          <button onClick={signOut} className="text-sm text-red-600 hover:text-red-700 font-medium">Log out</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Your Projects</h2>
          <Link href="/order" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
            New Project
          </Link>
        </div>

        {ordersLoading ? (
          <div className="text-gray-500">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-500 mb-6">Start a new website project to see track its progress here.</p>
            <Link href="/order" className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-md font-medium hover:bg-blue-700 transition">
              Start Project
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{order.websiteName}</h3>
                    <p className="text-sm text-gray-500">{order.websiteType}</p>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'Submitted' ? 'bg-gray-100 text-gray-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Est. ₹{order.totalEstimatedCost}</span>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium font-heading">
                    View Details &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
