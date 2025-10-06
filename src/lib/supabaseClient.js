import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const basePath = '/knowsta-web/';
const redirectUrl = window.location.origin + basePath;

export const sendMagicLink = async (email) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectUrl },
  });

  if (error) {
    console.error('Error sending magic link:', error.message);
    alert('Error: ' + error.message);
  } else {
    alert('Magic link sent! Check your email.');
    console.log(data);
  }
};
