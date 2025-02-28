import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Product, OrderItem, Order } from '../../types';
import { ShoppingCart, Plus, Minus, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const API_URL = 'http://localhost:3000/api/v1';

// Dummy data
const dummyProducts = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella, basil, and olive oil',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3',
    restaurantId: 'rest1'
  },
  {
    id: '2',
    name: 'Classic Burger',
    description: 'Beef patty, lettuce, tomato, cheese, and special sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    restaurantId: 'rest1'
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Romaine lettuce, croutons, parmesan, and caesar dressing',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1',
    restaurantId: 'rest1'
  }
];

const dummyOrders = [
  {
    id: '123456',
    customerId: 'user1',
    restaurantId: 'rest1',
    status: 'pending',
    total: 37.97,
    items: [
      { productId: '1', productName: 'Margherita Pizza', quantity: 1, price: 14.99 },
      { productId: '2', productName: 'Classic Burger', quantity: 2, price: 11.49 }
    ],
    createdAt: '2024-01-20T10:30:00Z'
  },
  {
    id: '123457',
    customerId: 'user1',
    restaurantId: 'rest1',
    status: 'completed',
    total: 24.98,
    items: [
      { productId: '3', productName: 'Caesar Salad', quantity: 2, price: 12.49 }
    ],
    createdAt: '2024-01-19T15:45:00Z'
  }
];

function CustomerDashboard() {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(dummyOrders as Order[]);
  const [loading, setLoading] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'orders'>('menu');

  useEffect(() => {
    if (!currentUser) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/products`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
        // Fallback to dummy data
        setProducts(dummyProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentUser]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.productId === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.productId === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, {
          productId: product.id,
          productName: product.name,
          quantity: 1,
          price: product.price
        }];
      }
    });
    
    toast.success(`Added ${product.name} to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.productId === productId);
      
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item => 
          item.productId === productId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      } else {
        return prevCart.filter(item => item.productId !== productId);
      }
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeOrder = async () => {
    if (cart.length === 0 || !currentUser) return;

    try {
      const restaurantId = products.find(p => p.id === cart[0].productId)?.restaurantId;
      
      if (!restaurantId) {
        toast.error('Could not determine restaurant for this order');
        return;
      }

      const orderData = {
        customerId: currentUser.uid,
        restaurantId,
        totalAmount: getCartTotal(),
        items: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      };
      
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      setCart([]);
      setShowCart(false);
      toast.success('Order placed successfully!');
      setActiveTab('orders');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    }
  };

  const getStatusBadge = (status: string) => {
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
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === 'menu'
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('menu')}
            >
              Menu
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === 'orders'
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('orders')}
            >
              My Orders
            </button>
          </div>
          
          {activeTab === 'menu' && (
            <div className="relative">
              <button 
                onClick={() => setShowCart(!showCart)}
                className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart ({cart.reduce((total, item) => total + item.quantity, 0)})</span>
              </button>
              
              {showCart && cart.length > 0 && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Your Cart</h3>
                  </div>
                  
                  <div className="p-4 max-h-80 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.productId} className="flex justify-between items-center py-2">
                        <div>
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => removeFromCart(item.productId)}
                            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span>{item.quantity}</span>
                          <button 
                            onClick={() => addToCart(products.find(p => p.id === item.productId)!)}
                            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex justify-between mb-4">
                      <span className="font-medium">Total:</span>
                      <span className="font-bold">${getCartTotal()}</span>
                    </div>
                    
                    <button 
                      onClick={placeOrder}
                      className="w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {activeTab === 'menu' ? (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Menu</h1>
            
            {products.length === 0 ? (
              <div className="bg-white shadow-md rounded-lg p-8 text-center">
                <p className="text-gray-500">No products available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img 
                      src={product.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                      
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                        <button 
                          onClick={() => addToCart(product)}
                          className="flex items-center space-x-1 bg-orange-600 text-white px-3 py-1 rounded-md hover:bg-orange-700"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
            
            {orders.length === 0 ? (
              <div className="bg-white shadow-md rounded-lg p-8 text-center">
                <p className="text-gray-500">You haven't placed any orders yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
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
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ${order.total}
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
                                ${(item.price * item.quantity)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CustomerDashboard;