import axios from 'axios';

 const AxiosService = axios.create({
  baseURL: 'https://login-backend-9cim.onrender.com',
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosService;