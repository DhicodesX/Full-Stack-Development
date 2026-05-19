import React, { useState, useEffect } from 'react';
import { CreditCard, Clock, X, AlertCircle } from 'lucide-react';

const PaymentModal = ({ bookingData, event, onConfirm, onCancel }) => {
  const [timeLeft, setTimeLeft] = useState(120);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (timeLeft <= 0) return;
    setIsProcessing(true);
    setTimeout(() => {
      onConfirm();
    }, 2000);
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timeStr = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  const isExpired = timeLeft <= 0;

  return (
    <div className="modal-overlay">
      <div className="modal-content payment-modal">
        <div className="modal-header">
          <h2>Secure Checkout</h2>
          <button onClick={onCancel} className="btn-close" disabled={isProcessing}><X /></button>
        </div>

        {isExpired ? (
          <div className="expired-state">
            <AlertCircle size={48} color="#ef4444" />
            <h3>Session Expired</h3>
            <p>You took too long to complete the payment.</p>
            <button className="btn-primary" onClick={onCancel}>Try Again</button>
          </div>
        ) : (
          <div className="payment-body">
            <div className={`timer-banner ${timeLeft <= 30 ? 'danger' : ''}`}>
              <Clock size={18} />
              <span>Time Remaining: <strong>{timeStr}</strong></span>
            </div>

            <div className="order-summary">
              <div className="summary-row"><span>Event:</span> <strong>{event.name}</strong></div>
              <div className="summary-row"><span>Tickets:</span> <strong>{bookingData.tickets}</strong></div>
              <div className="summary-row total"><span>Total to Pay:</span> <strong>₹{bookingData.tickets * event.ticketPrice}</strong></div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Card Number</label>
                <div className="input-wrapper">
                  <CreditCard className="input-icon" size={20} />
                  <input type="text" placeholder="0000 0000 0000 0000" maxLength="19" required disabled={isProcessing} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" maxLength="5" required disabled={isProcessing} />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input type="password" placeholder="123" maxLength="4" required disabled={isProcessing} />
                </div>
              </div>
              <button type="submit" className="btn-pay" disabled={isProcessing}>
                {isProcessing ? 'Processing Payment...' : `Pay ₹${bookingData.tickets * event.ticketPrice}`}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
