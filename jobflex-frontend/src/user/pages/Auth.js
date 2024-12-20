import React, { useContext } from 'react';
import axios from 'axios';
import './Auth.css';
import { useTheme } from '@mui/material/styles';
import { SignInPage } from '@toolpad/core/SignInPage';
import { AuthContext } from '../../shared/context/auth-context';

const providers = [
  { id: 'google', name: 'Google' },
  { id: 'credentials', name: 'Email and password' },
];

const Auth = () => {

  const auth = useContext(AuthContext); // Correct placement of useContext

  const handleSignIn = async (provider, formData) => {
    if (provider.id === 'credentials') {
      const email = formData?.get('email');
      const password = formData?.get('password');

      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, {
          email,
          password,
        });

        localStorage.setItem('token', response.data.token);
        alert('Login successful!');
        auth.login(response.data.userId, response.data.token);

        return {
          type: 'CredentialsSignin',
          user: response.data.user,
        };
      } catch (error) {
        alert(error.response?.data?.message || 'An error occurred during login.');
        return {
          type: 'CredentialsSignin',
          error: error.response?.data?.message || 'An error occurred.',
        };
      }
    }
  };

  return (
    <SignInPage
      signIn={handleSignIn} // Use the handler function
      providers={providers}
      slotProps={{ emailField: { autoFocus: false } }}
      slots={{
        forgotPasswordLink: () => <a href="/forgot-password">Forgot Password?</a>,
        signUpLink: () => <a href="/signup">Create Account</a>,
      }}
    />
  );
};

export default Auth;
