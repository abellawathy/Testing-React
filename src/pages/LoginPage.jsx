import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { asyncLogin } from '../states/auth/thunk';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const emailRegister = register('email');
  const passwordRegister = register('password');

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(asyncLogin(data));

      if (resultAction?.user) {
        Swal.fire({
          icon: 'success',
          title: 'Login Success',
          timer: 1200,
          showConfirmButton: false,
        });

        navigate('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Email atau password salah',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: error.message,
      });
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded shadow">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-primary text-xl font-bold mb-4 text-center">
          Login
        </h2>

        <input
          data-testid="email-input"
          className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
          name={emailRegister.name}
          onChange={emailRegister.onChange}
          onBlur={emailRegister.onBlur}
          ref={emailRegister.ref}
        />

        <input
          data-testid="password-input"
          className="border p-2 w-full mb-4 rounded"
          type="password"
          placeholder="Password"
          name={passwordRegister.name}
          onChange={passwordRegister.onChange}
          onBlur={passwordRegister.onBlur}
          ref={passwordRegister.ref}
        />

        <button
          data-testid="login-button"
          className="bg-[#6367FF] text-white w-full py-2 rounded hover:bg-[#4e52d6]"
          type="submit"
        >
          Login
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Belum punya akun?{' '}
        <Link
          to="/register"
          className="text-[#6367FF] hover:underline font-medium"
        >
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
