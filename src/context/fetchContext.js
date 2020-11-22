import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AuthContext } from './authContext';

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: 'https://clavis-rest.herokuapp.com/',
  });

  authAxios.interceptors.request.use(
    (config) => {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${authContext.authState.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return <Provider value={{ authAxios }}>{children}</Provider>;
};

FetchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { FetchContext, FetchProvider };
