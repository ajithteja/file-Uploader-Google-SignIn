import React, { useEffect, useState } from 'react';
//import '../firebase';
import { useContext } from 'react';
import jwt_decode from 'jwt-decode';

import {
  getUserGoogleTokenToLocalStorage,
  removeGoogleTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from '../token/localStorage';

const AuthContext = React.createContext({});
const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthContextProvider({ children }) {
  const [newUserfiles, setNewUserfiles] = useState([]);

  const [user, setUser] = useState();

  const login = (newUser) => {
    console.log('Login From Auth Context');
    setUser(newUser);
  };

  // const logind = (callback = () => {}) => {
  //   console.log('Login From Auth Context');
  //   signInWithPopup(auth, authProvider)
  //     .then((response) => {
  //       if (response) {
  //         callback(response);
  //         setUser(response.user);
  //         // const user = response.user
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.code === 'auth/popup-closed-by-user') {
  //         // Handle the error appropriately
  //         console.log('Popup closed by user');
  //       } else {
  //         // Handle other errors
  //         console.log(error);
  //       }
  //     });
  // };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     console.log('onAuthStateChanged');
  //     setUser(user);
  //     //console.log(user);
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // });

  useEffect(() => {
    const userJwtToken = getUserGoogleTokenToLocalStorage();
    if (userJwtToken !== undefined) {
      var decodedUser = jwt_decode(userJwtToken);
      //  console.log(decodedUser);
      setUser(decodedUser);
    }
  }, []);

  const logout = () => {
    removeTokenFromLocalStorage();
    removeGoogleTokenFromLocalStorage();
    setNewUserfiles([]);
    // signOut(auth);
    setUser();

    // removeTokenFromLocalStorage();
  };

  const newUserList = (newUserfiles) => {
    // console.log('newUserfiles', newUserfiles);
    setNewUserfiles(newUserfiles);
  };
  return (
    <AuthContext.Provider
      value={{ newUserList, newUserfiles, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth };

// import React, { useEffect, useState, useContext } from 'react';

// const AuthContext = React.createContext({});
// const useAuth = () => {
//   return useContext(AuthContext);
// };

// export default function AuthContextProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [newUserfiles, setNewUserfiles] = useState([]);

//   const login = () => {
//     const clientId =
//       '108740667567-iuv6r60kra9qf0e2ug9e36gnm5l1f2tu.apps.googleusercontent.com';
//     // '584410275559-lqu78369gm3nkpm941vk4g41kpjv3jrp.apps.googleusercontent.com';
//     const redirectUri = 'http://localhost:3000/authenticate';
//     const responseType = 'id_token';
//     const scope = 'openid profile email';

//     const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

//     window.location.assign(authUrl);
//   };

//   const logout = () => {
//     setUser(null);
//     setNewUserfiles([]);
//     localStorage.removeItem('userToken');
//   };

//   const authenticateUser = (token) => {
//     const requestOptions = {
//       method: 'GET',
//       headers: { Authorization: `Bearer ${token}` },
//     };

//     fetch('https://www.googleapis.com/oauth2/v3/userinfo', requestOptions)
//       .then((response) => response.json())
//       .then((data) => {
//         const { name, email, sub: userId, picture: photoUrl } = data;

//         const payload = {
//           email,
//           displayName: name,
//           uid: userId,
//           photoUrl,
//         };

//         setUser(payload);

//         fetch('https://api.example.com/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ token }),
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             setNewUserfiles(data.files);
//             localStorage.setItem('userToken', data.accessToken);
//           })
//           .catch((error) => console.log(error));
//       })
//       .catch((error) => console.log(error));
//   };

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const idToken = urlParams.get('id_token');

//     if (idToken) {
//       authenticateUser(idToken);
//     } else {
//       const userToken = localStorage.getItem('userToken');

//       if (userToken) {
//         const requestOptions = {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ token: userToken }),
//         };

//         fetch('https://api.example.com/refresh_token', requestOptions)
//           .then((response) => response.json())
//           .then((data) => {
//             if (data.accessToken) {
//               localStorage.setItem('userToken', data.accessToken);
//             } else {
//               localStorage.removeItem('userToken');
//               setUser(null);
//               setNewUserfiles([]);
//             }
//           })
//           .catch((error) => console.log(error));
//       }
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ newUserfiles, login, logout, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export { useAuth };

// import React, { useEffect, useState } from 'react';

// const AuthContext = React.createContext({});
// const useAuth = () => {
//   return React.useContext(AuthContext);
// };
// console.log('Auth Component');

// const ClientId =
//   '267135859196-6hqv51pqv057gksj8qpmbb8tpndgcjng.apps.googleusercontent.com';

// //const AuthContextProvider = ({ children }) => {
// export default function AuthContextProvider({ children }) {
//   const [user, setUser] = useState();
//   const [newUserfiles, setNewUserfiles] = useState([]);

//   const login = (callback = () => {}) => {
//     console.log('LOGIN');
//     window.gapi.load('auth2', () => {
//       window.gapi.auth2
//         .init({
//           client_id: ClientId,
//         })
//         .then(() => {
//           console.log('LOGIN 2');
//           const auth2 = window.gapi.auth2.getAuthInstance();
//           auth2.signIn().then((googleUser) => {
//             const profile = googleUser.getBasicProfile();
//             console.log("console.log('LOGIN');");

//             setUser({
//               id: profile.getId(),
//               name: profile.getName(),
//               email: profile.getEmail(),
//               avatar: profile.getImageUrl(),
//             });
//             callback(googleUser);
//           });
//         });
//     });
//   };

//   const logout = () => {
//     setNewUserfiles([]);
//     setUser(null);
//     const auth2 = window.gapi.auth2.getAuthInstance();
//     auth2.signOut();
//   };

//   useEffect(() => {
//     const onAuthLoad = () => {
//       window.gapi.load('auth2', () => {
//         window.gapi.auth2
//           .init({
//             client_id: ClientId,
//           })
//           .then(() => {
//             const auth2 = window.gapi.auth2.getAuthInstance();
//             const user = auth2.currentUser.get();
//             if (user && user.getId()) {
//               const profile = user.getBasicProfile();
//               setUser({
//                 id: profile.getId(),
//                 name: profile.getName(),
//                 email: profile.getEmail(),
//                 avatar: profile.getImageUrl(),
//               });
//             }
//           });
//       });
//     };
//     window.addEventListener('load', onAuthLoad);
//     return () => {
//       window.removeEventListener('load', onAuthLoad);
//     };
//   }, []);

//   const newUserList = (newUserfiles) => {
//     console.log('newUserfiles', newUserfiles);
//     setNewUserfiles(newUserfiles);
//   };
//   //   const newUserList = (newUserfiles) => {
//   //     console.log('newUserfiles', newUserfiles);
//   //     setNewUserfiles(newUserfiles);
//   //   };

//   return (
//     <AuthContext.Provider
//       value={{ newUserList, newUserfiles, login, logout, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export { useAuth };

// // ClientId =  267135859196-6hqv51pqv057gksj8qpmbb8tpndgcjng.apps.googleusercontent.com
