import React from 'react';

const AppleAuth = () => {
  const handleAppleSignIn = () => {
    window.AppleID.auth.init({
      clientId: 'YOUR_CLIENT_ID', // Apple client ID
      scope: 'name email',
      redirectURI: 'https://yourdomain.com/auth/apple/callback', // Redirect URI after successful login
      state: 'some_random_state', // Optional, to manage CSRF
      usePopup: true, // Open in a popup or redirect
    });

    window.AppleID.auth.signIn().then((response) => {
      const { code, id_token } = response.authorization;
      console.log('Apple authorization code:', code);

      // Send the code to the backend for verification and registration/login
      fetch('/api/auth/apple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Server response:', data);
          // Handle successful login/registration logic here
        })
        .catch((error) => console.error('Error:', error));
    });
  };

  return (
    <div>
      <button onClick={handleAppleSignIn}>Sign in with Apple</button>
    </div>
  );
};

export default AppleAuth;
