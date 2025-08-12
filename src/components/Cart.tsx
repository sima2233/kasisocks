import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XIcon, MinusIcon, PlusIcon, SendIcon, TrashIcon } from 'lucide-react';
import { Product } from '../types';
interface CartProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  cartItems: {
    product: Product;
    quantity: number;
  }[];
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}
const Cart = ({
  isOpen,
  setIsOpen,
  cartItems,
  removeFromCart,
  updateQuantity
}: CartProps) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the order to your backend
    // For now, we'll just simulate a successful order
    setTimeout(() => {
      setOrderSuccess(true);
    }, 1500);
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
    <div className="bg-white w-full max-w-md h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-serif text-xl font-bold">Your Cart</h2>
        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black">
          <XIcon size={24} />
        </button>
      </div>
      {cartItems.length === 0 ? <div className="flex-grow flex flex-col items-center justify-center p-6">
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <button onClick={() => setIsOpen(false)} className="bg-black text-white py-2 px-4 font-medium hover:bg-gray-800 transition-colors">
          Continue Shopping
        </button>
      </div> : orderSuccess ? <div className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center mb-6 w-full">
          <h3 className="font-serif text-xl font-bold text-green-700 mb-2">
            Order Received!
          </h3>
          <p className="text-gray-700 mb-4">
            Thank you for your order. We've sent your order details to your
            email.
          </p>
          <p className="text-gray-700">
            Our team will contact you shortly to confirm your order.
          </p>
        </div>
        <button onClick={() => {
          setIsOpen(false);
          setOrderSuccess(false);
          setIsCheckingOut(false);
        }} className="bg-black text-white py-2 px-4 font-medium hover:bg-gray-800 transition-colors">
          Continue Shopping
        </button>
      </div> : isCheckingOut ? <div className="flex-grow overflow-y-auto p-4">
        <h3 className="font-serif text-lg font-medium mb-4">Checkout</h3>
        <form onSubmit={handleCheckout}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name *
            </label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-sm" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address *
            </label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded-sm" required />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number *
            </label>
            <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-2 border border-gray-300 rounded-sm" required />
          </div>
          <div className="mb-6">
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Delivery Address *
            </label>
            <textarea id="address" value={address} onChange={e => setAddress(e.target.value)} rows={3} className="w-full p-2 border border-gray-300 rounded-sm" required></textarea>
          </div>
          <div className="border-t border-gray-200 pt-4 mb-4">
            <div className="flex justify-between font-medium">
              <span>Subtotal</span>
              <span>N${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Shipping</span>
              <span>Calculated at next step</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setIsCheckingOut(false)} className="flex-1 border border-gray-300 py-2 px-4 text-gray-700 hover:bg-gray-50 transition-colors">
              Back to Cart
            </button>
            <button type="submit" className="flex-1 bg-black text-white py-2 px-4 font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              <SendIcon size={16} />
              Place Order
            </button>
          </div>
        </form>
      </div> : <>
        <div className="flex-grow overflow-y-auto p-4">
          {cartItems.map(item => <div key={item.product.id} className="flex mb-4 pb-4 border-b border-gray-200">
            <div className="w-20 h-20 overflow-hidden rounded-md flex-shrink-0">
              <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
            </div>
            <div className="ml-4 flex-grow">
              <h3 className="font-medium">{item.product.name}</h3>
              <p className="text-gray-500 text-sm">
                Size: {item.product.sizes[0]}
              </p>
              <div className="mt-2 flex justify-between items-center">
                <div className="flex items-center border border-gray-300">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2 py-1 text-gray-500 hover:text-black" disabled={item.quantity <= 1}>
                    <MinusIcon size={16} />
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1 text-gray-500 hover:text-black">
                    <PlusIcon size={16} />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.product.id)} className="text-gray-500 hover:text-red-500">
                  <TrashIcon size={16} />
                </button>
              </div>
            </div>
            <div className="ml-4">
              <p className="font-medium">
                N${item.product.price.toFixed(2)}
              </p>
            </div>
          </div>)}
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Subtotal</span>
            <span className="font-medium">N${subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={() => {
              if (cartItems.length > 0) {
                setIsOpen(false);
                navigate('/checkout');
              }
            }}
            className={`w-full bg-black text-white py-3 px-4 font-medium hover:bg-gray-800 transition-colors${cartItems.length === 0 ? ' opacity-50 cursor-not-allowed' : ''}`}
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
          <button onClick={() => setIsOpen(false)} className="w-full text-gray-600 py-2 mt-2 hover:text-black transition-colors">
            Continue Shopping
          </button>
        </div>
      </>}
    </div>
  </div>;
};
export default Cart;