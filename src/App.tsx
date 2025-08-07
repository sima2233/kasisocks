import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import MyListPage from './pages/MyListPage';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import { Product } from './types';
export function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<{
    product: Product;
    quantity: number;
  }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item => item.product.id === product.id ? {
          ...item,
          quantity: item.quantity + quantity
        } : item);
      } else {
        // Add new item
        return [...prevItems, {
          product,
          quantity
        }];
      }
    });
    setIsCartOpen(true);
  };
  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };
  const updateCartItemQuantity = (productId: number, quantity: number) => {
    setCartItems(prevItems => prevItems.map(item => item.product.id === productId ? {
      ...item,
      quantity: Math.max(1, quantity)
    } : item));
  };
  const toggleWishlist = (productId: number) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter(id => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };
  const isInWishlist = (productId: number) => {
    return wishlist.includes(productId);
  };
  return <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar cartItemsCount={cartItems.reduce((total, item) => total + item.quantity, 0)} setIsCartOpen={setIsCartOpen} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage setSelectedProduct={setSelectedProduct} addToCart={addToCart} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist} />} />
            <Route path="/catalogue" element={<CataloguePage setSelectedProduct={setSelectedProduct} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist} />} />
            <Route path="/my-list" element={<MyListPage setSelectedProduct={setSelectedProduct} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
          </Routes>
        </main>
        <Footer />
        {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} addToCart={addToCart} />}
        <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateCartItemQuantity} />
      </div>
    </BrowserRouter>;
}