import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCartIcon, MenuIcon, XIcon } from 'lucide-react';
interface NavbarProps {
  cartItemsCount: number;
  setIsCartOpen: (isOpen: boolean) => void;
}
const Navbar = ({
  cartItemsCount,
  setIsCartOpen
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button className="md:hidden text-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="font-serif text-2xl md:text-3xl font-bold tracking-wider">
              KASI SOCKS
            </Link>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className={`font-medium transition-colors ${isActive('/') ? 'text-yellow-500' : 'hover:text-yellow-500'}`}>
              Home
            </Link>
            <Link to="/catalogue" className={`font-medium transition-colors ${isActive('/catalogue') ? 'text-yellow-500' : 'hover:text-yellow-500'}`}>
              Catalogue
            </Link>
            <Link to="/my-list" className={`font-medium transition-colors ${isActive('/my-list') ? 'text-yellow-500' : 'hover:text-yellow-500'}`}>
              My List
            </Link>
            <Link to="/about-us" className={`font-medium transition-colors ${isActive('/about-us') ? 'text-yellow-500' : 'hover:text-yellow-500'}`}>
              About Us
            </Link>
          </nav>
          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsCartOpen(true)} className="hover:text-yellow-500 relative">
              <ShoppingCartIcon size={20} />
              {cartItemsCount > 0 && <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>}
            </button>
            <Link to="/contact-us" className={`hidden md:block font-medium transition-colors ${isActive('/contact-us') ? 'text-yellow-500' : 'hover:text-yellow-500'}`}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className={`font-medium transition-colors ${isActive('/') ? 'text-yellow-500' : 'hover:text-yellow-500'}`} onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/catalogue" className={`font-medium transition-colors ${isActive('/catalogue') ? 'text-yellow-500' : 'hover:text-yellow-500'}`} onClick={() => setIsMenuOpen(false)}>
              Catalogue
            </Link>
            <Link to="/my-list" className={`font-medium transition-colors ${isActive('/my-list') ? 'text-yellow-500' : 'hover:text-yellow-500'}`} onClick={() => setIsMenuOpen(false)}>
              My List
            </Link>
            <Link to="/about-us" className={`font-medium transition-colors ${isActive('/about-us') ? 'text-yellow-500' : 'hover:text-yellow-500'}`} onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/contact-us" className={`font-medium transition-colors ${isActive('/contact-us') ? 'text-yellow-500' : 'hover:text-yellow-500'}`} onClick={() => setIsMenuOpen(false)}>
              Contact Us
            </Link>
          </nav>
        </div>}
    </header>;
};
export default Navbar;