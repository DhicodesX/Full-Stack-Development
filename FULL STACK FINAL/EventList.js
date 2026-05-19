import React from 'react';
import { Calendar, MapPin, Tag } from 'lucide-react';

const EventList = ({ events, onSelectEvent }) => {
  return (
    <div className="event-list">
      <h2>Upcoming Internal Events</h2>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              <h3>{event.name}</h3>
              <span className="department-badge">{event.department}</span>
            </div>
            
            <div className="event-details">
              <div className="detail-row">
                <Calendar size={18} />
                <span>{event.dateTime}</span>
              </div>
              <div className="detail-row">
                <MapPin size={18} />
                <span>{event.venue}</span>
              </div>
              <div className="detail-row highlight-price">
                <Tag size={18} />
                <span>₹{event.ticketPrice} per ticket</span>
              </div>
            </div>

            <div className="event-footer">
              <div className="tickets-left">
                <span className={event.availableTickets < 10 ? 'low-stock' : ''}>
                  {event.availableTickets} tickets left
                </span>
              </div>
              <button 
                className="btn-primary" 
                onClick={() => onSelectEvent(event)}
                disabled={event.availableTickets === 0}
              >
                {event.availableTickets === 0 ? 'Sold Out' : 'Book Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
