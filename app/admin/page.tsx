'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth-provider';

interface Order {
  id: number;
  status: string;
  websiteName: string;
  websiteType: string;
  totalEstimatedCost: number;
  mobileNumber: string;
  emailAddress: string;
  createdAt: string;
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Can check role via API

  useEffect(() => {
    async function checkAndFetch() {
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
          // If the user's role is admin they see all orders
          setOrders(data.orders);
          setIsAdmin(true); 
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setOrdersLoading(false);
      }
    }
    checkAndFetch();
  }, [user]);

  if (loading || ordersLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user || !isAdmin) {
    return <div className="min-h-screen flex items-center justify-center p-4 text-center">
      <div>
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-gray-500">You do not have administrative privileges to view this page.</p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-heading font-bold flex items-center gap-2">
          Flike Admin
          <span className="bg-blue-600 text-xs px-2 py-0.5 rounded uppercase tracking-wider font-bold">Portal</span>
        </h1>
        <span className="text-sm text-gray-400">{user.email}</span>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-6 border rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
            <p className="text-3xl font-bold mt-2">{orders.length}</p>
          </div>
          <div className="bg-white p-6 border rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Active Projects</h3>
            <p className="text-3xl font-bold mt-2 text-blue-600">{orders.filter(o => o.status !== 'Delivered').length}</p>
          </div>
          <div className="bg-white p-6 border rounded-xl shadow-sm">
             <h3 className="text-gray-500 text-sm font-medium">Revenue Estimated</h3>
             <p className="text-3xl font-bold mt-2 text-green-600">₹{orders.reduce((a, b) => a + b.totalEstimatedCost, 0).toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 border rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Pending Reviews</h3>
            <p className="text-3xl font-bold mt-2 text-amber-600">{orders.filter(o => o.status === 'Submitted').length}</p>
          </div>
        </div>

        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-500 border-b">
                <tr>
                  <th className="px-6 py-3 font-medium">Order ID</th>
                  <th className="px-6 py-3 font-medium">Project</th>
                  <th className="px-6 py-3 font-medium">Client Info</th>
                  <th className="px-6 py-3 font-medium">Estimate</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50/50">
                     <td className="px-6 py-4 font-mono text-xs text-gray-500">#{order.id.toString().padStart(5, '0')}</td>
                     <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{order.websiteName}</div>
                        <div className="text-gray-500 text-xs">{order.websiteType}</div>
                     </td>
                     <td className="px-6 py-4">
                        <div>{order.emailAddress}</div>
                        <div className="text-gray-500 text-xs">{order.mobileNumber}</div>
                     </td>
                     <td className="px-6 py-4 font-medium text-gray-900">₹{order.totalEstimatedCost.toLocaleString()}</td>
                     <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
                          {order.status}
                        </span>
                     </td>
                     <td className="px-6 py-4 text-right">
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-xs uppercase tracking-wider">Manage</button>
                     </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
