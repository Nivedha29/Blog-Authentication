import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../contexts/AuthContext';
import { register as apiRegister } from '../services/api';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  username: yup.string().min(3).max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(40).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
  agree: yup.bool().oneOf([true], 'Must accept terms'),
});

export default function SignUpPage() {
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const { confirmPassword, agree, ...user } = data;
    const res = await apiRegister(user);
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
      <input placeholder="Username" {...register('username')} />
      <p>{errors.username?.message}</p>

      <input placeholder="Email" {...register('email')} />
      <p>{errors.email?.message}</p>

      <input type="password" placeholder="Password" {...register('password')} />
      <p>{errors.password?.message}</p>

      <input type="password" placeholder="Repeat Password" {...register('confirmPassword')} />
      <p>{errors.confirmPassword?.message}</p>

      <label>
        <input type="checkbox" {...register('agree')} /> I agree to data processing
      </label>
      <p>{errors.agree?.message}</p>

      <button type="submit">Register</button>
    </form>
  );
}