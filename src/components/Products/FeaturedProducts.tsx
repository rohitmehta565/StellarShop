
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getFeaturedProducts, Product } from '@/data/products';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    setProducts(getFeaturedProducts());
  }, []);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Products
        </h2>
        
        <motion.div 
          className="product-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
