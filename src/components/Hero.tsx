
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative bg-restaurant-900 text-white">
      <div 
        className="absolute inset-0 bg-black opacity-40"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'multiply',
        }}
      ></div>
      
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-2xl animate-fadeIn">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Exquisite Dining Experience
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Reserve your table and pre-order your favorite dishes for a seamless dining experience.
            Enjoy the finest cuisine with our premium service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/reservations">
              <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                Book a Table
              </Button>
            </Link>
            <Link to="/menu">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 w-full sm:w-auto">
                View Menu
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
