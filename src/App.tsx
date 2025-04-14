
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Index from './pages/Index';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Configure from './pages/Configure';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import UserDashboard from './pages/UserDashboard';
import TestManagement from './pages/TestManagement';

import { Toaster } from './components/ui/toaster';
import { CartProvider } from './context/CartContext';
import { SettingsProvider } from './context/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/configure" element={<Configure />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/test-management" element={<TestManagement />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </CartProvider>
    </SettingsProvider>
  );
}

export default App;
