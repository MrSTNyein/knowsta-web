// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// GitHub Pages path
const basePath = '/knowsta-web/';
const redirectUrl = window.location.origin + basePath;

/**
 * Send magic link
 */
export const sendMagicLink = async (email) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectUrl },
  });

  if (error) {
    console.error('Error sending magic link:', error.message);
    alert('Error sending magic link: ' + error.message);
  } else {
    alert('Magic link sent! Check your email.');
    console.log(data);
  }

  return { data, error };
};

/**
 * Get current session
 * Works after redirect automatically
 */
export const getCurrentSession = () => {
  const { data } = supabase.auth.getSession();
  return data.session;
};

/**
 * Subscribe to auth changes (login/logout)
 * Call this in App.jsx to update session state
 */
export const subscribeAuthChanges = (callback) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
  return subscription;
};
