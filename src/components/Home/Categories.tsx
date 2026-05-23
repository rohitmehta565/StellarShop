
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllCategories } from '@/data/products';

type CategoryCardProps = {
  category: string;
  index: number;
};

const categoryImages = {
  electronics: 'https://images.unsplash.com/photo-1601524909162-ae8725290836',
  fashion: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
  home: 'https://images.unsplash.com/photo-1601628828688-632f38a5a7d0',
  fitness: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
  food: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
  lifestyle: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
  const imageUrl = categoryImages[category as keyof typeof categoryImages] || 'https://images.unsplash.com/photo-1572635196237-14b3f281503f';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/category/${category}`}>
        <div className="group relative h-60 rounded-lg overflow-hidden shadow-md">
          <img
            src={`${imageUrl}?auto=format&fit=crop&w=400&q=80`}
            alt={category}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
            <h3 className="text-white font-semibold text-lg capitalize">{category}</h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    setCategories(getAllCategories());
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
