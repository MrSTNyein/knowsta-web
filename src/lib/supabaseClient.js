// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Function to send magic link
 * Automatically uses the current origin (localhost or GitHub Pages)
 */
export const sendMagicLink = async (email) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin + '/knowsta-web/' // ensure correct redirect
    }
  });

  if (error) {
    console.error('Error sending magic link:', error.message);
  } else {
    console.log('Magic link sent:', data);
  }

  return { data, error };
};
