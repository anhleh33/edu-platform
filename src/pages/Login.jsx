import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

   const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/users');
    if (!response.ok) {
      toast.error('Không thể truy cập dữ liệu người dùng!');
      return;
    }

    const users = await response.json();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', user.email);
      toast.success('Đăng nhập thành công!');
      navigate('/');
    } else {
      toast.error('Email hoặc mật khẩu không đúng!');
    }
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    toast.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
  }
};


  return (
    <div className="login-box">
      <div className="login-container">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            style={{ marginBottom: '30px' }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            style={{ marginBottom: '5px' }}
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <span>Quên mật khẩu</span>
          <button type="submit" className='submit-btn'>Đăng nhập</button>
          <p>Hoặc</p>
          <div className="social">
            <button name='Facebook' className='social-btn'><i class="fa-brands fa-facebook"></i></button>
            <button name='Google' className='social-btn'><i class="fa-brands fa-google"></i></button>
            <button name='Apple' className='social-btn'><i class="fa-brands fa-apple"></i></button>
          </div>
          <p style={{ marginTop: '20px', marginBottom: '0px' }}>Bạn mới đến Antoree? <a href=""><u>Đăng ký</u></a></p>
        </form>
      </div>
      <div className="introduction">
        <div className="introduction-content">
          <img src={logo} alt="" className="intro-logo" />
          <h3>Welcome to Antoree</h3>
          <p>Nền tảng học tập trực tuyến giúp bạn chinh phục ngôn ngữ với các khoá học và tài liệu chất lượng cao.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
