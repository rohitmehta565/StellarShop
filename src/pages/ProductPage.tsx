
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  Truck, 
  ArrowLeftRight, 
  ShieldCheck,
  MinusCircle,
  PlusCircle,
  Heart
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getProductById, getRelatedProducts, Product } from '@/data/products';
import ProductGrid from '@/components/Products/ProductGrid';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  
  useEffect(() => {
    if (!id) return;
    
    const foundProduct = getProductById(id);
    if (foundProduct) {
      setProduct(foundProduct);
      setRelatedProducts(getRelatedProducts(foundProduct));
    }
    
    // Reset scroll position when product changes
    window.scrollTo(0, 0);
    // Reset quantity
    setQuantity(1);
    // Reset selected image
    setSelectedImage(0);
  }, [id]);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-4">The product you are looking for does not exist or has been removed.</p>
        <Link to="/shop">
          <Button className="mt-6">Return to Shop</Button>
        </Link>
      </div>
    );
  }
  
  // Simulate multiple product images (in a real app, each product would have its own image gallery)
  const productImages = [
    `${product.image}?auto=format&fit=crop&w=600&q=80`,
    `${product.image}?auto=format&fit=crop&w=600&q=80&sat=-100`, // Desaturated version
    `${product.image}?auto=format&fit=crop&w=600&q=80&blur=100`, // Blurred version
  ];
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/shop">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={`/category/${product.category}`} className="capitalize">
              {product.category}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <span className="text-muted-foreground truncate max-w-[200px] inline-block">
              {product.name}
            </span>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-square bg-white rounded-lg overflow-hidden">
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                  selectedImage === index ? 'border-shop-purple' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Product Info */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  className={`${
                    index < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-500">({product.rating})</span>
          </div>
          
          <div className="text-2xl font-bold text-shop-purple">
            ${product.price.toFixed(2)}
          </div>
          
          <p className="text-gray-600">{product.description}</p>
          
          <div className={`py-2 px-3 rounded-md inline-block ${
            product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {product.stock > 0 
              ? `In Stock (${product.stock} available)` 
              : 'Out of Stock'}
          </div>
          
          {product.stock > 0 && (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 font-medium">Quantity:</span>
                <div className="flex items-center">
                  <button 
                    onClick={decrementQuantity}
                    className="p-1"
                    disabled={quantity <= 1}
                  >
                    <MinusCircle 
                      size={22} 
                      className={`${quantity <= 1 ? 'text-gray-300' : 'text-shop-purple'}`} 
                    />
                  </button>
                  
                  <span className="mx-4 w-8 text-center">
                    {quantity}
                  </span>
                  
                  <button 
                    onClick={incrementQuantity}
                    className="p-1"
                    disabled={quantity >= product.stock}
                  >
                    <PlusCircle 
                      size={22} 
                      className={`${quantity >= product.stock ? 'text-gray-300' : 'text-shop-purple'}`} 
                    />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={handleAddToCart}
                  className="bg-shop-purple hover:bg-shop-dark-purple"
                  size="lg"
                >
                  Add to Cart
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-shop-purple text-shop-purple hover:bg-shop-light-purple"
                >
                  <Heart size={18} className="mr-2" />
                  Add to Wishlist
                </Button>
              </div>
            </div>
          )}
          
          <div className="space-y-3 pt-6">
            <div className="flex items-center">
              <Truck className="w-5 h-5 text-shop-purple mr-3" />
              <span className="text-sm text-gray-600">
                Free shipping on orders over $50
              </span>
            </div>
            <div className="flex items-center">
              <ArrowLeftRight className="w-5 h-5 text-shop-purple mr-3" />
              <span className="text-sm text-gray-600">
                30-day returns
              </span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="w-5 h-5 text-shop-purple mr-3" />
              <span className="text-sm text-gray-600">
                Secure payments
              </span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Product details and related products */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b mb-6">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="text-gray-600">
            <p className="mb-4">{product.description}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tortor vitae nisl faucibus gravida. 
              Nulla facilisi. Cras vehicula nisi at ante interdum, in facilisis lorem aliquet. Integer ultrices 
              euismod quam, at aliquam libero maximus vel.
            </p>
            <ul className="list-disc list-inside mt-4 mb-4">
              <li>High-quality materials</li>
              <li>Designed for durability and performance</li>
              <li>Backed by our satisfaction guarantee</li>
              <li>Modern design that fits any environment</li>
            </ul>
            <p>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </TabsContent>
          <TabsContent value="specifications" className="text-gray-600">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Category</td>
                      <td className="py-2 capitalize">{product.category}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Material</td>
                      <td className="py-2">Premium quality</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Dimensions</td>
                      <td className="py-2">10 x 5 x 2 inches</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Weight</td>
                      <td className="py-2">0.5 lbs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Warranty</td>
                      <td className="py-2">1 year limited warranty</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Origin</td>
                      <td className="py-2">Imported</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="text-gray-600">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Customer Reviews</h3>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={18}
                          className={`${
                            index < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-500">Based on 24 reviews</span>
                  </div>
                </div>
                <Button>Write a Review</Button>
              </div>
              
              <div className="space-y-6">
                <div className="border-t pt-6">
                  <div className="flex justify-between">
                    <span className="font-bold">Sarah J.</span>
                    <span className="text-gray-500">2 days ago</span>
                  </div>
                  <div className="flex my-2">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={`${
                          index < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p>
                    Absolutely love this product! The quality exceeded my expectations and it arrived 
                    earlier than anticipated. Will definitely purchase again.
                  </p>
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex justify-between">
                    <span className="font-bold">Michael R.</span>
                    <span className="text-gray-500">1 week ago</span>
                  </div>
                  <div className="flex my-2">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={`${
                          index < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p>
                    Great product overall. Durable and well-made. The only reason I'm not giving it 
                    5 stars is because the color is slightly different than what's shown in the pictures.
                  </p>
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex justify-between">
                    <span className="font-bold">Emily T.</span>
                    <span className="text-gray-500">2 weeks ago</span>
                  </div>
                  <div className="flex my-2">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={`${
                          index < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p>
                    This is exactly what I was looking for! Fast shipping, excellent packaging, and 
                    the product itself is perfect. Would definitely recommend to friends and family.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductPage;
