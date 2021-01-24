import Axios from 'axios';

export const BASE_URL = 'https://api.adviceslip.com/';


export const server = Axios.create({
    baseURL: BASE_URL
});


