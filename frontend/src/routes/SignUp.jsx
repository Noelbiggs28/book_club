import React, { useState } from 'react';
import './css/signUp.css';
import bookshelf from '../assets/book_shelf.jpg';
import { signup } from '../api/backend_calls';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [validUserName, setValidUserName] = useState(true)
  const navigate = useNavigate();

  const [responseMsg, setResponseMsg] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const context = {
      username: formData.username,
      password: formData.password,
    };

    const response = await signup(context);
    setResponseMsg(response);
    console.log(response)
    if(response['username'][0]== "A user with that username already exists."){
      setValidUserName(false)
    }
    else{
      navigate('/login')
    }
    
  };

  return (
    <div className="signup-container">
      <img src={bookshelf} alt="Background" className="background-image" />
      <form className="signup-form">

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {validUserName ? null:"that username is already taken"}
        <input
          onClick={handleRegister}
          type="submit"
          value="Register"
          className="submit"
        />
      </form>
    </div>
  );
}
