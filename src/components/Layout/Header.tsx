
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  X, 
  Heart, 
  LogOut
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          <Menu size={24} />
        </Button>
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-shop-purple">
          StellarShop
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-shop-purple">
            Home
          </Link>
          <Link to="/shop" className="text-gray-700 hover:text-shop-purple">
            Shop
          </Link>
          {/* <Link to="/categories" className="text-gray-700 hover:text-shop-purple">
            Categories
          </Link> */}
          {isAuthenticated && user?.role === 'admin' && (
            <Link to="/admin" className="text-gray-700 hover:text-shop-purple">
              Admin
            </Link>
          )}
        </nav>
        
        {/* Search, User and Cart */}
        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Search">
                <Search size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="top">
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <h2 className="text-xl font-semibold">Search Products</h2>
                <div className="flex w-full max-w-lg">
                  <Input 
                    placeholder="Search for products..." 
                    className="rounded-r-none"
                  />
                  <Button className="rounded-l-none">
                    <Search size={18} /> Search
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Account</h2>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X size={20} />
                    </Button>
                  </SheetTrigger>
                </div>
                <div className="flex-grow py-8">
                  {isAuthenticated ? (
                    <div className="space-y-6">
                      <div className="text-center pb-4 border-b">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-2">
                          <User size={32} />
                        </div>
                        <h3 className="font-medium text-lg">{user?.name}</h3>
                        <p className="text-muted-foreground text-sm">{user?.email}</p>
                      </div>
                      <nav className="space-y-2">
                        <Link 
                          to="/account" 
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary w-full"
                        >
                          <User size={18} />
                          <span>My Account</span>
                        </Link>
                       
                        <button 
                          onClick={logout}
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary w-full text-destructive"
                        >
                          <LogOut size={18} />
                          <span>Logout</span>
                        </button>
                      </nav>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <p>Sign in to view your account and orders.</p>
                      <div className="space-y-2">
                        <Link to="/login">
                          <Button className="w-full">Login</Button>
                        </Link>
                        <Link to="/register">
                          <Button variant="outline" className="w-full">Register</Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 bg-shop-purple h-5 w-5 flex items-center justify-center p-0 rounded-full"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div 
          className={`bg-white h-full w-64 p-4 transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <span className="font-bold text-xl">Menu</span>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
              <X size={20} />
            </Button>
          </div>
          <nav className="space-y-4">
            <Link 
              to="/" 
              className="block py-2 border-b" 
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className="block py-2 border-b" 
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/categories" 
              className="block py-2 border-b" 
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/account" 
                  className="block py-2 border-b" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
                <Link 
                  to="/orders" 
                  className="block py-2 border-b" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="block py-2 border-b" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block py-2 text-destructive w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2 pt-4">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Login</Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Register</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
