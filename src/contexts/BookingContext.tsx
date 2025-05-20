import React, { createContext, useState, useContext } from 'react';
import { Booking, Room } from '../types';

interface BookingContextType {
  selectedRoom: Room | null;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  guests: number;
  bookings: Booking[];
  setSelectedRoom: (room: Room | null) => void;
  setCheckInDate: (date: Date | null) => void;
  setCheckOutDate: (date: Date | null) => void;
  setGuests: (count: number) => void;
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
  calculateTotalPrice: () => number;
  isRoomAvailable: (roomId: string, checkIn: Date, checkOut: Date) => boolean;
  selectedBoard: 'BB' | 'HB' | 'FB';
  setSelectedBoard: (board: 'BB' | 'HB' | 'FB') => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedRoom, setSelectedRoomState] = useState<Room | null>(null);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number>(1);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<'BB' | 'HB' | 'FB'>('BB');

  const addBooking = (booking: Booking) => {
    // Ensure the booking object includes the selected board type
    const bookingWithBoard = { ...booking, boardType: selectedBoard };
    setBookings([...bookings, bookingWithBoard]);
    // In a real app, this would make an API call to save the booking
    console.log('Booking added:', bookingWithBoard);
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(bookings.filter(booking => booking.id !== bookingId));
    // In a real app, this would make an API call to cancel the booking
  };

  const calculateTotalPrice = () => {
    if (!selectedRoom || !checkInDate || !checkOutDate) return 0;
    
    const days = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    
    let pricePerNight = 0;
    if (selectedBoard === 'BB') {
      pricePerNight = selectedRoom.price;
    } else if (selectedBoard === 'HB' && selectedRoom.priceHalfBoard) {
      pricePerNight = selectedRoom.priceHalfBoard;
    } else if (selectedBoard === 'FB' && selectedRoom.priceFullBoard) {
      pricePerNight = selectedRoom.priceFullBoard;
    } else {
      // Fallback to BB price if selected board price is not available
      pricePerNight = selectedRoom.price;
    }

    return pricePerNight * days;
  };

  const isRoomAvailable = (roomId: string, checkIn: Date, checkOut: Date) => {
    // Check if the room is booked for the selected dates
    return !bookings.some(booking => 
      booking.roomId === roomId && 
      booking.status !== 'cancelled' &&
      ((checkIn >= booking.checkIn && checkIn < booking.checkOut) || 
       (checkOut > booking.checkIn && checkOut <= booking.checkOut) ||
       (checkIn <= booking.checkIn && checkOut >= booking.checkOut))
    );
  };

  const handleSetSelectedRoom = (room: Room | null) => {
    setSelectedRoomState(room);
    if (room) {
      setSelectedBoard('BB');
    }
  };

  return (
    <BookingContext.Provider value={{
      selectedRoom,
      checkInDate,
      checkOutDate,
      guests,
      bookings,
      setSelectedRoom: handleSetSelectedRoom,
      setCheckInDate,
      setCheckOutDate,
      setGuests,
      addBooking,
      cancelBooking,
      calculateTotalPrice,
      isRoomAvailable,
      selectedBoard,
      setSelectedBoard
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};