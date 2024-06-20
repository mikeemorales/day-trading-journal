"use client"
import React, { useState } from 'react';
import { registerWithEmailAndPassword, loginWithEmailAndPassword, logout } from '../../utils/firebaseAuth';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(true);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await registerWithEmailAndPassword(email, password);
        alert('User registered successfully');
      } else {
        await loginWithEmailAndPassword(email, password);
        alert('User logged in successfully');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert('Error: ' + error.message);
      } else {
        alert('An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <h1>{isRegister ? 'Register' : 'Login'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        Switch to {isRegister ? 'Login' : 'Register'}
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AuthForm;
