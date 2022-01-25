import axios from 'axios'

axios.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    
    if(token && config && config.headers){
        // add token to request headers
        config.headers['Authorization'] = 'Bearer ' + token;
        return config;
    }
    return config;
  },
  error => {
      Promise.reject(error);
  }
  );

export default axios;