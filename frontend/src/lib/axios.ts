import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';

// Get the base URL from the environment variables
const VITE_API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
console.log(VITE_API_BASE_URL)
if (!VITE_API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL is not defined. Please check your .env file.');
}

// Create an Axios instance with a predefined configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Centralized Logging Interceptors ---
// This will only run in the development environment
if (import.meta.env.DEV) {
  // Request Interceptor
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const { method, url, data } = config;
      console.groupCollapsed(
        `%c[API Request] %c${method?.toUpperCase()} %c${url}`,
        'color: #2f855a; font-weight: bold;',
        'color: #3182ce; font-weight: bold;',
        'color: gray; font-weight: normal;'
      );
      if (data) {
        console.log('Request Payload:', data);
      }
      console.groupEnd();
      return config;
    },
    (error: AxiosError) => {
      console.error('[API Request Error]', error);
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      const { status, config, data } = response;
      console.groupCollapsed(
        `%c[API Response] %c${status} %c${config.method?.toUpperCase()} %c${config.url}`,
        'color: #2f855a; font-weight: bold;',
        'color: #38a169;',
        'color: #3182ce; font-weight: bold;',
        'color: gray; font-weight: normal;'
      );
      console.log('Response Data:', data);
      console.groupEnd();
      return response;
    },
    (error: AxiosError) => {
      const { status, config, data } = error.response || {};
      console.groupCollapsed(
        `%c[API Response Error] %c${status || 'ERR'} %c${config?.method?.toUpperCase()} %c${config?.url}`,
        'color: #c53030; font-weight: bold;',
        'color: #e53e3e;',
        'color: #3182ce; font-weight: bold;',
        'color: gray; font-weight: normal;'
      );
      console.log('Error Details:', data || error.message);
      console.groupEnd();
      return Promise.reject(error);
    }
  );
}

export default apiClient;