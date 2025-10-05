import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  // Handles sign-in with email and a magic link
  const handleEmailLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert('Check your email for the magic link!');
    }
    setLoading(false);
  };

  // Handles password reset for an email
  const handleForgotPassword = async () => {
    if (!email) {
        alert("Please enter your email address first.");
        return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'YOUR_REDIRECT_URL_HERE' // You must set this in Supabase
    });
    if (error) {
        alert(error.message);
    } else {
        alert("Check your email for the password reset link!");
    }
  };

  // Handles sign-in with a third-party provider (e.g., Google)
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
      alert(error.error_description || error.message);
    }
  };

  return (
    <div className="form-widget">
      <h1 className="header">Welcome Back!</h1>
      <p className="description">Sign in or create an account</p>
      <form onSubmit={handleEmailLogin}>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button className="button primary" disabled={loading}>
            {loading ? <span>Loading</span> : <span>Send magic link</span>}
          </button>
        </div>
      </form>
      <hr />
      <div>
        <button className="button secondary" onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
      </div>
      <p style={{ marginTop: '20px' }}>
          <a href="#" onClick={handleForgotPassword} style={{ color: '#007bff', textDecoration: 'none' }}>
            Forgot your password?
          </a>
      </p>
    </div>
  );
};

export default Auth;