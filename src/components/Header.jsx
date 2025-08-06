import { Link, useNavigate, useLocation  } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import CartModal from './CartModal';

function Header() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [showCartModal, setShowCartModal] = useState(false);

  const path = location.pathname;
  const activePage =
    path === '/' || path.includes('/home')
      ? 'home'
      : path.includes('/products')
        ? 'products'
        : path.includes('/favorite')
          ? 'favorite'
          : '';

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      toast.info('Bạn đã đăng xuất thành công!');
      navigate('/');
    }
  };

  const directtoLogin = () => {
    navigate('/login');
  };

  const toggleCart = () => {
    setShowCartModal(prev => !prev);
  };

  useEffect(() => {
  const updateCartCount = () => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      const storedCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
      setCartCount(storedCart.length);
    }
  };

  updateCartCount();

  window.addEventListener('cartUpdated', updateCartCount);

  return () => {
    window.removeEventListener('cartUpdated', updateCartCount);
  };
}, []);

  return (
    <header>
      <div className="logo">
        <Link to="/home">
          <img src={logo} className="logo-img" alt="Logo" />
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/home" className={`nav-item ${activePage === 'home' ? 'active' : ''}`}>
              Trang chủ
            </Link>
          </li>
          <li>
            <Link to="/products" className={`nav-item ${activePage === 'products' ? 'active' : ''}`}>
              Sản phẩm
            </Link>
          </li>
          <li>
            <Link to="/favorite" className={`nav-item ${activePage === 'favorite' ? 'active' : ''}`}>
              Danh sách yêu thích
            </Link>
          </li>
        </ul>
      </nav>

      {isLoggedIn ? (
        <nav>
          <ul style={{ fontSize: '18px' }}>
            <li>
              <i onClick={toggleCart} className="fa-solid fa-cart-shopping" style={{ fontSize: '23px', cursor: 'pointer' }}></i>
              <span
                style={{
                  position: 'absolute',
                  top: '40px',
                  right: '130px',
                  background: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '12px',
                }}
              >
                {cartCount}
              </span>
            </li>
            <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
              Sign Out
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul style={{ fontSize: '18px' }}>
            <li id='signin' onClick={directtoLogin} style={{ cursor: 'pointer' }}>
              Sign In
            </li>
            <li style={{ cursor: 'pointer' }}>Sign Up</li>
          </ul>
        </nav>
      )}
      {showCartModal && <CartModal onClose={() => setShowCartModal(false)} />}
    </header>
  );
}

export default Header;
