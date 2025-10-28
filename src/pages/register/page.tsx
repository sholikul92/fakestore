import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { User } from '../../store/authStore';
import useAuthStore from '../../store/authStore';

export default function RegisterPage() {
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleNavigate = () => {
    navigate('/login');
  };

  const handleInputForm: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const nameElement = e.target.name;
    const value = e.target.value;

    setUser((prev) => ({ ...prev, [nameElement]: value }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const result = register(user);
    if (!result.success) {
      setError(result.message);
    } else {
      handleNavigate();
    }
  };

  return (
    <section className='min-h-screen flex justify-center items-center'>
      <div className='md:w-1/4 space-y-4'>
        <h1 className='text-center text-xl font-semibold'>Register Form</h1>
        {error && <p className='text-red-500 text-center'>{error}</p>}
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Nama'
            className='bg-gray-200 p-2 text-lg outline-none rounded-xl'
            onChange={handleInputForm}
          />
          <input
            type='mail'
            name='email'
            id='email'
            placeholder='Email'
            className='bg-gray-200 p-2 text-lg outline-none rounded-xl'
            onChange={handleInputForm}
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            className='bg-gray-200 p-2 text-lg outline-none rounded-xl'
            onChange={handleInputForm}
          />
          <button
            type='submit'
            className='bg-black text-white p-2 rounded-xl cursor-pointer'
          >
            Register
          </button>
          <div>
            <p className='text-center'>
              Sudah punya akun?{' '}
              <span
                onClick={handleNavigate}
                className='font-semibold cursor-pointer'
              >
                Masuk
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
