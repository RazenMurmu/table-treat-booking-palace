import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Utensils, CreditCard, X } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/utils';

interface Booking {
  id: string;
  date: string;
  time: string;
  guests: number;
  tableId: number;
  name: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  orderNumber: string;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<string>('upcoming');

  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    } else {
      const dummyBookings: Booking[] = [
        {
          id: '1',
          date: new Date(Date.now() + 86400000 * 2).toISOString(),
          time: '7:00 PM',
          guests: 2,
          tableId: 3,
          name: 'John Doe',
          status: 'upcoming',
          orderNumber: 'ORD-10001',
          items: [
            { id: 1, name: 'Grilled Salmon', price: 24.99, quantity: 1 },
            { id: 2, name: 'Caesar Salad', price: 12.99, quantity: 1 }
          ],
          total: 41.58
        },
        {
          id: '2',
          date: new Date(Date.now() - 86400000 * 3).toISOString(),
          time: '6:30 PM',
          guests: 4,
          tableId: 5,
          name: 'John Doe',
          status: 'completed',
          orderNumber: 'ORD-10000',
          items: [
            { id: 3, name: 'Filet Mignon', price: 36.99, quantity: 2 },
            { id: 4, name: 'Lobster Bisque', price: 14.99, quantity: 1 }
          ],
          total: 97.67
        }
      ];
      
      setBookings(dummyBookings);
      localStorage.setItem('bookings', JSON.stringify(dummyBookings));
    }
  }, []);

  const cancelBooking = (bookingId: string) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'cancelled' as const } : booking
    );
    
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    toast({
      title: "Booking Cancelled",
      description: "Your reservation has been cancelled successfully.",
    });
  };

  const modifyBooking = (bookingId: string) => {
    toast({
      title: "Modify Booking",
      description: "This feature is coming soon!",
    });
  };

  const filteredBookings = bookings.filter(booking => booking.status === activeTab);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-3xl font-display">My Profile</CardTitle>
                <CardDescription>View and manage your reservations and orders</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
                    <TabsTrigger value="completed">Past Bookings</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled Bookings</TabsTrigger>
                  </TabsList>
                  
                  {['upcoming', 'completed', 'cancelled'].map((status) => (
                    <TabsContent key={status} value={status}>
                      {filteredBookings.length === 0 ? (
                        <div className="text-center py-12">
                          <h3 className="text-lg font-medium mb-2">No {status} bookings</h3>
                          {status === 'upcoming' && (
                            <>
                              <p className="text-gray-600 mb-4">Make a reservation to get started</p>
                              <Button onClick={() => navigate('/reservations')}>
                                Book a Table
                              </Button>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {filteredBookings.map((booking) => (
                            <Card key={booking.id}>
                              <CardHeader className="bg-muted/30">
                                <div className="flex flex-wrap justify-between items-start">
                                  <div>
                                    <CardTitle className="text-xl mb-1">
                                      Reservation #{booking.orderNumber}
                                    </CardTitle>
                                    <CardDescription className="flex items-center gap-1">
                                      <Calendar className="h-4 w-4" />
                                      {format(new Date(booking.date), 'MMMM d, yyyy')}
                                      <span className="mx-1">•</span>
                                      <Clock className="h-4 w-4" />
                                      {booking.time}
                                      <span className="mx-1">•</span>
                                      {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                                    </CardDescription>
                                  </div>
                                  {booking.status === 'upcoming' && (
                                    <div className="flex gap-2 mt-2 sm:mt-0">
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => modifyBooking(booking.id)}
                                      >
                                        Modify
                                      </Button>
                                      <Button 
                                        variant="destructive" 
                                        size="sm"
                                        onClick={() => cancelBooking(booking.id)}
                                      >
                                        <X className="h-4 w-4 mr-1" />
                                        Cancel
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </CardHeader>
                              <CardContent className="pt-6">
                                <h4 className="font-medium flex items-center mb-3">
                                  <Utensils className="h-4 w-4 mr-2 text-primary" />
                                  Pre-ordered Items
                                </h4>
                                <div className="space-y-2 mb-4">
                                  {booking.items.map(item => (
                                    <div key={item.id} className="flex justify-between">
                                      <span>
                                        {item.name} x {item.quantity}
                                      </span>
                                      <span className="font-medium">
                                        {formatCurrency(item.price * item.quantity)}
                                      </span>
                                    </div>
                                  ))}
                                  <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between font-semibold">
                                      <span>Total:</span>
                                      <span>{formatCurrency(booking.total)}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                                  <div className="flex items-center text-sm text-gray-600">
                                    <CreditCard className="h-4 w-4 mr-1" />
                                    Payment: Completed
                                  </div>
                                  {booking.status === 'upcoming' && (
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => navigate(`/confirmation`, { 
                                        state: { 
                                          reservation: {
                                            date: booking.date,
                                            time: booking.time,
                                            guests: booking.guests,
                                            name: booking.name
                                          },
                                          cart: booking.items,
                                          total: booking.total,
                                          orderNumber: booking.orderNumber,
                                          paymentMethod: 'credit-card'
                                        } 
                                      })}
                                    >
                                      View Details
                                    </Button>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
