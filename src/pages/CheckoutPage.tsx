
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

type PaymentMethod = 'credit-card' | 'paypal' | 'bank-transfer';
type ShippingMethod = 'standard' | 'express' | 'next-day';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: user?.name.split(' ')[0] || '',
    lastName: user?.name.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard');
  const [sameBillingAddress, setSameBillingAddress] = useState(true);
  
  const shippingRates = {
    standard: 0,
    express: 15,
    'next-day': 25
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'country'];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast.error(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
        return false;
      }
    }
    
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      navigate('/shop');
      return;
    }
    
    if (!validateForm()) return;
    
    // Simulate processing payment
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Processing your payment...',
        success: () => {
          clearCart();
          navigate('/order-confirmation');
          return 'Your order has been placed successfully!';
        },
        error: 'Payment processing failed. Please try again.'
      }
    );
  };
  
  const subtotal = totalPrice;
  const shipping = shippingRates[shippingMethod];
  const total = subtotal + shipping;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name*</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name*</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number*</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address*</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City*</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province*</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP/Postal Code*</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country*</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Billing Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="sameBillingAddress"
                  checked={sameBillingAddress}
                  onCheckedChange={(checked) => setSameBillingAddress(!!checked)}
                />
                <Label htmlFor="sameBillingAddress">Same as shipping address</Label>
              </div>
              
              {!sameBillingAddress && (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold">Billing Address</h3>
                  <div className="space-y-2">
                    <Label htmlFor="billingAddress">Address*</Label>
                    <Input id="billingAddress" name="billingAddress" required={!sameBillingAddress} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="billingCity">City*</Label>
                      <Input id="billingCity" name="billingCity" required={!sameBillingAddress} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="billingState">State/Province*</Label>
                      <Input id="billingState" name="billingState" required={!sameBillingAddress} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="billingZipCode">ZIP/Postal Code*</Label>
                      <Input id="billingZipCode" name="billingZipCode" required={!sameBillingAddress} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="billingCountry">Country*</Label>
                      <Input id="billingCountry" name="billingCountry" defaultValue="United States" required={!sameBillingAddress} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Shipping Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Method</h2>
              
              <RadioGroup value={shippingMethod} onValueChange={(value) => setShippingMethod(value as ShippingMethod)}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 border p-4 rounded-lg">
                    <RadioGroupItem value="standard" id="shipping-standard" />
                    <div className="grid gap-1.5 grow">
                      <Label htmlFor="shipping-standard" className="font-medium">Standard Shipping</Label>
                      <p className="text-sm text-muted-foreground">Free - Arrives in 5-7 business days</p>
                    </div>
                    <div className="font-medium">$0.00</div>
                  </div>
                  
                  <div className="flex items-center space-x-3 border p-4 rounded-lg">
                    <RadioGroupItem value="express" id="shipping-express" />
                    <div className="grid gap-1.5 grow">
                      <Label htmlFor="shipping-express" className="font-medium">Express Shipping</Label>
                      <p className="text-sm text-muted-foreground">Arrives in 2-3 business days</p>
                    </div>
                    <div className="font-medium">$15.00</div>
                  </div>
                  
                  <div className="flex items-center space-x-3 border p-4 rounded-lg">
                    <RadioGroupItem value="next-day" id="shipping-next-day" />
                    <div className="grid gap-1.5 grow">
                      <Label htmlFor="shipping-next-day" className="font-medium">Next Day Delivery</Label>
                      <p className="text-sm text-muted-foreground">Arrives next business day</p>
                    </div>
                    <div className="font-medium">$25.00</div>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              
              <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 border p-4 rounded-lg">
                    <RadioGroupItem value="credit-card" id="payment-cc" />
                    <Label htmlFor="payment-cc" className="font-medium">Credit Card</Label>
                  </div>
                  
                  {paymentMethod === 'credit-card' && (
                    <div className="pl-7 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="ccNumber">Card Number</Label>
                        <Input id="ccNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ccExpiry">Expiry Date</Label>
                          <Input id="ccExpiry" placeholder="MM/YY" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="ccCVV">CVV</Label>
                          <Input id="ccCVV" placeholder="123" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3 border p-4 rounded-lg">
                    <RadioGroupItem value="paypal" id="payment-paypal" />
                    <Label htmlFor="payment-paypal" className="font-medium">PayPal</Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 border p-4 rounded-lg">
                    <RadioGroupItem value="bank-transfer" id="payment-bank" />
                    <Label htmlFor="payment-bank" className="font-medium">Bank Transfer</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="max-h-64 overflow-y-auto mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b last:border-0">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded overflow-hidden mr-3 bg-gray-100">
                      <img 
                        src={`${item.image}?auto=format&fit=crop&w=100&h=100&q=80`} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="font-medium">
                    ${(item.quantity * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="mb-4" />
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-shop-purple hover:bg-shop-dark-purple"
              onClick={handleSubmit}
            >
              Place Order
            </Button>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              By placing your order, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
