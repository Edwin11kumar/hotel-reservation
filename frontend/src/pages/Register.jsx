import { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      window.alert("Registration successful! Please log in.");
      navigate('/login');
    } catch (err) {
      window.alert("Registration failed. Please try again.");
    }
  };

 return (
    <form onSubmit={handle} className="register-form">
      <h2>Register</h2>
      {['name', 'email', 'phone', 'address', 'password'].map(field => (
        <input
          key={field}
          placeholder={field}
          type={field === 'password' ? 'password' : 'text'}
          value={form[field]}
          onChange={e => setForm({ ...form, [field]: e.target.value })}
          className="register-form__input"
        />
      ))}
      <button type="submit" className="btn btn-register-submit">Sign Up</button>
    </form>
  );
}
