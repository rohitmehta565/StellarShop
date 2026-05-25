
import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { Product } from '@/data/products';

type ProductGridProps = {
  products: Product[];
  title?: string;
};

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  const [visibleProducts, setVisibleProducts] = useState(8);
  
  const loadMore = () => {
    setVisibleProducts(prev => Math.min(prev + 8, products.length));
  };
  
  return (
    <div className="space-y-8">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-center">{title}</h2>
      )}
      
      <motion.div 
        className="product-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {products.slice(0, visibleProducts).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
      
      {visibleProducts < products.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="btn-secondary"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
