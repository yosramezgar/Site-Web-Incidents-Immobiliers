import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        if (response.status === 200) {
          const role = localStorage.getItem('role');
          switch (role) {
            case 'admin':
              navigate('/admin');
              break;
            case 'habitant':
              navigate('/ReclamationHabitants');
              break;
            case 'technicien':
              navigate('/HomeTechnicien');
              break;
            default:
              navigate('/');
              break;
          }
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('habitantId');
        navigate('/'); 
      });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', user);
      const { role, accesstoken } = response.data;
      toast.success('Connexion réussie !');
      
      localStorage.setItem('token', accesstoken);
      localStorage.setItem('role', role);

      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'habitant') {
        const { habitantId } = response.data;
        localStorage.setItem('habitantId', habitantId);
        navigate('/ReclamationHabitants');
      } else if (role === 'technicien') {
        navigate('/HomeTechnicien');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };

  const handleEmailChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      email: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      password: e.target.value,
    }));
  };

  return (
    <div className="limiter">
      <ToastContainer />
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-logo">
              <i className="zmdi zmdi-landscape"></i>
            </span>
            <span className="login100-form-title p-b-34 p-t-27">
              Log in
            </span>
            <div className="wrap-input100 validate-input" data-validate="Enter username">
              <input
                className="input100"
                type="email"
                name="username"
                placeholder="email"
                value={user.email}
                onChange={handleEmailChange}
                required
              />
              <span className="focus-input100" data-placeholder="&#xf207;"></span>
            </div>
            <div className="wrap-input100 validate-input" data-validate="Enter password">
              <input
                className="input100"
                type="password"
                name="pass"
                placeholder="Password"
                value={user.password}
                onChange={handlePasswordChange}
                required
              />
              <span className="focus-input100" data-placeholder="&#xf191;"></span>
            </div>
            <div className="contact100-form-checkbox">
              <input
                className="input-checkbox100"
                id="ckb1"
                type="checkbox"
                name="remember-me"
              />
              <label className="label-checkbox100" htmlFor="ckb1">
                       Remember me
              </label>
            </div>
            <div className="container-login100-form-btn">
              <button className="login100-form-btn" type="submit">
                Login
              </button>
            </div>
            <div className="text-center p-t-90">
              <a className="txt1" href="#">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
