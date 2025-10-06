// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Function to send magic link
 * Automatically detects the correct redirect URL
 * Works for both localhost and GitHub Pages
 */
export const sendMagicLink = async (email) => {
  // Adjust this path if your GitHub Pages repo has a different folder
  const basePath = '/knowsta-web/'; 
  const redirectUrl = window.location.origin + basePath;

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectUrl },
  });

  if (error) {
    console.error('Error sending magic link:', error.message);
    alert('Error sending magic link: ' + error.message);
  } else {
    console.log('Magic link sent:', data);
    alert('Magic link sent! Check your email.');
  }

  return { data, error };
};

/**
 * Function to handle user after magic link redirect
 * Call this on page load to complete login
 */
export const handleAuthRedirect = async () => {
  const { data, error } = await supabase.auth.getSessionFromUrl();
  if (error) {
    console.error('Error handling redirect:', error.message);
    return;
  }

  if (data.session) {
    console.log('User logged in:', data.session.user);
    // Redirect to main page or dashboard
    const basePath = '/knowsta-web/';
    window.location.href = window.location.origin + basePath;
  }
};
