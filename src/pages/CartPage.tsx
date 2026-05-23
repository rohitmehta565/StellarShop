
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trash, 
  MinusCircle, 
  PlusCircle, 
  ArrowRight,
  ArrowLeft, 
  Tag
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [couponCode, setCouponCode] = useState('');
  
  const handleApplyCoupon = () => {
    if (!couponCode) {
      toast.error('Please enter a coupon code');
      return;
    }
    
    // Demo coupon code
    if (couponCode.toUpperCase() === 'DISCOUNT20') {
      toast.success('Coupon applied successfully!');
    } else {
      toast.error('Invalid coupon code');
    }
  };
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-sm p-12 max-w-md mx-auto">
          <div className="text-8xl mb-4">🛒</div>
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/shop">
            <Button size="lg" className="bg-shop-purple hover:bg-shop-dark-purple">
              <ArrowLeft size={18} className="mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Cart
      </motion.h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <motion.div 
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="hidden sm:grid grid-cols-12 text-sm font-medium text-gray-500 mb-4">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            <Separator className="mb-6 hidden sm:block" />
            
            {cart.map((item) => (
              <div key={item.id} className="mb-6 last:mb-0">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-12 sm:col-span-6">
                    <div className="flex gap-4 items-center">
                      <Link to={`/product/${item.id}`} className="shrink-0">
                        <img
                          src={`${item.image}?auto=format&fit=crop&w=100&h=100&q=80`}
                          alt={item.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                      </Link>
                      <div>
                        <Link to={`/product/${item.id}`} className="font-medium hover:text-shop-purple transition-colors">
                          {item.name}
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-4 sm:col-span-2 text-center">
                    <div className="sm:hidden text-xs text-gray-500">Price:</div>
                    ${item.price.toFixed(2)}
                  </div>
                  
                  <div className="col-span-4 sm:col-span-2 flex justify-center">
                    <div className="sm:hidden text-xs text-gray-500">Quantity:</div>
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1"
                      >
                        <MinusCircle size={18} className="text-gray-400 hover:text-shop-purple" />
                      </button>
                      
                      <span className="mx-2 w-8 text-center">
                        {item.quantity}
                      </span>
                      
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1"
                      >
                        <PlusCircle size={18} className="text-gray-400 hover:text-shop-purple" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-3 sm:col-span-2 text-right">
                    <div className="sm:hidden text-xs text-gray-500">Total:</div>
                    <span className="font-medium text-shop-purple">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="col-span-1 text-right">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
                <Separator className="mt-6" />
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <Link to="/shop">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft size={18} />
                Continue Shopping
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              className="text-red-500 border-red-500 hover:bg-red-50" 
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>
        </motion.div>
        
        {/* Order Summary */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">
                  {totalPrice >= 50 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    '$5.00'
                  )}
                </span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${(totalPrice + (totalPrice >= 50 ? 0 : 5)).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                Have a coupon?
              </label>
              <div className="flex">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Tag size={16} className="text-gray-400" />
                  </div>
                  <Input
                    id="coupon"
                    type="text"
                    placeholder="Coupon code"
                    className="pl-10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                </div>
                <Button 
                  variant="outline" 
                  className="ml-2 whitespace-nowrap" 
                  onClick={handleApplyCoupon}
                >
                  Apply
                </Button>
              </div>
            </div>
            
            <Link to="/checkout">
              <Button className="w-full bg-shop-purple hover:bg-shop-dark-purple flex items-center justify-center gap-2">
                Proceed to Checkout
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;
