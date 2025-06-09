import { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css"

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      localStorage.setItem('user', JSON.stringify(res.data));
      window.alert("Login successful!");

      if (res.data.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (err) {
      window.alert("Login failed! Please check your credentials.");
    }
  };

return (
    <form onSubmit={handle} className="login-form">
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="login-form__input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="login-form__input"
      />
      <button type="submit" className="btn btn-login-submit">Log In</button>
    </form>
  );
}
