import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../contexts/AuthContext';
import { login as apiLogin } from '../services/api';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function SignInPage() {
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const res = await apiLogin(data);
    if (res.errors) {
      Object.entries(res.errors).forEach(([field, messages]) => {
        setError(field, { message: messages.join(', ') });
      });
    } else {
      setUser(res.user);
      setToken(res.user.token);
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Email" {...register('email')} />
      <p>{errors.email?.message}</p>

      <input type="password" placeholder="Password" {...register('password')} />
      <p>{errors.password?.message}</p>

      <button type="submit">Login</button>
    </form>
  );
}