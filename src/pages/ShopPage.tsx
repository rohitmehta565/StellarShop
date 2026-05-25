
import { useEffect, useState } from 'react';
import { 
  products as allProducts, 
  Product, 
  getAllCategories 
} from '@/data/products';
import ProductGrid from '@/components/Products/ProductGrid';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Search, SlidersHorizontal } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    price: true,
  });
  
  useEffect(() => {
    setCategories(getAllCategories());
  }, []);
  
  useEffect(() => {
    let result = [...allProducts];
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }
    
    // Filter by price
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    switch (sortBy) {
      case 'price-asc':
        result = result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result = result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result = result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        result = result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result = result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategories, priceRange, sortBy]);
  
  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev => {
      if (checked) {
        return [...prev, category];
      } else {
        return prev.filter(c => c !== category);
      }
    });
  };
  
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 500]);
    setSearchQuery('');
  };
  
  const toggleFilterSection = (section: keyof typeof expandedFilters) => {
    setExpandedFilters(prev => ({ ...prev, [section]: !prev[section] }));
  };
  
  // Desktop filters sidebar
  const FiltersSidebar = () => (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      {/* Categories */}
      <div>
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleFilterSection('categories')}
        >
          <h3 className="text-lg font-semibold">Categories</h3>
          {expandedFilters.categories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {expandedFilters.categories && (
          <div className="space-y-3">
            {categories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox 
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <Label 
                  htmlFor={`category-${category}`}
                  className="capitalize cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Price Range */}
      <div>
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleFilterSection('price')}
        >
          <h3 className="text-lg font-semibold">Price Range</h3>
          {expandedFilters.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {expandedFilters.price && (
          <div className="space-y-4">
            <Slider
              value={[priceRange[0], priceRange[1]]}
              min={0}
              max={500}
              step={10}
              onValueChange={(value) => setPriceRange([value[0], value[1]])}
            />
            <div className="flex justify-between">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>
      
      <Button 
        variant="outline" 
        className="w-full"
        onClick={handleClearFilters}
      >
        Clear Filters
      </Button>
    </div>
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop All Products</h1>
      
      {/* Mobile filters toggle */}
      <div className="mb-6 flex justify-between items-center lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal size={18} />
              <span>Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <h2 className="text-xl font-semibold mb-6">Filters</h2>
            <FiltersSidebar />
          </SheetContent>
        </Sheet>
        
        <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
            <SelectItem value="name-desc">Name: Z to A</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - desktop */}
        <div className="hidden lg:block w-1/4 bg-white p-6 rounded-lg shadow-sm">
          <FiltersSidebar />
        </div>
        
        {/* Products grid */}
        <div className="lg:w-3/4">
          {/* Desktop sorting */}
          <div className="hidden lg:flex justify-end mb-6">
            <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-2">No products found</h2>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
              <Button onClick={handleClearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
