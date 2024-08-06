import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const login = (data) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await axios.post('/eoditsseu/api/users/login', data);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, error: error.response ? error.response.data : error.message });
      throw error;
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    // Perform logout logic (e.g., remove token from storage)
    dispatch({ type: LOGOUT });
  };
};

export const register = (data) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      const response = await axios.post('/eoditsseu/api/users/register', data);
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: REGISTER_FAILURE, error: error.response ? error.response.data : error.message });
      throw error;
    }
  };
};
