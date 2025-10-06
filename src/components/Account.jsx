import React from 'react';
import { supabase } from '../lib/supabaseClient';   

const Account = ({ session }) => {
  const user = session.user;

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.error_description || error.message);
    }
  };

  return (
    <div className="form-widget">
      <h1>Welcome!</h1>
      <p>You are logged in with email: {user.email}</p>
      <div>
        <button className="button primary" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Account;
