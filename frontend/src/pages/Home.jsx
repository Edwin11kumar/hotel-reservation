import { useState, useEffect } from 'react';
import { getHotels } from '../services/api';
import HotelCard from '../components/HotelCard';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; // <-- CSS import

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [filters, setFilters] = useState({ roomType: '', location: '', price: '' });
  const navigate = useNavigate();

  useEffect(() => {
    getHotels(filters).then(res => setHotels(res.data));
  }, [filters]);

  const handleBook = (hotelId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      const confirmRedirect = window.confirm("⚠️ You must be logged in to book a hotel.\nWould you like to go to the login page?");
      if (confirmRedirect) {
        navigate('/login');
      }
      return;
    }

    navigate('/user', { state: { hotelId } });
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Hotel Reservation System</h1>
      <p className="home-description">
        Welcome! This platform allows users to browse hotels, filter them by location, price, or room type, 
        and make reservations. Admins can manage hotel listings and approve/reject bookings.
      </p>

      <div className="home-buttons">
        <button onClick={() => navigate('/login')} className="home-btn">
          Login
        </button>
        <button onClick={() => navigate('/register')} className="home-btn">
          Signup
        </button>
      </div>

      <h2 className="browse-title">Browse Hotels</h2>

      <div className="filters">
        <input
          placeholder="Room Type"
          onChange={e => setFilters({ ...filters, roomType: e.target.value })}
          className="filter-input"
        />
        <input
          placeholder="Location"
          onChange={e => setFilters({ ...filters, location: e.target.value })}
          className="filter-input"
        />
        <input
          placeholder="Max Price"
          type="number"
          onChange={e => setFilters({
            ...filters,
            price: e.target.value ? +e.target.value : ''
          })}
          className="filter-input"
        />
      </div>

      <div className="hotel-list">
        {hotels.length > 0 ? (
          hotels.map(h => <HotelCard key={h.id} hotel={h} onBook={handleBook} />)
        ) : (
          <p className="no-hotels">No hotels found matching filters.</p>
        )}
      </div>
      <p className='developed-by'>Developed by Edwin Kumar S</p>
    </div>
  );
}
