import React from 'react';
import { Product } from '../types';
import { products } from '../data/products';
import { HeartIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
interface MyListPageProps {
  setSelectedProduct: (product: Product) => void;
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  addToCart: (product: Product, quantity: number) => void;
}
const MyListPage = ({
  setSelectedProduct,
  wishlist,
  toggleWishlist,
  addToCart
}: MyListPageProps) => {
  const wishlistProducts = products.filter(product => wishlist.includes(product.id));
  return <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            My List
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Your saved favorites for future purchases
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 py-12">
        {wishlistProducts.length === 0 ? <div className="text-center py-16">
            <div className="inline-flex justify-center items-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <HeartIcon size={32} className="text-gray-400" />
            </div>
            <h2 className="font-serif text-2xl font-bold mb-2">
              Your list is empty
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You haven't added any products to your list yet. Browse our
              collection and save your favorites.
            </p>
            <Link to="/catalogue" className="bg-black hover:bg-gray-900 text-white py-3 px-8 font-medium transition-colors inline-block">
              Browse Collection
            </Link>
          </div> : <>
            <div className="mb-8 flex justify-between items-center">
              <h2 className="font-serif text-2xl font-bold">
                Saved Items ({wishlistProducts.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map(product => <div key={product.id} className="border border-gray-200 rounded-md overflow-hidden flex flex-col">
                  <div className="h-64 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                  <div className="p-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg mb-1 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                        {product.name}
                      </h3>
                      <button onClick={() => toggleWishlist(product.id)} className="p-1 rounded-full text-red-500">
                        <HeartIcon size={20} fill="currentColor" />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="font-serif font-medium text-lg">
                      N${product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <button className="w-full bg-black hover:bg-gray-900 text-white py-2 font-medium transition-colors" onClick={() => {
                addToCart(product, 1);
              }}>
                      Add to Cart
                    </button>
                  </div>
                </div>)}
            </div>
          </>}
      </div>
    </div>;
};
export default MyListPage;