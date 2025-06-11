
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Utensils, CalendarDays, User, ShoppingCart, Settings, LogOut } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const { user, profile, signOut, isAdmin } = useAuth();

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
          {isAdmin && (
            <Link to="/admin" className="text-restaurant-900 hover:text-primary transition-colors">
              Admin Panel
            </Link>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {user ? (
            <>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">{profile?.full_name || 'Account'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="flex items-center text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
