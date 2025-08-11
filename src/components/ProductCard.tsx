import React from 'react';
import { HeartIcon } from 'lucide-react';
import { Product } from '../types';
interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  isInWishlist?: boolean;
  toggleWishlist?: (productId: number) => void;
}
const ProductCard = ({
  product,
  onClick,
  isInWishlist = false,
  toggleWishlist
}: ProductCardProps) => {
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (toggleWishlist) {
      toggleWishlist(product.id);
    }
  };
  return <div className="bg-white rounded-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg cursor-pointer relative" onClick={() => onClick(product)}>
    <div className="h-64 overflow-hidden">
      <img src={product.images[0] ? product.images[0].trim() : ''} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
    </div>
    <div className="p-4">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg mb-1">{product.name}</h3>
        {toggleWishlist && <button onClick={handleWishlistClick} className={`p-1 rounded-full ${isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}>
          <HeartIcon size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
        </button>}
      </div>
      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
        {product.description}
      </p>
      <p className="font-serif font-medium text-lg">
        N${product.price.toFixed(2)}
      </p>
    </div>
  </div>;
};
export default ProductCard;