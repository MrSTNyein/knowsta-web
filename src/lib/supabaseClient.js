// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const basePath = '/knowsta-web/'; // GitHub Pages path
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
 * Handle magic link redirect
 */
export const handleAuthRedirect = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error getting session:', error.message);
    return null;
  }

  if (!session) {
    // If no session, try to get it from URL after redirect
    const { data, error: signInError } = await supabase.auth.getSessionFromUrl?.();
    if (signInError) console.error('Error handling redirect:', signInError.message);
    return data?.session || null;
  }

  return session;
};
