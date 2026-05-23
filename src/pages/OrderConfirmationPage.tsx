
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${new Date().getFullYear()}`;
  
  // Demo order data
  const orderDate = new Date().toLocaleDateString();
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString();
  
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div 
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <motion.div
            className="w-20 h-20 rounded-full bg-green-100 text-green-500 flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
          >
            <CheckCircle2 size={50} />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Thank You For Your Order!</h1>
          <p className="text-gray-600">
            Your order has been received and is now being processed.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Order Number</p>
              <p className="font-semibold">{orderNumber}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-semibold">{orderDate}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">customer@example.com</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="font-semibold">$125.00</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-semibold">Credit Card (•••• 4242)</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Estimated Delivery</p>
              <p className="font-semibold">{estimatedDelivery}</p>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="bg-shop-neutral rounded-lg p-4">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-shop-purple bg-opacity-20 rounded-full">
                <Package size={24} className="text-shop-purple" />
              </div>
              <div>
                <h3 className="font-semibold">Shipping Information</h3>
                <p className="text-gray-600">
                  John Doe<br />
                  123 Main Street, Apt 4B<br />
                  New York, NY 10001<br />
                  United States<br />
                  +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            We've sent a confirmation email to your inbox with all the details.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/shop" className="flex items-center gap-2">
                <ShoppingBag size={18} />
                Continue Shopping
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/orders" className="flex items-center gap-2">
                View My Orders
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmationPage;
