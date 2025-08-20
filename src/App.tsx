import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CheckoutPage from './pages/CheckoutPage';
import InvoicePage from './pages/InvoicePage';
import Navbar from './components/Navbar';
import AdminOrdersPage from './pages/AdminOrdersPage';
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import MyListPage from './pages/MyListPage';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import AuthForm from './components/AuthForm';
import Popup from './components/Popup';
import { useCurrentUser } from './hooks/useCurrentUser';
import { usePopup } from './hooks/usePopup';
import { Product } from './types';
import AdminPage from './pages/AdminPage';
import { RequireAdmin } from './components/RequireAdmin';
export function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<{
    product: Product;
    quantity: number;
  }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { popupState, showPopup, hidePopup } = usePopup();
  const cartButtonRef = React.useRef<HTMLButtonElement>(null);
  const user = useCurrentUser();
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
  const showLoginPopup = (targetElement: HTMLElement | null = null) => {
    // If no specific target element, use the cart button as default
    const popupTarget = targetElement || cartButtonRef.current;
    showPopup('Please log in to use this feature.', popupTarget, 'info');
  };
  const addToCart = (product: Product, quantity: number = 1, targetElement: HTMLElement | null = null) => {
    if (!user) {
      // For login popup, always show next to cart icon (don't pass targetElement)
      showLoginPopup();
      return;
    }
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
  const toggleWishlist = (productId: number, targetElement: HTMLElement | null = null) => {
    if (!user) {
      // For wishlist popup, show next to the heart that was clicked
      showLoginPopup(targetElement);
      return;
    }
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
  const clearCart = () => setCartItems([]);
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar
          cartItemsCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
          setIsCartOpen={setIsCartOpen}
          cartButtonRef={cartButtonRef}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/auth" element={<AuthForm />} />
            <Route path="/admin" element={<RequireAdmin><AdminPage /></RequireAdmin>} />
            <Route path="/admin/orders" element={<RequireAdmin><AdminOrdersPage /></RequireAdmin>} />
            <Route path="/" element={<HomePage setSelectedProduct={setSelectedProduct} addToCart={addToCart} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist} />} />
            <Route path="/catalogue" element={<CataloguePage setSelectedProduct={setSelectedProduct} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist} />} />
            <Route path="/my-list" element={<MyListPage setSelectedProduct={setSelectedProduct} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} clearCart={clearCart} />} />
            <Route path="/invoice/:orderId" element={<InvoicePage />} />
          </Routes>
        </main>
        <Footer />
        {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} addToCart={addToCart} />}
        <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateCartItemQuantity} />
        <Popup
          message={popupState.message}
          show={popupState.show}
          onClose={hidePopup}
          targetElement={popupState.targetElement}
          type={popupState.type}
        />
      </div>
    </BrowserRouter>
  );
}