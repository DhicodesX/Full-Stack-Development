import React, { useState } from 'react';
import { X } from 'lucide-react';
import './SeatSelectionModal.css';

const SeatSelectionModal = ({ event, onClose, onConfirm }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState({});
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');

  const totalSeats = 30;
  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

  const occupiedSeats = event.occupiedSeats || [];

  const toggleSeat = (seat) => {
    if (occupiedSeats.includes(seat)) return;
    
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
      const newDetails = { ...passengerDetails };
      delete newDetails[seat];
      setPassengerDetails(newDetails);
    } else {
      setSelectedSeats([...selectedSeats, seat].sort((a, b) => a - b));
    }
  };

  const handlePassengerChange = (seat, name) => {
    setPassengerDetails({ ...passengerDetails, [seat]: name });
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) return;
    
    // Validation
    const allFilled = selectedSeats.every(seat => passengerDetails[seat] && passengerDetails[seat].trim() !== '');
    if (!allFilled) {
      alert("Please fill in names for all selected seats.");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!department.trim()) {
      alert("Please enter a Department/Organization.");
      return;
    }

    const bookingData = {
      seats: selectedSeats,
      passengers: passengerDetails,
      email: email,
      department: department,
      tickets: selectedSeats.length,
      name: selectedSeats.length === 1 ? passengerDetails[selectedSeats[0]] : `${passengerDetails[selectedSeats[0]]} +${selectedSeats.length - 1}`
    };
    
    onConfirm(bookingData);
  };

  return (
    <div className="seat-modal-overlay">
      <div className="seat-modal-content">
        <div className="seat-modal-header">
          <div className="header-left">
            <h2>Secure Your Spot</h2>
          </div>
          <div className="header-right">
            <span className="running-badge">Running</span>
            <button className="close-btn" onClick={onClose}><X size={24} /></button>
          </div>
        </div>

        <div className="seat-modal-body">
          <div className="stage-indicator">
            <span>STAGE / SCREEN</span>
            <div className="stage-bar"></div>
          </div>

          <div className="seats-grid-map">
            {seats.map(seat => {
              const isOccupied = occupiedSeats.includes(seat);
              const isSelected = selectedSeats.includes(seat);
              let className = "seat-btn";
              if (isOccupied) className += " occupied";
              else if (isSelected) className += " selected";
              
              return (
                <button 
                  key={seat} 
                  className={className}
                  onClick={() => toggleSeat(seat)}
                  disabled={isOccupied}
                >
                  {seat}
                </button>
              );
            })}
          </div>

          <div className="seat-legend">
            <div className="legend-item">
              <span className="legend-dot available"></span>
              <span>AVAILABLE</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot selected"></span>
              <span>SELECTED</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot occupied"></span>
              <span>OCCUPIED</span>
            </div>
          </div>

          <div className="passenger-section">
            <div className="section-title">Passenger Details</div>
            
            {selectedSeats.length === 0 ? (
              <div className="empty-passenger">Please select at least one seat</div>
            ) : (
              <div className="passenger-inputs">
                {selectedSeats.map(seat => (
                  <input 
                    key={seat}
                    type="text" 
                    className="seat-input" 
                    placeholder={`Name for Seat ${seat}`}
                    value={passengerDetails[seat] || ''}
                    onChange={(e) => handlePassengerChange(seat, e.target.value)}
                  />
                ))}
              </div>
            )}
            
            <div className="contact-details">
              <label className="input-label">Contact Email Address</label>
              <input 
                type="email" 
                className="seat-input mb-3" 
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <label className="input-label">Department / Organization</label>
              <input 
                type="text" 
                className="seat-input" 
                placeholder="Department Name"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="seat-modal-footer">
          <div className="summary-row">
            <span className="selected-count">Selected: <strong>{selectedSeats.length} ticket(s)</strong></span>
            <span className="total-price">Total: <strong>₹{selectedSeats.length * event.ticketPrice}</strong></span>
          </div>
          <div className="action-row">
            <button className="btn-reset" onClick={() => { setSelectedSeats([]); setPassengerDetails({}); }}>Reset</button>
            <button className="btn-confirm" onClick={handleConfirm} disabled={selectedSeats.length === 0}>Confirm Booking</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionModal;
