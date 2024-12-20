import axios from 'axios';
import React from 'react';


import { SignInPage } from '@toolpad/core/SignInPage';

const providers = [ 
                    { id: 'credentials', name: 'Email and password' }
                  ];

const signUp = async (provider, formData) => {
  
  if (provider.id === 'credentials') {
    const email = formData?.get('email');
    const password = formData?.get('password');


    // Send the credentials to the server for authentication
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/signup`, {
        email,
        password,
      });
      // On success, you can use the response to store the authentication token
      // e.g., store it in localStorage, Context, or Redux
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');

      return {
        type: 'CredentialsSignin',
        user: response.data.user, // Store user data or any other info returned from the backend
      };
    }catch (error) {
      // Handle error if credentials are invalid or any other errors
      alert(error.response?.data?.message || 'An error occurred during login.');
      return {
        type: 'CredentialsSignin',
        error: error.response?.data?.message || 'An error occurred.',
      };
    }
  }
}

const AuthSignUp = () => {
  return (
    <SignInPage
        signIn={signUp}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false } }}

    />
  )
}

export default AuthSignUp