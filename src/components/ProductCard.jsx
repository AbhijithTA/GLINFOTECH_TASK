import { Heart, Star } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);


  const rating = Math.floor(Math.random() * 2) + 4; 
  const reviewCount = Math.floor(Math.random() * 200) + 50; 

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = () => {
    // Add your cart logic here
    console.log('Added to cart:', product.title);
  };

  const handleAddToShortlist = () => {
    
    console.log('Added to shortlist:', product.title);
  };


  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={12}
        className={`${
          index < rating
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
     
      <div className="relative bg-gray-50 p-6">
      
        <button
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200 z-10"
        >
          <Heart
            size={16}
            className={`transition-colors ${
              isWishlisted
                ? "text-red-500 fill-red-500"
                : "text-gray-400 hover:text-red-500"
            }`}
          />
        </button>

       
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

     
      <div className="p-4">
       
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 leading-5">
          {product.title}
        </h3>

       
        <p className="text-xs text-gray-500 mb-2">
          {Math.floor(Math.random() * 10) + 1} types of shoes available
        </p>

        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {renderStars(rating)}
          </div>
          <span className="text-xs text-gray-500">({reviewCount})</span>
        </div>

      
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-gray-900">
            ₹ {Math.floor(product.price * 83).toLocaleString()}.00
          </span>
        </div>

      
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
          >
            Add To Cart
          </button>
          <button
            onClick={handleAddToShortlist}
            className="px-4 py-2.5 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 text-sm font-medium rounded-lg transition-colors duration-200"
          >
            Add Shortlist
          </button>
        </div>
      </div>
    </div>
  );
}