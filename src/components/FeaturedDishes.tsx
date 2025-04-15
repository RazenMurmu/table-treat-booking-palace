
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const featuredDishes = [
  {
    id: 1,
    name: 'Grilled Salmon',
    description: 'Fresh salmon grilled to perfection with lemon herb butter and seasonal vegetables.',
    price: '$24.99',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    category: 'Main Course'
  },
  {
    id: 2,
    name: 'Truffle Risotto',
    description: 'Creamy arborio rice with wild mushrooms, finished with truffle oil and parmesan.',
    price: '$21.99',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826a07a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    category: 'Pasta & Risotto'
  },
  {
    id: 3,
    name: 'Chocolate Fondant',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
    price: '$12.99',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    category: 'Dessert'
  }
];

const FeaturedDishes = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Dishes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience our chef's carefully crafted specialties, made with the finest ingredients for an unforgettable dining experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDishes.map((dish) => (
            <Card key={dish.id} className="restaurant-card overflow-hidden border-none">
              <div className="h-48 overflow-hidden">
                <img 
                  src={dish.image} 
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="text-sm text-primary font-medium mb-2">{dish.category}</div>
                <h3 className="text-xl font-display font-semibold mb-2">{dish.name}</h3>
                <p className="text-gray-600 mb-4">{dish.description}</p>
                <div className="font-semibold text-restaurant-900">{dish.price}</div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button variant="outline" className="w-full">Add to Order</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/menu">
            <Button variant="default" size="lg">
              View Full Menu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
