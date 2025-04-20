import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage';
import CreateCommunityPage from './pages/CreateCommunityPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import { CommunityProvider } from './context/CommunityContext';
import { UserProvider } from './context/UserContext';

function App() {
  const isAuthenticated = !!localStorage.getItem('access_token');

  return (
    <UserProvider>
      <CommunityProvider>
        <Router>
          <Routes>
            {/* Redirect root path based on login */}
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
              }
            />

            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-post"
              element={
                <ProtectedRoute>
                  <CreatePostPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-community"
              element={
                <ProtectedRoute>
                  <CreateCommunityPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/community/:name"
              element={
                <ProtectedRoute>
                  <CommunityPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CommunityProvider>
    </UserProvider>
  );
}

export default App;
