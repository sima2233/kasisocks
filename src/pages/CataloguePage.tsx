import React, { useState } from 'react';
import { products } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import { Product } from '../types';
import { FilterIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
interface CataloguePageProps {
  setSelectedProduct: (product: Product) => void;
  toggleWishlist?: (productId: number) => void;
  isInWishlist?: (productId: number) => boolean;
}
const CataloguePage = ({
  setSelectedProduct,
  toggleWishlist,
  isInWishlist
}: CataloguePageProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [priceRange, setPriceRange] = useState<[number, number]>([60, 120]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  // Get unique sizes from all products
  const allSizes = Array.from(new Set(products.flatMap(product => product.sizes)));
  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(e.target.value);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = newValue;
    setPriceRange(newRange);
  };
  const applyFilters = () => {
    let result = [...products];
    // Filter by size if any sizes are selected
    if (selectedSizes.length > 0) {
      result = result.filter(product => product.sizes.some(size => selectedSizes.includes(size)));
    }
    // Filter by price range
    result = result.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // 'featured' - use default order
        break;
    }
    setFilteredProducts(result);
    // Close mobile filters after applying
    setIsMobileFilterOpen(false);
  };
  const resetFilters = () => {
    setSelectedSizes([]);
    setPriceRange([60, 120]);
    setSortOption('featured');
    setFilteredProducts(products);
  };
  return <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Our Collection
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our complete range of premium socks designed for comfort,
            style, and durability.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Mobile filter toggle */}
        <div className="md:hidden mb-4">
          <button onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)} className="w-full flex items-center justify-between bg-gray-100 px-4 py-3 rounded-md">
            <span className="flex items-center">
              <FilterIcon size={18} className="mr-2" />
              Filter & Sort
            </span>
            {isMobileFilterOpen ? <ChevronUpIcon size={18} /> : <ChevronDownIcon size={18} />}
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop always visible, Mobile conditional */}
          <div className={`${isMobileFilterOpen ? 'block' : 'hidden'} md:block md:w-1/4 bg-white p-4 md:p-6 rounded-md border border-gray-200`}>
            <div className="mb-6">
              <h3 className="font-serif text-lg font-bold mb-4">Sort By</h3>
              <select value={sortOption} onChange={e => setSortOption(e.target.value)} className="w-full p-2 border border-gray-300 rounded-sm">
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
            <div className="mb-6">
              <h3 className="font-serif text-lg font-bold mb-4">Size</h3>
              <div className="flex flex-wrap gap-2">
                {allSizes.map(size => <button key={size} onClick={() => handleSizeToggle(size)} className={`px-3 py-1 border ${selectedSizes.includes(size) ? 'border-yellow-500 bg-yellow-50 text-black' : 'border-gray-300 text-gray-700'}`}>
                    {size}
                  </button>)}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-serif text-lg font-bold mb-4">Price Range</h3>
              <div className="px-2">
                <div className="flex justify-between mb-2">
                  <span>N${priceRange[0]}</span>
                  <span>N${priceRange[1]}</span>
                </div>
                <div className="mb-4">
                  <input type="range" min="60" max="120" value={priceRange[0]} onChange={e => handlePriceChange(e, 0)} className="w-full" />
                  <input type="range" min="60" max="120" value={priceRange[1]} onChange={e => handlePriceChange(e, 1)} className="w-full" />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={applyFilters} className="flex-1 bg-black text-white py-2 px-4 hover:bg-gray-900 transition-colors">
                Apply
              </button>
              <button onClick={resetFilters} className="flex-1 border border-gray-300 py-2 px-4 hover:bg-gray-100 transition-colors">
                Reset
              </button>
            </div>
          </div>
          {/* Product Grid */}
          <div className="md:w-3/4">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredProducts.length} products found
              </p>
            </div>
            {filteredProducts.length === 0 ? <div className="text-center py-12">
                <h3 className="font-serif text-xl mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button onClick={resetFilters} className="bg-black text-white py-2 px-6 hover:bg-gray-900 transition-colors">
                  Reset Filters
                </button>
              </div> : <ProductGrid products={filteredProducts} onProductClick={setSelectedProduct} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist} />}
          </div>
        </div>
      </div>
    </div>;
};
export default CataloguePage;