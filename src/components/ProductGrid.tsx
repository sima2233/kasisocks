import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';
interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  toggleWishlist?: (productId: number, targetElement?: HTMLElement | null) => void;
  isInWishlist?: (productId: number) => boolean;
}
const ProductGrid = ({
  products,
  onProductClick,
  toggleWishlist,
  isInWishlist
}: ProductGridProps) => {
  return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products.map(product => <ProductCard key={product.id} product={product} onClick={onProductClick} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist ? isInWishlist(product.id) : false} />)}
    </div>;
};
export default ProductGrid;