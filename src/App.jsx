import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import './App.css';
import ArticleDetailPage from './pages/ArticleDetailPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/article/:slug" element={<ArticleDetailPage />} />;
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;