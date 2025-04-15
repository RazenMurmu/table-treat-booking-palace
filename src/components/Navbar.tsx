
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Utensils, CalendarDays, User, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Utensils className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-semibold">Table Treat</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-restaurant-900 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/menu" className="text-restaurant-900 hover:text-primary transition-colors">
            Menu
          </Link>
          <Link to="/reservations" className="text-restaurant-900 hover:text-primary transition-colors">
            Reservations
          </Link>
          <Link to="/about" className="text-restaurant-900 hover:text-primary transition-colors">
            About
          </Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <Link to="/reservations">
            <Button variant="ghost" size="sm" className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Book a Table</span>
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
