import React, { useState } from 'react';
import { Edit2, Trash2, Plus, Users, Calendar, Clock, MapPin, Tag } from 'lucide-react';
import './AdminDashboard.css';

function AdminDashboard({ events, bookings, onCreateEvent, onUpdateEvent, onDeleteEvent }) {
  const [activeTab, setActiveTab] = useState('events');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '', department: '', dateTime: '', venue: '', ticketPrice: 0, availableTickets: 0
  });

  const openModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        name: event.name,
        department: event.department,
        dateTime: event.dateTime,
        venue: event.venue,
        ticketPrice: event.ticketPrice,
        availableTickets: event.availableTickets,
      });
    } else {
      setEditingEvent(null);
      setFormData({
        name: '', department: '', dateTime: '', venue: '', ticketPrice: 0, availableTickets: 0
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      onUpdateEvent({ ...editingEvent, ...formData });
    } else {
      onCreateEvent({ 
        ...formData, 
        id: Date.now(), 
        occupiedSeats: [],
        ticketPrice: Number(formData.ticketPrice),
        availableTickets: Number(formData.availableTickets)
      });
    }
    closeModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <Calendar size={18} /> Manage Events
          </button>
          <button 
            className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <Users size={18} /> View Registrations
          </button>
        </div>
      </div>

      {activeTab === 'events' && (
        <div className="admin-section">
          <div className="section-header">
            <h3>All Events</h3>
            <button className="btn-primary" onClick={() => openModal()} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <Plus size={18} /> Create New Event
            </button>
          </div>
          
          <div className="events-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Department</th>
                  <th>Date & Time</th>
                  <th>Venue</th>
                  <th>Price</th>
                  <th>Available</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event.id}>
                    <td><strong>{event.name}</strong></td>
                    <td>{event.department}</td>
                    <td>{event.dateTime}</td>
                    <td>{event.venue}</td>
                    <td>₹{event.ticketPrice}</td>
                    <td>{event.availableTickets}</td>
                    <td className="actions-cell">
                      <button className="icon-btn edit-btn" onClick={() => openModal(event)} title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="icon-btn delete-btn" onClick={() => onDeleteEvent(event.id)} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {events.length === 0 && (
                  <tr>
                    <td colSpan="7" className="empty-state">No events found. Create one!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="admin-section">
          <div className="section-header">
            <h3>Registered Users</h3>
          </div>
          
          <div className="events-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Attendee Name</th>
                  <th>Email</th>
                  <th>Event</th>
                  <th>Tickets</th>
                  <th>Seats</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td><span className="mono-text">#{booking.id.toString().slice(-6)}</span></td>
                    <td><strong>{booking.name}</strong></td>
                    <td>{booking.email}</td>
                    <td>{booking.event.name}</td>
                    <td>{booking.tickets}</td>
                    <td>{booking.seats.join(', ')}</td>
                    <td><strong style={{color: '#10b981'}}>₹{booking.tickets * booking.event.ticketPrice}</strong></td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan="7" className="empty-state">No bookings found yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content admin-modal">
            <div className="modal-header">
              <h2>{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Event Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input type="text" name="department" value={formData.department} onChange={handleChange} required className="form-input" />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Date & Time</label>
                  <div className="input-with-icon">
                    <Clock size={16} />
                    <input type="text" name="dateTime" value={formData.dateTime} onChange={handleChange} placeholder="e.g. Oct 15, 2026 | 09:00 AM" required className="form-input" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Venue</label>
                  <div className="input-with-icon">
                    <MapPin size={16} />
                    <input type="text" name="venue" value={formData.venue} onChange={handleChange} required className="form-input" />
                  </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Ticket Price (₹)</label>
                  <div className="input-with-icon">
                    <Tag size={16} />
                    <input type="number" name="ticketPrice" value={formData.ticketPrice} onChange={handleChange} min="0" required className="form-input" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Total Capacity / Available</label>
                  <div className="input-with-icon">
                    <Users size={16} />
                    <input type="number" name="availableTickets" value={formData.availableTickets} onChange={handleChange} min="0" required className="form-input" />
                  </div>
                </div>
              </div>
              
              <div className="modal-actions" style={{marginTop: '2rem'}}>
                <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary">{editingEvent ? 'Update Event' : 'Create Event'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
