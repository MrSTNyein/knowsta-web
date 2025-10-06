import React, { useState, useEffect } from 'react';
import { supabase, sendMagicLink } from './lib/supabaseClient';
import Auth from './components/Auth';
import Account from './components/Account';

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get current session on page load
    const session = supabase.auth.getSession()?.data.session;
    setSession(session);

    // Listen for login/logout events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth sendMagicLink={sendMagicLink} /> : <Account key={session.user.id} session={session} />}
    </div>
  );
};

export default App;
