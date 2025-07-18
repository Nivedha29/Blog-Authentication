import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/new-post">New Post</Link>
            <Link to="/profile">Settings</Link>
            <span>{user.username}</span>
            <button onClick={logout}>Log Out</button>
          </>
        ) : (
          <>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}