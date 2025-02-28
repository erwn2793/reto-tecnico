import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { Lock, Mail, User, Store } from 'lucide-react';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      await register(email, password, role, name);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create an account');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Create an Account</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="John Doe"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="your@email.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div
              className={`flex items-center justify-center p-4 border rounded-md cursor-pointer ${
                role === 'customer' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-300 hover:border-orange-300'
              }`}
              onClick={() => setRole('customer')}
            >
              <User className={`w-5 h-5 mr-2 ${role === 'customer' ? 'text-orange-600' : 'text-gray-500'}`} />
              <span className={role === 'customer' ? 'text-orange-600 font-medium' : 'text-gray-700'}>
                Customer
              </span>
            </div>
            <div
              className={`flex items-center justify-center p-4 border rounded-md cursor-pointer ${
                role === 'restaurant' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-300 hover:border-orange-300'
              }`}
              onClick={() => setRole('restaurant')}
            >
              <Store className={`w-5 h-5 mr-2 ${role === 'restaurant' ? 'text-orange-600' : 'text-gray-500'}`} />
              <span className={role === 'restaurant' ? 'text-orange-600 font-medium' : 'text-gray-700'}>
                Restaurant
              </span>
            </div>
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition-colors disabled:bg-orange-300"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-orange-600 hover:text-orange-800">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;