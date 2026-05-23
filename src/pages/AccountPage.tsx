
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  CreditCard, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const AccountPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  
  // Demo order data
  const orders = [
    {
      id: 'ORD-4389-2023',
      date: '2023-07-15',
      status: 'Delivered',
      total: 125.99
    },
    {
      id: 'ORD-3921-2023',
      date: '2023-06-02',
      status: 'Delivered',
      total: 78.50
    }
  ];
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-shop-neutral rounded-full flex items-center justify-center mb-4">
                  <User size={40} className="text-shop-purple" />
                </div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <nav className="space-y-1">
                <Link to="/account" className="flex items-center space-x-2 p-2 rounded-md bg-shop-neutral text-shop-purple font-medium w-full">
                  <User size={20} />
                  <span>Account Overview</span>
                </Link>
                
                <button 
                  onClick={logout}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors w-full text-red-500"
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Personal Information</span>
                <Button variant="ghost" size="sm">Edit</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">+1 (555) 123-4567</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">January 1, 1990</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Orders</span>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/orders">View All</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length > 0 ? (
                <div className="divide-y">
                  {orders.map((order) => (
                    <div key={order.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                          <p className="text-sm text-green-600">{order.status}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/order/${order.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  You haven't placed any orders yet.
                </p>
              )}
            </CardContent>
          </Card>
          
          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Default Shipping Address</span>
                <Button variant="ghost" size="sm">Edit</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-gray-500">123 Main Street, Apt 4B</p>
                <p className="text-gray-500">New York, NY 10001</p>
                <p className="text-gray-500">United States</p>
                <p className="text-gray-500">+1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
