import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: "https://social-app-oroghene.herokuapp.com/api/"
});