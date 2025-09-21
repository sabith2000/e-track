import { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(formData);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-4">
        <input name="username" placeholder="Username" onChange={handleChange} className="border p-2 w-full" required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Login;