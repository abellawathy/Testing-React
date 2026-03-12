import api from '../../utils/api';
import { setAuthUserActionCreator, unsetAuthUserActionCreator } from './action';

function asyncLogin({ email, password }) {
  return async (dispatch) => {
    try {
      const { token } = await api.login({ email, password });

      api.putAccessToken(token);

      const user = await api.getOwnProfile();

      dispatch(setAuthUserActionCreator(user));

      return { token, user };
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

function asyncRegister({ name, email, password }) {
  return async () => {
    try {
      await api.register({ name, email, password });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    api.putAccessToken('');

    dispatch(unsetAuthUserActionCreator());
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      const token = api.getAccessToken();

      if (!token) {
        dispatch(setAuthUserActionCreator(null));
        return;
      }

      const user = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(user));
    } catch (error) {
      dispatch(setAuthUserActionCreator(null));
    }
  };
}

export { asyncLogin, asyncUnsetAuthUser, asyncPreloadProcess, asyncRegister };
