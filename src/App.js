import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MovieProvider,useMovie } from './context/MovieContext';
import MovieDetails from './pages/MovieDetails';
import Navbar from './components/NavBar';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Router>
      <AuthProvider>
        <MovieProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route 
            path="/home-page" 
            element={
              <ProtectedRoute>
                <MainLayout>
                <HomePage />
                </MainLayout>
              </ProtectedRoute>
            } 
          />
           <Route 
            path="/movie-details/:id" 
            element={
              <ProtectedRoute>
                <MainLayout>
                <MovieDetails />
                </MainLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/favorites" 
            element={
              <ProtectedRoute>
                <MainLayout>
                <Favorites/>
                </MainLayout>
              </ProtectedRoute>
            } 
          />
        </Routes>
        </MovieProvider>
      </AuthProvider>
    </Router>
  );
}

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ padding : '2px'}}>{children}</main>
    </>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default App;