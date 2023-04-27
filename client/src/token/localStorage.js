import Cookies from 'js-cookie';

export const saveUserGoogleTokenToLocalStorage = (token) => {
  Cookies.set('jwtGoogleToken', token, { expires: 30 });
};

export const getUserGoogleTokenToLocalStorage = () => {
  const jwtToken = Cookies.get('jwtGoogleToken');

  return jwtToken;
};

export const saveUserTokenToLocalStorage = (token) => {
  Cookies.set('jwtToken', token, { expires: 30 });
};

export const removeGoogleTokenFromLocalStorage = () => {
  Cookies.remove('jwtGoogleToken');
};

export const getTokenFromLocalStorage = () => {
  const jwtToken = Cookies.get('jwtToken');

  return jwtToken;
};

export const removeTokenFromLocalStorage = () => {
  Cookies.remove('jwtToken');
};
