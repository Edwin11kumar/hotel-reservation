import React from 'react';
import '../styles/HotelCard.css';

export default function HotelCard({ hotel, onAction, isAdmin = false, onBook }) {
  return (
    <div className="hotel-card">
      {hotel.imageUrl && (
        <img
          className="hotel-card__image"
          src={hotel.imageUrl}
          alt={hotel.name}
          width="200"
          onError={e => (e.target.style.display = 'none')}
        />
      )}
      <div className="hotel-card__details">
        <b className="hotel-card__name">{hotel.name}</b>
        <p className="hotel-card__location">{hotel.location}</p>
        <p className="hotel-card__room-price">
          {hotel.roomType} - ₹{hotel.price}
        </p>
        <button
          className="hotel-card__btn"
          onClick={() => (isAdmin ? onAction(hotel) : onBook ? onBook(hotel) : null)}
        >
          {isAdmin ? 'Edit' : 'Book'}
        </button>
      </div>
    </div>
  );
}
