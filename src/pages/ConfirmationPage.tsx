
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { CheckCircle, CalendarDays, Clock, Users, Utensils } from 'lucide-react';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { reservation, cart, total, paymentMethod, orderNumber } = location.state || {};
  
  // If no reservation or cart data, redirect to home
  if (!reservation || !cart || !orderNumber) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-display font-semibold mb-4">No Reservation Data</h2>
            <p className="text-gray-600 mb-6">
              Please make a reservation and add items to your order first.
            </p>
            <Button onClick={() => navigate('/reservations')}>
              Make a Reservation
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                Reservation Confirmed!
              </h1>
              <p className="text-gray-600">
                Your table reservation and food pre-order have been successfully confirmed.
              </p>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Order #: {orderNumber}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <CalendarDays className="h-5 w-5 mr-2 text-primary" /> 
                      Reservation Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">
                          {format(new Date(reservation.date), 'MMMM d, yyyy')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{reservation.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Party Size:</span>
                        <span className="font-medium">
                          {reservation.guests} {reservation.guests === 1 ? 'Guest' : 'Guests'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{reservation.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="font-medium">
                          {paymentMethod === 'credit-card' ? 'Credit Card' : 'Pay at Restaurant'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:border-l md:pl-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Utensils className="h-5 w-5 mr-2 text-primary" /> 
                      Pre-Order Summary
                    </h3>
                    <div className="space-y-3 mb-6">
                      {cart.map((item: { id: number; name: string; price: number; quantity: number }) => (
                        <div key={item.id} className="flex justify-between">
                          <span className="text-gray-600">
                            {item.name} x {item.quantity}
                          </span>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>${(total * 1.1).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h3 className="text-lg font-semibold mb-4">Important Information</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  A confirmation email has been sent to {reservation.email}
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Please arrive 10 minutes before your reservation time
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Your table will be held for 15 minutes after your reservation time
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  For any changes, please contact us at least 2 hours before your reservation
                </li>
              </ul>
            </div>
            
            <div className="text-center space-y-4">
              <Button 
                onClick={() => navigate('/')}
                variant="default" 
                size="lg"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConfirmationPage;
