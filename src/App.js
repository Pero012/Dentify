import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contactus from './pages/Contact/Contactus';
import LoginForm from './components/Login/LoginForm';
import SignupForm from './components/Login/SignupForm';
import Navbar from './components/Navbar/Navbar';
import Footer from './sections/Footer/Footer';
import { AuthProvider } from './context/AuthContext';
import AdminPanel from './components/AdminPanel/AdminPanel';
import Appointments from './pages/Appointments/Appointments';

// Layout component
const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contactus /></Layout>} />
        <Route path="/login" element={<Layout><LoginForm /></Layout>} />
        <Route path="/signup" element={<Layout><SignupForm /></Layout>} />
        <Route path="/admin" element={<Layout><AdminPanel /></Layout>} />
        <Route path="/appointments" element={<Layout><Appointments /></Layout>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
