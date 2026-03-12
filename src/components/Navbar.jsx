import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiMenu, FiX } from 'react-icons/fi';
import { asyncUnsetAuthUser } from '../states/auth/thunk';

function Navbar() {
  const authUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <nav className="bg-primary text-white fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-6 py-4">
        <h1 className="font-bold text-xl tracking-wide">Dicoding Forum</h1>

        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <div
          className={`flex-col md:flex md:flex-row md:items-center absolute md:static top-full left-0 w-full md:w-auto bg-primary md:bg-transparent transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-96 py-4' : 'max-h-0'
          } md:max-h-full`}
        >
          <Link
            onClick={() => setIsOpen(false)}
            className="block md:inline-block px-6 py-2 md:py-0 hover:bg-white hover:bg-opacity-20 rounded transition"
            to="/"
          >
            Home
          </Link>

          <Link
            onClick={() => setIsOpen(false)}
            className="block md:inline-block px-6 py-2 md:py-0 hover:bg-white hover:bg-opacity-20 rounded transition"
            to="/create"
          >
            Create Thread
          </Link>

          <Link
            onClick={() => setIsOpen(false)}
            className="block md:inline-block px-6 py-2 md:py-0 hover:bg-white hover:bg-opacity-20 rounded transition"
            to="/leaderboard"
          >
            Leaderboard
          </Link>

          {authUser ? (
            <>
              <span className="block md:inline-block px-6 py-2 md:py-0 text-soft">
                Hi, {authUser.name}
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="block md:inline-block px-6 py-2 md:py-0 hover:bg-white hover:bg-opacity-20 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              onClick={() => setIsOpen(false)}
              className="block md:inline-block px-6 py-2 md:py-0 hover:bg-white hover:bg-opacity-20 rounded transition"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
