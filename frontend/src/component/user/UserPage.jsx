import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserPage.css';
import TaskApi from '../../services/TaskApi';
import ErrorModal from './../ErrorModal'; 

const UserPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await TaskApi.register({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password
      });
      console.log('Register form submitted:', response.data);
      localStorage.setItem('accessToken', response.data.access_token);
      localStorage.setItem('username', response.data.firstname);

      window.location.href = "/project/list";
    } catch (error) {
      console.error('Register error:', error);
      setError(error.response.data.message);
      setShowErrorModal(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await TaskApi.authenticate({
        email: formData.email,
        password: formData.password
      });
      console.log('Login form submitted:', response.data);

      localStorage.setItem('accessToken', response.data.access_token);
      localStorage.setItem('username', response.data.firstname);
      window.location.href = "/project/list";

    } catch (error) {
      console.error('Login error:', error);
      setError(error.response.data.message);
      setShowErrorModal(true);
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    const card = document.querySelector('.card');
    card.classList.toggle('flip');
  };

  const handleCloseErrorModal = () => setShowErrorModal(false); // Ekledik

  return (
    <div className="UserPage d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ width: '300px' }}>
        <div className="card-body">
          <h1 className="text-center mb-4">{isRegister ? 'Register' : 'Login'}</h1>
          <form onSubmit={isRegister ? handleRegister : handleLogin}>
            {isRegister && (
              <>
                <div className="form-group">
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </>
            )}
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              {isRegister ? 'Register' : 'Login'}
            </button>
          </form>
          <button onClick={toggleForm} className="btn btn-link btn-block mt-2">
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
      <ErrorModal
        show={showErrorModal}
        handleClose={handleCloseErrorModal}
        errorMessage={error}
      />
    </div>
  );
};

export default UserPage;
