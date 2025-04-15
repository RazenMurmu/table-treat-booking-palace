
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarDays, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const availableTimes = [
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", 
  "1:00 PM", "1:30 PM", "5:00 PM", "5:30 PM", 
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", 
  "8:00 PM", "8:30 PM"
];

const tables = [
  { id: 1, name: "Table 1", seats: 2, location: "Window" },
  { id: 2, name: "Table 2", seats: 2, location: "Window" },
  { id: 3, name: "Table 3", seats: 4, location: "Center" },
  { id: 4, name: "Table 4", seats: 4, location: "Center" },
  { id: 5, name: "Table 5", seats: 6, location: "Private" },
  { id: 6, name: "Table 6", seats: 8, location: "Private" },
];

const ReservationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("");
  const [guests, setGuests] = useState<number>(2);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!date || !time || !selectedTable || !contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all the required fields.",
        variant: "destructive"
      });
      return;
    }

    // In a real application, you would send this reservation to your backend
    // Here we'll just simulate a successful reservation and navigate to menu
    toast({
      title: "Reservation Confirmed!",
      description: `Your table is booked for ${format(date, 'MMMM d, yyyy')} at ${time}.`,
    });

    // Navigate to menu for pre-ordering
    navigate('/menu', { 
      state: { 
        reservation: {
          date: date,
          time: time,
          guests: guests,
          tableId: selectedTable,
          ...contactInfo
        } 
      } 
    });
  };

  // Filter tables based on guest count
  const availableTables = tables.filter(table => table.seats >= guests);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">Reserve Your Table</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <CalendarDays className="h-5 w-5 mr-2 text-primary" />
                    Select Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    Select Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Time" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes.map((timeOption) => (
                        <SelectItem key={timeOption} value={timeOption}>
                          {timeOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    Party Size
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select 
                    value={guests.toString()} 
                    onValueChange={(value) => setGuests(parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Select a Table</CardTitle>
              </CardHeader>
              <CardContent>
                {availableTables.length === 0 ? (
                  <p className="text-gray-500">No tables available for this party size. Please select fewer guests.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableTables.map((table) => (
                      <div 
                        key={table.id}
                        className={`border rounded-md p-4 cursor-pointer transition-colors ${
                          selectedTable === table.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedTable(table.id)}
                      >
                        <h3 className="font-medium">{table.name}</h3>
                        <p className="text-sm text-gray-500">
                          {table.seats} Seats • {table.location}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={contactInfo.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={contactInfo.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={contactInfo.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <Button 
                    onClick={handleSubmit} 
                    className="w-full"
                  >
                    Confirm Reservation & Continue to Pre-Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReservationPage;
