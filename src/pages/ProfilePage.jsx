import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { updateUser } from '../services/api';

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  image: yup.string().url().nullable(),
  password: yup.string().min(6).max(40).nullable(),
});

export default function ProfilePage() {
  const { user, token, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: user.username,
      email: user.email,
      image: user.image,
      password: '',
    },
  });

  const onSubmit = async (data) => {
    const res = await updateUser(data, token);
    if (res.errors) {
      Object.entries(res.errors).forEach(([field, messages]) => {
        setError(field, { message: messages.join(', ') });
      });
    } else {
      setUser(res.user);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Username" {...register('username')} />
      <p>{errors.username?.message}</p>

      <input placeholder="Email" {...register('email')} />
      <p>{errors.email?.message}</p>

      <input placeholder="Avatar URL" {...register('image')} />
      <p>{errors.image?.message}</p>

      <input type="password" placeholder="New Password" {...register('password')} />
      <p>{errors.password?.message}</p>

      <button type="submit">Update Profile</button>
    </form>
  );
}