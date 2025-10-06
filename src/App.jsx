import React, { useState, useEffect } from 'react';
import { supabase, handleAuthRedirect } from './lib/supabaseClient';
import Auth from './components/Auth';
import Account from './components/Account';

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const initSession = async () => {
      const currentSession = supabase.auth.getSession()?.data.session;
      setSession(currentSession);

      // Listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    };

    initSession();
  }, []);

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    </div>
  );
};

export default App;
