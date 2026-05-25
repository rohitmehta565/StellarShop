
import Hero from '@/components/Home/Hero';
import Features from '@/components/Home/Features';
import FeaturedProducts from '@/components/Products/FeaturedProducts';
import Categories from '@/components/Home/Categories';
import Newsletter from '@/components/Home/Newsletter';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <FeaturedProducts />
      <Categories />
      <Newsletter />
    </div>
  );
};

export default Index;
