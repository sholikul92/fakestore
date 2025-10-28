import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuthStore from '../../store/authStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const elementName = e.target.name;
    const value = e.target.value;

    setPayload((prev) => ({ ...prev, [elementName]: value }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const result = login(payload);
    console.log({ payload });
    console.log({ result });

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  const handleNavigate = () => {
    navigate('/register');
  };

  return (
    <section className='min-h-screen flex justify-center items-center'>
      <div className='md:w-1/4 space-y-4'>
        <h1 className='text-center text-xl font-semibold'>Login Form</h1>
        {error && <p className='text-red-500 text-center'>{error}</p>}
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input
            type='mail'
            name='email'
            id='email'
            placeholder='Email'
            className='bg-gray-200 p-2 text-lg outline-none rounded-xl'
            onChange={handleInput}
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            className='bg-gray-200 p-2 text-lg outline-none rounded-xl'
            onChange={handleInput}
          />
          <button
            type='submit'
            className='bg-black text-white p-2 rounded-xl cursor-pointer'
          >
            Login
          </button>
          <div>
            <p className='text-center'>
              Belum punya akun?{' '}
              <span
                onClick={handleNavigate}
                className='font-semibold cursor-pointer'
              >
                Daftar
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
