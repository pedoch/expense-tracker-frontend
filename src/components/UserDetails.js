import React, { useState } from 'react';
import { Spinner } from 'evergreen-ui';
import { Redirect } from 'react-router-dom';

export default function UserDetails() {
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  if (redirect) return <Redirect to='/login' />;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h4>
        Hello&nbsp;
        {
          JSON.parse(
            localStorage.getItem('user') || sessionStorage.getItem('user')
          ).name
        }
      </h4>
      <button
        onClick={() => {
          setLoading(true);
          if (localStorage.token) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
          if (sessionStorage.token) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
          }
          setRedirect(true);
        }}
        className='btn'
        style={{ maxWidth: '75px', height: '30px', padding: '0px' }}
      >
        {loading ? <Spinner size={16} /> : 'Log out'}
      </button>
    </div>
  );
}
