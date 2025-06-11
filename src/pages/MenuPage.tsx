import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/utils';

// Menu data
const menuCategories = [
  {
    id: 'starters',
    name: 'Starters',
    items: [
      {
        id: 1,
        name: 'Bruschetta',
        description: 'Toasted bread topped with tomatoes, garlic, and fresh basil.',
        price: 829,
        image: 'https://images.unsplash.com/photo-1572695644241-9c00be9ab08c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
      {
        id: 2,
        name: 'Calamari',
        description: 'Crispy fried squid served with lemon aioli.',
        price: 1079,
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1430&q=80',
      },
      {
        id: 3,
        name: 'Stuffed Mushrooms',
        description: 'Mushrooms filled with herb and garlic cream cheese.',
        price: 995,
        image: 'https://images.unsplash.com/photo-1608682942533-cad71be42bb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
    ],
  },
  {
    id: 'mains',
    name: 'Main Courses',
    items: [
      {
        id: 4,
        name: 'Filet Mignon',
        description: 'Premium beef tenderloin cooked to your preference, served with roasted vegetables.',
        price: 2904,
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
      {
        id: 5,
        name: 'Grilled Salmon',
        description: 'Fresh salmon grilled to perfection with lemon herb butter and seasonal vegetables.',
        price: 2074,
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
      {
        id: 6,
        name: 'Truffle Risotto',
        description: 'Creamy arborio rice with wild mushrooms, finished with truffle oil and parmesan.',
        price: 1825,
        image: 'https://images.unsplash.com/photo-1633964913295-ceb43826a07a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
    ],
  },
  {
    id: 'desserts',
    name: 'Desserts',
    items: [
      {
        id: 7,
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream.',
        price: 829,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea2756c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      },
      {
        id: 8,
        name: 'Chocolate Fondant',
        description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
        price: 1079,
        image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
      {
        id: 9,
        name: 'Crème Brûlée',
        description: 'Rich vanilla custard with a caramelized sugar crust.',
        price: 912,
        image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
    ],
  },
  {
    id: 'drinks',
    name: 'Drinks',
    items: [
      {
        id: 10,
        name: 'Red Wine',
        description: 'Glass of premium house red wine.',
        price: 746,
        image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
      {
        id: 11,
        name: 'Craft Beer',
        description: 'Local craft beer, rotating selection.',
        price: 580,
        image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
      {
        id: 12,
        name: 'Signature Cocktail',
        description: 'House special craft cocktail with premium spirits.',
        price: 1079,
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80',
      },
    ],
  },
];

// Cart item type
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const MenuPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const reservation = location.state?.reservation;
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState('starters');
  
  const addToCart = (item: { id: number; name: string; price: number }) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    
    toast({
      title: `Added to cart`,
      description: `${item.name} has been added to your order.`,
    });
  };
  
  const decreaseQuantity = (id: number) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item => 
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter(item => item.id !== id);
    });
  };
  
  const increaseQuantity = (id: number) => {
    setCart(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const proceedToCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your order before proceeding.",
        variant: "destructive"
      });
      return;
    }
    
    navigate('/checkout', { 
      state: { 
        reservation,
        cart,
        total: calculateTotal()
      } 
    });
  };
  
  const reservationMessage = reservation ? (
    <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
      <p className="text-green-700">
        Your table is reserved! Now you can pre-order your food.
      </p>
    </div>
  ) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">Our Menu</h1>
          
          {reservationMessage}
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <Tabs defaultValue="starters" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6 grid grid-cols-4">
                  {menuCategories.map(category => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {menuCategories.map(category => (
                  <TabsContent key={category.id} value={category.id} className="space-y-6">
                    {category.items.map(item => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-1/3 h-48 md:h-auto">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="md:w-2/3 p-6">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-display font-semibold">{item.name}</h3>
                              <span className="font-medium text-lg">{formatCurrency(item.price)}</span>
                            </div>
                            <p className="text-gray-600 mb-4">{item.description}</p>
                            <Button 
                              variant="default" 
                              onClick={() => addToCart(item)}
                              className="w-full sm:w-auto"
                            >
                              <Plus className="h-4 w-4 mr-2" /> Add to Order
                            </Button>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            
            <div className="md:w-1/3">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-display font-semibold">Your Order</h3>
                    <ShoppingCart className="h-5 w-5 text-primary" />
                  </div>
                  
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      Your order is empty. Add items from the menu.
                    </p>
                  ) : (
                    <div className="space-y-4 mb-6">
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-500">
                              {formatCurrency(item.price)} x {item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => decreaseQuantity(item.id)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => increaseQuantity(item.id)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span>{formatCurrency(calculateTotal())}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={proceedToCheckout}
                    className="w-full"
                    disabled={cart.length === 0}
                  >
                    {reservation ? 'Proceed to Checkout' : 'Book Table & Checkout'}
                  </Button>
                  
                  {!reservation && (
                    <p className="text-xs text-gray-500 text-center mt-2">
                      You'll need to reserve a table before completing your order.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MenuPage;
