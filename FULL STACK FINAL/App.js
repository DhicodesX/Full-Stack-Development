import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import SeatSelectionModal from './components/SeatSelectionModal';
import PaymentModal from './components/PaymentModal';
import BookingSummary from './components/BookingSummary';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { CalendarDays, LogOut, User } from 'lucide-react';
import './App.css';

const initialEvents = [
  { id: 1, name: 'TechNovation 2026', department: 'Computer Science', dateTime: 'Oct 15, 2026 | 09:00 AM', venue: 'Main Auditorium', ticketPrice: 200, availableTickets: 30, occupiedSeats: [] },
  { id: 2, name: 'MechanoFest', department: 'Mechanical Eng.', dateTime: 'Nov 02, 2026 | 10:00 AM', venue: 'Workshop Hall A', ticketPrice: 150, availableTickets: 30, occupiedSeats: [] },
  { id: 3, name: 'BioTech Symposium', department: 'Biotechnology', dateTime: 'Dec 10, 2026 | 11:00 AM', venue: 'Seminar Room 3', ticketPrice: 100, availableTickets: 0, occupiedSeats: Array.from({length: 30}, (_, i) => i+1) },
];

function App() {
  // Authentication state
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Data state
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('eventsData');
    return savedEvents ? JSON.parse(savedEvents) : initialEvents;
  });
  
  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem('bookingsData');
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  // App UI state
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sync data to localStorage
  useEffect(() => {
    localStorage.setItem('eventsData', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('bookingsData', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Auth Handlers
  const handleLogin = (role, username) => {
    setCurrentUser({ role, username });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    handleHome();
  };

  // User Handlers
  const handleBook = (data) => {
    // Add logged-in user details to booking data if possible, or use the form's name
    setBookingData({ ...data, email: data.email || currentUser.username + '@example.com' });
    setShowPayment(true);
  };

  const handlePaymentConfirm = () => {
    setShowPayment(false);
    setShowSuccess(true);
    setEvents(events.map(ev => 
      ev.id === selectedEvent.id 
        ? { ...ev, availableTickets: ev.availableTickets - bookingData.tickets, occupiedSeats: [...(ev.occupiedSeats || []), ...bookingData.seats] }
        : ev
    ));
    setBookings([...bookings, { ...bookingData, id: Date.now(), event: selectedEvent, bookedBy: currentUser.username }]);
  };

  const handleHome = () => {
    setSelectedEvent(null);
    setBookingData(null);
    setShowPayment(false);
    setShowSuccess(false);
  };

  // Admin Handlers
  const handleCreateEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents(events.map(ev => ev.id === updatedEvent.id ? updatedEvent : ev));
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(ev => ev.id !== id));
  };

  // Filter bookings for the current user
  const userBookings = bookings.filter(b => b.bookedBy === currentUser?.username);

  return (
    <div className="App">
      <header className="app-navbar">
        <div className="nav-brand" onClick={handleHome} style={{cursor: 'pointer'}}>
          <CalendarDays size={28} />
          <h1>EventMaster</h1>
        </div>
        
        {currentUser && (
          <div className="nav-user" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0' }}>
              <User size={18} style={{ color: currentUser.role === 'admin' ? '#f59e0b' : '#10b981' }} />
              <span>{currentUser.username} <small style={{ color: '#64748b', textTransform: 'uppercase', fontSize: '0.7rem' }}>({currentUser.role})</small></span>
            </div>
            <button onClick={handleLogout} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </header>
      
      <main className="main-container">
        {!currentUser && (
          <Login onLogin={handleLogin} />
        )}

        {currentUser?.role === 'admin' && (
          <AdminDashboard 
            events={events} 
            bookings={bookings} 
            onCreateEvent={handleCreateEvent}
            onUpdateEvent={handleUpdateEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        )}

        {currentUser?.role === 'user' && !selectedEvent && !showSuccess && (
          <>
            <EventList events={events} onSelectEvent={setSelectedEvent} />
            
            {userBookings.length > 0 && (
              <div className="my-bookings-section">
                <h2 style={{marginTop: '3rem', color: '#10b981'}}>My Booked Tickets</h2>
                <div className="events-grid">
                  {userBookings.map(b => (
                    <div key={b.id} className="event-card" style={{borderColor: 'rgba(16, 185, 129, 0.3)'}}>
                      <div className="event-header">
                        <h3>{b.event.name}</h3>
                        <span className="department-badge" style={{color: '#10b981', background: 'rgba(16, 185, 129, 0.1)'}}>Booked</span>
                      </div>
                      <div className="event-details" style={{gap: '0.5rem', marginBottom: '1rem'}}>
                         <div className="detail-row"><span>Attendee:</span> <strong style={{color: '#f8fafc', marginLeft: '0.5rem'}}>{b.name}</strong></div>
                         <div className="detail-row"><span>Tickets:</span> <strong style={{color: '#f8fafc', marginLeft: '0.5rem'}}>{b.tickets}</strong></div>
                         <div className="detail-row"><span>Amount Paid:</span> <strong style={{color: '#10b981', marginLeft: '0.5rem'}}>₹{b.tickets * b.event.ticketPrice}</strong></div>
                      </div>
                      <div className="event-footer">
                         <button className="btn-secondary" style={{width: '100%', justifyContent: 'center'}} onClick={() => {
                            setBookingData(b);
                            setSelectedEvent(b.event);
                            setShowSuccess(true);
                         }}>View Digital Ticket</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {currentUser?.role === 'user' && selectedEvent && !showPayment && !showSuccess && (
          <SeatSelectionModal 
            event={selectedEvent} 
            onConfirm={handleBook} 
            onClose={() => setSelectedEvent(null)}
          />
        )}

        {currentUser?.role === 'user' && showPayment && (
          <PaymentModal 
            event={selectedEvent}
            bookingData={bookingData}
            onConfirm={handlePaymentConfirm}
            onCancel={() => setShowPayment(false)}
          />
        )}

        {currentUser?.role === 'user' && showSuccess && (
          <BookingSummary 
            event={selectedEvent}
            bookingData={bookingData}
            onHome={handleHome}
          />
        )}
      </main>
    </div>
  );
}

export default App;