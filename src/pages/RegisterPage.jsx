import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { asyncRegister } from '../states/auth/thunk';

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(asyncRegister({ name, email, password }));

      await Swal.fire({
        icon: 'success',
        title: 'Register Success',
        text: 'Silakan login',
      });

      navigate('/login');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Register Failed',
        text: error.message,
      });
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded shadow">
      <form onSubmit={onSubmit}>
        <h2 className="text-primary text-xl font-bold mb-4 text-center">
          Register
        </h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-4 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-[#6367FF] text-white w-full py-2 rounded hover:bg-[#4e52d6]"
          type="submit"
        >
          Register
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        Sudah punya akun?{' '}
        <Link
          to="/login"
          className="text-[#6367FF] hover:underline font-medium"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
