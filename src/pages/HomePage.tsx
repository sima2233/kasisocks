import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';
import { Product } from '../types';
import { InstagramIcon, FacebookIcon } from 'lucide-react';
interface HomePageProps {
  setSelectedProduct: (product: Product) => void;
  addToCart?: (product: Product, quantity: number) => void;
  toggleWishlist?: (productId: number) => void;
  isInWishlist?: (productId: number) => boolean;
}
const HomePage = ({
  setSelectedProduct,
  addToCart,
  toggleWishlist,
  isInWishlist
}: HomePageProps) => {
  // Show only first 5 products on homepage
  const featuredProducts = products.slice(0, 5);
  return <div className="min-h-screen">
      <Hero />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-center">
            Featured Collection
          </h2>
          <p className="text-gray-600 text-center mb-10">
            Discover our most popular styles
          </p>
          <ProductGrid products={featuredProducts} onProductClick={setSelectedProduct} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist} />
          <div className="text-center mt-8">
            <Link to="/catalogue" className="bg-black hover:bg-gray-900 text-white py-3 px-8 inline-block font-medium transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold mb-4">
                Quality Craftsmanship
              </h2>
              <p className="text-gray-600 mb-6">
                At Kasi Socks, we believe that quality starts from the ground
                up. Each pair of our socks is crafted with premium materials and
                meticulous attention to detail, ensuring exceptional comfort and
                durability.
              </p>
              <Link to="/about-us" className="bg-black hover:bg-gray-900 text-white py-3 px-6 font-medium transition-colors inline-block">
                Learn More
              </Link>
            </div>
            <div className="h-80 overflow-hidden rounded-md">
              <img src="https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Sock manufacturing" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-serif text-3xl font-bold mb-6">
            Join Our Community
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Follow us on social media for exclusive offers, early access to new
            collections, and style inspiration.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="bg-white p-3 rounded-full">
              <InstagramIcon size={24} className="text-black" />
            </a>
            <a href="#" className="bg-white p-3 rounded-full">
              <FacebookIcon size={24} className="text-black" />
            </a>
          </div>
        </div>
      </section>
    </div>;
};
export default HomePage;