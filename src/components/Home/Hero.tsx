
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-shop-purple/10 to-shop-neutral py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Discover Amazing <span className="text-shop-purple">Products</span> For Your Lifestyle
            </h1>
            <p className="text-xl text-gray-600">
              Explore our curated selection of premium products that elevate your everyday experience.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link to="/shop">
                <button className="btn-primary flex items-center">
                  <span>Shop Now</span>
                  <ArrowRight size={18} className="ml-2" />
                </button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative aspect-square"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-shop-purple to-shop-accent rounded-full blur-[80px] opacity-30" />
            <img 
              src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=600&q=80" 
              alt="Featured product" 
              className="relative z-10 rounded-2xl object-cover w-full h-full shadow-xl"
            />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-shop-purple rounded-full flex items-center justify-center text-center p-4 text-white font-bold leading-tight shadow-lg z-20">
              <div>
                <span className="block text-sm">Up to</span>
                <span className="text-2xl">30%</span>
                <span className="block text-sm">OFF</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-[20%] left-[5%] w-16 h-16 bg-shop-light-purple rounded-full blur-md opacity-60" />
      <div className="absolute top-[60%] right-[10%] w-20 h-20 bg-shop-light-purple rounded-full blur-md opacity-60" />
      <div className="absolute bottom-[10%] left-[20%] w-12 h-12 bg-shop-accent rounded-full blur-md opacity-40" />
    </section>
  );
};

export default Hero;
