import React, { useState } from 'react';
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Product } from '../types';
interface ProductModalProps {
  product: Product;
  onClose: () => void;
  addToCart: (product: Product, quantity: number) => void;
}
const ProductModal = ({
  product,
  onClose,
  addToCart
}: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % product.images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + product.images.length) % product.images.length);
  };
  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };
  return <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-md max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button className="absolute top-4 right-4 text-gray-800 hover:text-black z-10" onClick={onClose}>
          <XIcon size={24} />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Images */}
          <div className="relative h-80 md:h-full">
            <img src={product.images[currentImageIndex]} alt={product.name} className="w-full h-full object-cover" />
            {product.images.length > 1 && <>
                <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md" onClick={prevImage}>
                  <ChevronLeftIcon size={24} />
                </button>
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md" onClick={nextImage}>
                  <ChevronRightIcon size={24} />
                </button>
              </>}
            {/* Thumbnail indicators */}
            {product.images.length > 1 && <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {product.images.map((_, idx) => <button key={idx} className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-yellow-500' : 'bg-white bg-opacity-60'}`} onClick={() => setCurrentImageIndex(idx)} />)}
              </div>}
          </div>
          {/* Product Details */}
          <div className="p-6">
            <h2 className="font-serif text-2xl font-bold mb-2">
              {product.name}
            </h2>
            <p className="font-serif text-xl font-medium mb-4">
              N${product.price.toFixed(2)}
            </p>
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="font-medium mb-2">Select Size</h3>
              <div className="flex gap-2">
                {product.sizes.map(size => <button key={size} className={`px-4 py-2 border ${selectedSize === size ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'}`} onClick={() => setSelectedSize(size)}>
                    {size}
                  </button>)}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center border border-gray-300 w-32">
                <button className="px-3 py-1 text-gray-500 hover:text-black" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </button>
                <input type="number" min="1" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-full text-center py-1 border-0 focus:outline-none" />
                <button className="px-3 py-1 text-gray-500 hover:text-black" onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
            </div>
            <button className="w-full bg-black hover:bg-gray-900 text-white py-3 font-medium transition-colors" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default ProductModal;