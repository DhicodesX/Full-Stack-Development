import React, { useRef } from 'react';
import { Download, CheckCircle, Home } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const BookingSummary = ({ bookingData, event, onHome }) => {
  const ticketRef = useRef(null);

  const downloadPDF = async () => {
    const element = ticketRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
    pdf.save(`${bookingData.name.replace(/\s+/g, '_')}_Ticket.pdf`);
  };

  return (
    <div className="success-container">
      <div className="success-header">
        <CheckCircle size={64} color="#10b981" />
        <h2>Booking Successful!</h2>
        <p>Your payment has been processed and your tickets are ready.</p>
      </div>

      <div className="ticket-wrapper" ref={ticketRef}>
        <div className="digital-ticket">
          <div className="ticket-header">
            <h3>{event.name}</h3>
            <span>{event.department}</span>
          </div>
          <div className="ticket-body">
            <div className="ticket-info">
              <label>Attendee Name</label>
              <strong>{bookingData.name}</strong>
            </div>
            <div className="ticket-info">
              <label>Date & Time</label>
              <strong>{event.dateTime}</strong>
            </div>
            <div className="ticket-info">
              <label>Venue</label>
              <strong>{event.venue}</strong>
            </div>
            <div className="ticket-info row">
              <div>
                <label>Seats ({bookingData.tickets})</label>
                <strong>{bookingData.seats ? bookingData.seats.join(', ') : 'General Adm'}</strong>
              </div>
              <div>
                <label>Amount Paid</label>
                <strong>₹{bookingData.tickets * event.ticketPrice}</strong>
              </div>
            </div>
          </div>
          <div className="ticket-footer">
            <div className="barcode">|| |||| | ||| | || ||||| | ||</div>
            <span>Internal Department Event Portal</span>
          </div>
        </div>
      </div>

      <div className="success-actions">
        <button className="btn-secondary" onClick={onHome}><Home size={18} /> Back to Events</button>
        <button className="btn-primary" onClick={downloadPDF}><Download size={18} /> Download PDF Ticket</button>
      </div>
    </div>
  );
};

export default BookingSummary;
