import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.67.185:3000',
});


export default instance;
