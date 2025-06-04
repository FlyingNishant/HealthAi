import axios from 'axios';
import conf from '../conf/conf';
import authService from './authService';
import { useNavigate } from 'react-router-dom';

const api = axios.create();

api.interceptors.request.use(
  async (config) => {
    const userDetails = await authService.getCognitoUserDetails();
    const token = userDetails.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry)  {
      originalRequest._retry = true;

      try {
        // Get new access token
        const newSession = await authService.refreshAccessToken();
        const {accessToken} = newSession;
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (e) {
        const navigate = useNavigate();
        // window.location.href = '/';
        navigate('/login');
        console.log(e);
      }
    }

    return Promise.reject(error);
  }
);
  
export default api