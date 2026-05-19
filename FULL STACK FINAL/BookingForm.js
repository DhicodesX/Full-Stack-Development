import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Briefcase, Ticket } from 'lucide-react';

const BookingForm = ({ event, onBook, onBack }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', department: '', tickets: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.tickets) {
      newErrors.tickets = 'Required';
    } else if (isNaN(formData.tickets) || Number(formData.tickets) <= 0) {
      newErrors.tickets = 'Must be > 0';
    } else if (Number(formData.tickets) > event.availableTickets) {
      newErrors.tickets = `Max ${event.availableTickets}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onBook({ ...formData, tickets: Number(formData.tickets) });
    }
  };

  return (
    <div className="form-container">
      <button className="btn-back" onClick={onBack}><ArrowLeft size={20} /> Back to Events</button>
      
      <div className="form-card">
        <div className="form-header">
          <h2>Book Tickets for {event.name}</h2>
          <p>Please fill out the details below to secure your spot.</p>
        </div>

        <form onSubmit={handleSubmit} className="premium-form">
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input type="text" name="name" value={formData.name} onChange={handleChange} className={errors.name ? 'error' : ''} placeholder="John Doe" />
            </div>
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label>Email ID</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} placeholder="john@example.com" />
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>Department</label>
              <div className="input-wrapper">
                <Briefcase className="input-icon" size={20} />
                <input type="text" name="department" value={formData.department} onChange={handleChange} className={errors.department ? 'error' : ''} placeholder="e.g. Computer Science" />
              </div>
              {errors.department && <span className="error-text">{errors.department}</span>}
            </div>

            <div className="form-group half">
              <label>Number of Tickets</label>
              <div className="input-wrapper">
                <Ticket className="input-icon" size={20} />
                <input type="number" name="tickets" value={formData.tickets} onChange={handleChange} className={errors.tickets ? 'error' : ''} placeholder={`Max ${event.availableTickets}`} />
              </div>
              {errors.tickets && <span className="error-text">{errors.tickets}</span>}
            </div>
          </div>

          <div className="price-preview">
            <span>Total Amount:</span>
            <strong>₹{(Number(formData.tickets) || 0) * event.ticketPrice}</strong>
          </div>

          <button type="submit" className="btn-submit">Proceed to Payment</button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
