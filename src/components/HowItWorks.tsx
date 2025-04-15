
import React from 'react';
import { Calendar, Utensils, CreditCard, CheckCircle } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Choose Date & Time',
    description: 'Select your preferred date and time for your dining experience.',
    icon: Calendar,
  },
  {
    id: 2,
    title: 'Pre-Order Your Meal',
    description: 'Browse our menu and select the dishes you\'d like to enjoy.',
    icon: Utensils,
  },
  {
    id: 3,
    title: 'Secure Payment',
    description: 'Complete your reservation with our secure payment system.',
    icon: CreditCard,
  },
  {
    id: 4,
    title: 'Enjoy Your Experience',
    description: 'Arrive at the restaurant and enjoy your pre-ordered meal.',
    icon: CheckCircle,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our simple 4-step process makes dining with us effortless and enjoyable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="bg-white p-8 rounded-lg text-center shadow transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
