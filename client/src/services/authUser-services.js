import { api } from '.';

export const loginSuccess = (user) => {
  return api.post('/user/login', user).then((response) => {
    return response.data;
  });
};
