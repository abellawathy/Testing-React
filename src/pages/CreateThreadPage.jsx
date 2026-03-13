import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { asyncCreateThread } from '../states/threads/thunk';

function CreateThreadPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim() || !category.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Semua field harus diisi',
      });
      return;
    }

    await dispatch(asyncCreateThread({ title, body, category }));

    Swal.fire({
      icon: 'success',
      title: 'Thread berhasil dibuat!',
    });

    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto mt-8 px-4">
      <h2 className="text-2xl text-primary font-bold mb-6">
        Create New Thread
      </h2>

      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border border-secondary">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            className="border p-2 rounded-lg"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border p-2 rounded-lg"
            placeholder="Body"
            rows="5"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <input
            className="border p-2 rounded-lg"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <button
            data-testid="create-thread-btn"
            type="submit"
            className="bg-primary hover:bg-accent text-white py-2 rounded-lg transition"
          >
            Create Thread
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateThreadPage;
