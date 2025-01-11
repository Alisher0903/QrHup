import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogIn } from '../../hooks/url';
import toast from 'react-hot-toast';

const SignIn: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const role = sessionStorage.getItem('role');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!phoneNumber) {
      setError('Invalid phone number');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(LogIn, {
        phone: phoneNumber.slice(1),
        password,
      });
      if (response?.data?.data) {
        toast.success('Welcome! You have successfully signed')
        sessionStorage.setItem('token', response?.data?.data?.token);
        sessionStorage.setItem('role', response?.data?.data?.role);
        navigate('/');
        if (role === "ROLE_ADMIN") {
          navigate('/');
        } else if (role === "ROLE_") {
          navigate('/clarify');
        }
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default p-8">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="phone" className="block font-medium mb-2">
            Telefon raqami
          </label>
          <input
            id="phone"
            type="text"
            value={phoneNumber || "+998"}
            onChange={(e) => {
              let newValue = e.target.value;
              if (/^\+?\d*$/.test(newValue)) {
                if (!newValue.startsWith("+998")) {
                  newValue = "+998";
                }
                if (newValue.length <= 13) {
                  setPhoneNumber(newValue);
                }
              }
            }}
            placeholder="Telefon no'mer"
            className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-4 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block font-medium mb-2">
            Parol
          </label>
          <input
            id="password"
            type="password"
            placeholder="Parolingizni kiriting"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-4 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
          />
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white rounded-lg py-3 font-medium transition hover:bg-opacity-90"
        >
          {loading ? 'Kirish...' : 'Kirish'}
        </button>
        <p className="mt-4 text-center">
          Akkauntingiz yo'qmi?{' '}
          <Link to="/auth/signup" className="text-primary">
            Ro'yxatdan o'tish
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
