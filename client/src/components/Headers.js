/* global google */

import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useAuth } from '../contexs/AuthContext';
import {
  saveUserGoogleTokenToLocalStorage,
  saveUserTokenToLocalStorage,
} from '../token/localStorage';
import { loginSuccess } from '../services/authUser-services';
import { getFiles } from '../services/file-services';

const clientId =
  '108740667567-c6iskhvdps9rfingjlmjhb5tpl4akkrv.apps.googleusercontent.com';

export default function Headers() {
  const { newUserList, login, logout, user } = useAuth();

  // const handleLogin = () => {
  //   login((response) => {
  //     console.log('responsesssssssssss', response);
  //     const user = response.user;
  //     const { displayName, email, uid, photoUrl } = user;

  //     const payload = {
  //       email,
  //       displayName,
  //       uid,
  //       photoUrl,
  //     };

  //     loginSuccess(payload).then((response) => {
  //       console.log('responseresponse', response);
  //       getFiles().then((response) => {
  //         newUserList(response.files);
  //       });
  //       saveUserTokenToLocalStorage(response.accessToken);
  //     });
  //   });
  // };

  // const handleLogout = () => {
  //   logout();
  // };

  // console.log({ user });

  function handleCredentialResponse(response) {
    // console.log('Encoded JWT ID token: ' + response.credential);
    saveUserGoogleTokenToLocalStorage(response.credential);
    var decodedUser = jwt_decode(response.credential);
    // console.log(decodedUser);

    const { email, name, sub, picture } = decodedUser;
    const payload = {
      email,
      displayName: name,
      uid: sub,
      photoUrl: picture,
    };
    login(payload);

    loginSuccess(payload).then((response) => {
      // console.log('responseresponse', response);
      getFiles().then((response) => {
        newUserList(response.files);
      });
      saveUserTokenToLocalStorage(response.accessToken);
    });

    // setUser(decodedUser);
    //document.getElementById('buttonDiv').hidden = true;
  }

  useEffect(() => {
    if (typeof google !== 'undefined') {
      console.log('TRUE');
      google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(document.getElementById('buttonDiv'), {
        theme: 'outline',
        size: 'large',
      });
      //  google.accounts.id.prompt();
    } else {
      console.log('FALSE');
    }
  }, [user]);

  const onSignOut = () => {
    logout();
    // gapi.auth2
    //   .getAuthInstance()
    //   .signOut()
    //   .then(() => {
    //     console.log('User signed out.');
    //     // Add any additional code to handle the sign-out here
    //   })
    //   .catch((error) => {
    //     console.error('An error occurred while signing out:', error);
    //     // Add any error-handling code here
    //   });
  };

  return (
    <div className="bg-warning p-4">
      <h1 className="d-inline">
        <b>Upload Files using Google</b>
      </h1>

      {!user && <div id="buttonDiv"></div>}
      {user && (
        <button className="btn btn-primary btn-lg ms-5" onClick={onSignOut}>
          Sign Out
        </button>
      )}

      {/* {user && (
        <button onClick={handleLogout} className="btn btn-primary btn-lg ms-5">
          Sign Out
        </button>
      )} */}
      {/* {!user && (
        <button
          onClick={handleLogin}
          className="d-block btn btn-primary btn-lg m-3 mt-5">
          Sign in with Google
        </button>
      )} */}
    </div>
  );
}
