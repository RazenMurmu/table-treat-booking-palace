import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { format } from 'date-fns';
import { CreditCard, DollarSign, Calendar, Clock, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/utils';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { reservation, cart, total } = location.state || {};
  
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [loading, setLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = () => {
    if (!reservation || !cart) {
      toast({
        title: "Missing Information",
        description: "Reservation or order information is missing.",
        variant: "destructive"
      });
      return;
    }
    
    if (paymentMethod === 'credit-card' && 
        (!paymentDetails.cardName || 
         !paymentDetails.cardNumber || 
         !paymentDetails.expiryDate || 
         !paymentDetails.cvv)) {
      toast({
        title: "Missing Payment Information",
        description: "Please fill in all the required payment fields.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Payment Successful!",
        description: "Your table reservation and food pre-order are confirmed.",
      });
      
      // Navigate to confirmation page
      navigate('/confirmation', { 
        state: { 
          reservation, 
          cart, 
          total, 
          paymentMethod,
          orderNumber: Math.floor(100000 + Math.random() * 900000)
        } 
      });
    }, 1500);
  };
  
  if (!reservation || !cart || !cart.length) {
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
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
            Checkout
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    Reservation Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500 mb-1">Date</div>
                      <div className="font-medium">
                        {format(new Date(reservation.date), 'MMMM d, yyyy')}
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500 mb-1">Time</div>
                      <div className="font-medium">{reservation.time}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500 mb-1">Party Size</div>
                      <div className="font-medium">
                        {reservation.guests} {reservation.guests === 1 ? 'Guest' : 'Guests'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500 mb-1">Name</div>
                      <div className="font-medium">{reservation.name}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500 mb-1">Email</div>
                      <div className="font-medium">{reservation.email}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500 mb-1">Phone</div>
                      <div className="font-medium">{reservation.phone}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-primary" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                    className="mb-6"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card" className="cursor-pointer">
                        Credit / Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pay-at-restaurant" id="pay-at-restaurant" />
                      <Label htmlFor="pay-at-restaurant" className="cursor-pointer">
                        Pay at Restaurant
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === 'credit-card' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={paymentDetails.cardName}
                          onChange={handleInputChange}
                          placeholder="Enter name on card"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={paymentDetails.cardNumber}
                          onChange={handleInputChange}
                          placeholder="XXXX XXXX XXXX XXXX"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            value={paymentDetails.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            value={paymentDetails.cvv}
                            onChange={handleInputChange}
                            placeholder="XXX"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-primary" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    {cart.map((item: { id: number; name: string; price: number; quantity: number }) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">x{item.quantity}</div>
                        </div>
                        <div className="font-medium">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatCurrency(total)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="font-medium">{formatCurrency(total * 0.1)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{formatCurrency(total * 1.1)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleSubmit}
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Confirm Order & Pay'}
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    You won't be charged until your reservation date.
                  </p>
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

export default CheckoutPage;
