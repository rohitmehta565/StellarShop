
import { motion } from 'framer-motion';
import { 
  Truck, 
  ShieldCheck, 
  ArrowLeftRight, 
  CreditCard 
} from 'lucide-react';

const features = [
  {
    icon: <Truck size={32} />,
    title: 'Free Shipping',
    description: 'Enjoy free shipping on all orders over $50'
  },
  {
    icon: <ShieldCheck size={32} />,
    title: 'Secure Payment',
    description: 'Experience worry-free transactions with our secure payment options'
  },
  {
    icon: <ArrowLeftRight size={32} />,
    title: 'Easy Returns',
    description: 'Simple returns within 30 days of purchase'
  },
  {
    icon: <CreditCard size={32} />,
    title: 'Flexible Payment',
    description: 'Multiple payment options for your convenience'
  }
];

const Features = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="text-shop-purple mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-shop-neutral rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
