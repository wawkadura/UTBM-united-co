import axios from 'axios'

// intercept HTTP request in order to add token in header
axios.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');

    console.log('request pass');
    
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