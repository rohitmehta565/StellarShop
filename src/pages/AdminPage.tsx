
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { products, Product } from '@/data/products';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Pencil, Trash, Plus } from 'lucide-react';

const AdminPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const [productsList, setProductsList] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  if (!isAuthenticated || !isAdmin) {
    return null; // Will redirect in useEffect
  }
  
  // Filter products based on search term
  const filteredProducts = productsList.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Demo data for charts
  const salesData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 4500 },
    { name: 'May', revenue: 6000 },
    { name: 'Jun', revenue: 5500 },
  ];
  
  const categoryData = [
    { name: 'Electronics', value: 40 },
    { name: 'Fashion', value: 25 },
    { name: 'Home', value: 15 },
    { name: 'Fitness', value: 10 },
    { name: 'Food', value: 5 },
    { name: 'Lifestyle', value: 5 },
  ];
  
  const COLORS = ['#8B5CF6', '#D946EF', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="dashboard">
        <TabsList className="mb-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        
        {/* Dashboard Tab */}
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-500 text-sm">Total Sales</p>
                <h3 className="text-3xl font-bold">$12,890</h3>
                <p className="text-green-500 text-sm">↑ 12% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-500 text-sm">Orders</p>
                <h3 className="text-3xl font-bold">387</h3>
                <p className="text-green-500 text-sm">↑ 8% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-500 text-sm">Customers</p>
                <h3 className="text-3xl font-bold">2,458</h3>
                <p className="text-green-500 text-sm">↑ 5% from last month</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Revenue Overview</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Sales by Category</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Products Tab */}
        <TabsContent value="products">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="w-full sm:w-auto">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            <Button className="bg-shop-purple hover:bg-shop-dark-purple">
              <Plus size={18} className="mr-2" />
              Add New Product
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                            <img
                              src={`${product.image}?auto=format&fit=crop&w=100&h=100&q=80`}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-800">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost" className="text-gray-500 hover:text-shop-purple">
                            <Pencil size={16} />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-500 hover:text-red-600">
                            <Trash size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-4">ORD-4389-2023</td>
                      <td className="px-4 py-4">John Doe</td>
                      <td className="px-4 py-4">July 15, 2023</td>
                      <td className="px-4 py-4">
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                          Delivered
                        </span>
                      </td>
                      <td className="px-4 py-4">$125.99</td>
                      <td className="px-4 py-4">
                        <Button size="sm" variant="outline">View</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4">ORD-4382-2023</td>
                      <td className="px-4 py-4">Sarah Johnson</td>
                      <td className="px-4 py-4">July 14, 2023</td>
                      <td className="px-4 py-4">
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                          Processing
                        </span>
                      </td>
                      <td className="px-4 py-4">$239.50</td>
                      <td className="px-4 py-4">
                        <Button size="sm" variant="outline">View</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4">ORD-4377-2023</td>
                      <td className="px-4 py-4">Michael Smith</td>
                      <td className="px-4 py-4">July 13, 2023</td>
                      <td className="px-4 py-4">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                          Shipped
                        </span>
                      </td>
                      <td className="px-4 py-4">$87.25</td>
                      <td className="px-4 py-4">
                        <Button size="sm" variant="outline">View</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4">ORD-4372-2023</td>
                      <td className="px-4 py-4">Emily Garcia</td>
                      <td className="px-4 py-4">July 12, 2023</td>
                      <td className="px-4 py-4">
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                          Delivered
                        </span>
                      </td>
                      <td className="px-4 py-4">$149.99</td>
                      <td className="px-4 py-4">
                        <Button size="sm" variant="outline">View</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4">ORD-4365-2023</td>
                      <td className="px-4 py-4">Robert Wilson</td>
                      <td className="px-4 py-4">July 10, 2023</td>
                      <td className="px-4 py-4">
                        <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">
                          Cancelled
                        </span>
                      </td>
                      <td className="px-4 py-4">$52.49</td>
                      <td className="px-4 py-4">
                        <Button size="sm" variant="outline">View</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Customers Tab */}
        <TabsContent value="customers">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">Customer Management</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Orders</th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Joined</th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-4">John Doe</td>
                      <td className="px-4 py-4">john.doe@example.com</td>
                      <td className="px-4 py-4">5</td>
                      <td className="px-4 py-4">Jan 12, 2023</td>
                      <td className="px-4 py-4">
                        <Button size="sm" variant="outline">View</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4">Sarah Johnson</td>
                      <td className="px-4 py-4">sarah.j@example.com</td>
                      <td className="px-4 py-4">12</td>
                      <td className="px-4 py-4">Mar 8, 2022</td>
                      <td className="px-4 py-4">
                        <Button size="sm" variant="outline">View</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4">Michael Smith</td>
                      <td className="px-4 py-4">mike.smith@example.com</td>
                      <td className="px-4 py-4">3</td>
                      <td className="px-4 py-4">May 17, 2023</td>
                      <td className="px-4 py-4">
                        <Button size="sm" variant="outline">View</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4">Emily Garcia</td>
                      <td className="px-4 py-4">emily.g@example.com</td>
                      <td className="px-4 py-4">8</td>
                      <td className="px-4 py-4">Nov 22, 2022</td>
                      <td className="px-4 py-4">
                        <Button size="sm" variant="outline">View</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4">Robert Wilson</td>
                      <td className="px-4 py-4">robert.wilson@example.com</td>
                      <td className="px-4 py-4">1</td>
                      <td className="px-4 py-4">Jun 30, 2023</td>
                      <td className="px-4 py-4">
                        <Button size="sm" variant="outline">View</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
