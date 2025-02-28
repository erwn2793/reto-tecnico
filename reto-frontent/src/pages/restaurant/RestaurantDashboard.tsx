import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, where, onSnapshot, doc, updateDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Order, OrderStatus, Product } from '../../types';
import { Clock, CheckCircle, AlertCircle, Edit, Trash } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import ProductForm from './ProductForm';

function RestaurantDashboard() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const [showProductForm, setShowProductForm] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    // Fetch orders
    const ordersRef = collection(db, 'orders');
    const ordersQuery = query(
      ordersRef,
      where('restaurantId', '==', currentUser.uid),
      where('status', 'in', ['pending', 'preparing', 'ready'])
    );

    const unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
      const ordersData: Order[] = [];
      snapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() } as Order);
      });
      
      // Sort by status and creation date
      ordersData.sort((a, b) => {
        const statusOrder = { pending: 0, preparing: 1, ready: 2 };
        if (statusOrder[a.status] !== statusOrder[b.status]) {
          return statusOrder[a.status] - statusOrder[b.status];
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      
      setOrders(ordersData);
    });

    // Fetch products
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const productsQuery = query(productsRef, where('restaurantId', '==', currentUser.uid));
        
        const unsubscribeProducts = onSnapshot(productsQuery, (snapshot) => {
          const productsData: Product[] = [];
          snapshot.forEach((doc) => {
            productsData.push({ id: doc.id, ...doc.data() } as Product);
          });
          setProducts(productsData);
        });
        
        return unsubscribeProducts;
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
        return () => {};
      }
    };

    const unsubscribeProductsPromise = fetchProducts();

    return () => {
      unsubscribeOrders();
      unsubscribeProductsPromise.then(unsubscribe => unsubscribe());
    };
  }, [currentUser]);

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
      
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const deleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await deleteDoc(doc(db, 'products', productId));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-4 h-4 mr-1" />
            Pending
          </span>
        );
      case 'preparing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-4 h-4 mr-1" />
            Preparing
          </span>
        );
      case 'ready':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            Ready
          </span>
        );
      default:
        return null;
    }
  };

  const refreshProducts = async () => {
    if (!currentUser) return;
    
    try {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('restaurantId', '==', currentUser.uid));
      const snapshot = await getDocs(q);
      
      const productsData: Product[] = [];
      snapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() } as Product);
      });
      
      setProducts(productsData);
    } catch (error) {
      console.error('Error refreshing products:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Restaurant Dashboard</h1>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === 'orders'
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('orders')}
            >
              Orders
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === 'products'
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
          </div>
        </div>

        {activeTab === 'orders' ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Active Orders</h2>
            </div>
            
            {orders.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No active orders at the moment.
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <div key={order.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900 mr-3">
                            Order #{order.id.slice(-6)}
                          </h3>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {format(new Date(order.createdAt), 'MMM d, yyyy h:mm a')}
                        </p>
                        <p className="text-sm font-medium text-gray-700 mt-1">
                          Customer: {order.customerName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-gray-50 rounded-md p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Order Items:</h4>
                      <ul className="space-y-2">
                        {order.items.map((item, index) => (
                          <li key={index} className="flex justify-between">
                            <span>
                              {item.quantity} x {item.productName}
                            </span>
                            <span className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-6 flex justify-end space-x-3">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Start Preparing
                        </button>
                      )}
                      
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Mark as Ready
                        </button>
                      )}
                      
                      {order.status === 'ready' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                        >
                          Complete Order
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Your Products</h2>
              <button 
                onClick={() => setShowProductForm(true)}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                Add New Product
              </button>
            </div>
            
            {products.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <p>You haven't added any products yet.</p>
                <p className="mt-2">Click "Add New Product" to get started.</p>
              </div>
            ) : (
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="border rounded-lg overflow-hidden flex">
                    <img 
                      src={product.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'} 
                      alt={product.name}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => deleteProduct(product.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {showProductForm && (
        <ProductForm 
          onClose={() => setShowProductForm(false)} 
          onSuccess={refreshProducts}
        />
      )}
    </div>
  );
}

export default RestaurantDashboard;