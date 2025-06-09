import React from 'react';
import axios from 'axios';
import '../styles/BookingCard.css';

const BookingCard = ({ booking, onStatusChange }) => {
  const handleStatusUpdate = async (newStatus) => {
    try {
      const res = await axios.put(`http://localhost:8080/api/bookings/${booking.id}`, { status: newStatus });
      if (res.data.success) {
        alert(`Booking ${newStatus}`);
        onStatusChange(); // refresh parent list
      }
    } catch (error) {
      alert('Failed to update booking status.');
    }
  };

  return (
    <div className="booking-card">
      <h3 className="booking-card__title">Booking ID: {booking.id}</h3>
      <p><strong>User ID:</strong> {booking.userId}</p>
      <p><strong>Hotel ID:</strong> {booking.hotelId}</p>
      <p><strong>Room Type:</strong> {booking.roomType}</p>
      <p><strong>Check-in:</strong> {booking.checkIn}</p>
      <p><strong>Check-out:</strong> {booking.checkOut}</p>
      <p><strong>Status:</strong> {booking.status}</p>

      {booking.status === 'PENDING' && (
        <div className="booking-card__actions">
          <button className="btn btn-approve" onClick={() => handleStatusUpdate('APPROVED')}>
            Approve
          </button>
          <button className="btn btn-reject" onClick={() => handleStatusUpdate('REJECTED')}>
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingCard;
