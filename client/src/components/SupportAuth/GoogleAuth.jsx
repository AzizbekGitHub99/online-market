import { useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { googleAuth } from '../../api/authRequest';

const GoogleAuth = () => {
    const [click, setClick] = useState(false)
    const [error, setError] = useState(false)
    const login = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
          try {
            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: {
                Authorization: `Bearer ${credentialResponse.access_token}`,
              },
            });
            const profileData = await res.json();
            if(profileData.email_verified){
                const data = {
                    firstname: profileData.given_name,
                    lastname: profileData.family_name,
                    email: profileData.email
                }
                const respond = await googleAuth(data)
                localStorage.setItem('user_id', respond.data.user._id)
                localStorage.setItem('verification_tokenauthuser', respond.data.token)
                window.location.replace('/')
            }
          } catch (error) {
            setError(true)
            console.log( error);
        }
    },
    onError: () => {
            console.log( error);
            setError(true)
        },
      });
  return (
    <button style={error ? {border: '1px solid red'} : {}} disabled={click} className="support_item" type="button" onClick={() => {login(); setError(false)}}><FcGoogle /></button>
  )
}

export default GoogleAuth