import React from 'react';

const EventDetails = ({ event }) => {
  return (
    <div className="card event-details">
      <h2>Event Details</h2>
      <div className="details-grid">
        <div className="detail-item">
          <span className="label">Event Name:</span>
          <span className="value">{event.name}</span>
        </div>
        <div className="detail-item">
          <span className="label">Department:</span>
          <span className="value">{event.department}</span>
        </div>
        <div className="detail-item">
          <span className="label">Date and Time:</span>
          <span className="value">{event.dateTime}</span>
        </div>
        <div className="detail-item">
          <span className="label">Venue:</span>
          <span className="value">{event.venue}</span>
        </div>
        <div className="detail-item">
          <span className="label">Ticket Price:</span>
          <span className="value">₹{event.ticketPrice}</span>
        </div>
        <div className="detail-item highlight">
          <span className="label">Available Tickets:</span>
          <span className="value">{event.availableTickets}</span>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
