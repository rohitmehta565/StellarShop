
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // If already authenticated, redirect to home
  if (isAuthenticated) {
    navigate('/');
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div 
        className="max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-center mb-2">Sign in</h1>
          <p className="text-center text-gray-500 mb-6">
            Welcome back! Sign in to access your account.
          </p>
          
          <div className="space-y-2 mb-6">
            <Button variant="outline" className="w-full">
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full">
              Continue with Facebook
            </Button>
          </div>
          
          <div className="relative my-6">
            <Separator />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500 text-sm">
              or
            </span>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="your@email.com"  
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link to="/forgot-password" className="text-sm text-shop-purple hover:text-shop-dark-purple">
                  Forgot password?
                </Link> */}
              </div>
              <Input 
                id="password" 
                name="password"
                type="password" 
                placeholder="••••••••" 
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-shop-purple hover:bg-shop-dark-purple"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
          
          <p className="text-center mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-shop-purple hover:text-shop-dark-purple">
              Sign up
            </Link>
          </p>
          
          <p className="text-xs text-center text-gray-500 mt-10">
            For demo purposes, you can use the following credentials:<br />
            <strong>Admin:</strong> admin@example.com / admin123<br />
            <strong>Customer:</strong> user@example.com / user123
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
