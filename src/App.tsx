
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import AdminDashboard from './pages/admin/AdminDashboard';
import TestManagement from './pages/TestManagement';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import UserDashboard from './pages/UserDashboard';
import Pricing from './pages/Pricing';
import Documentation from './pages/Documentation';
import Help from './pages/Help';
import Contact from './pages/Contact';
import Windows from './pages/Windows';
import Linux from './pages/Linux';
import Docs from './pages/Docs';
import LookingGlass from './pages/LookingGlass';
import Api from './pages/Api';
import Blog from './pages/Blog';
import Network from './pages/Network';
import Status from './pages/Status';
import Legal from './pages/Legal';
import Privacy from './pages/Privacy';
import Imprint from './pages/Imprint';

import StatsBanner from './components/StatsBanner';
import { Toaster } from './components/ui/toaster';
import { CartProvider } from './context/CartContext';
import { SettingsProvider } from './context/SettingsContext';
import BorderPage from './components/BorderPage';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <div className="animate-fade-in">
      <Routes location={location}>
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
        <Route path="/admin/users" element={<TestManagement />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/windows" element={<Windows />} />
        <Route path="/linux" element={<Linux />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/looking-glass" element={<LookingGlass />} />
        <Route path="/api" element={<Api />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/network" element={<Network />} />
        <Route path="/status" element={<Status />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/imprint" element={<Imprint />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <CartProvider>
        <Router>
          <BorderPage>
            <AnimatedRoutes />
            <Toaster />
          </BorderPage>
        </Router>
      </CartProvider>
    </SettingsProvider>
  );
}

export default App;
