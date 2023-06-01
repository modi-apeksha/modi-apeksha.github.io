import Axios from 'axios';
import { clearStorage } from "./helpers";
const baseURL = "/";

const axios = Axios.create({
    baseURL: baseURL,
    headers: {
        'Authorization': `${localStorage.getItem("access_token") ? `Bearer ${localStorage.getItem("access_token")}` : ""}`,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

axios.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (error.response.status === 401 && 
            (originalRequest.url === baseURL+'token/refresh/' || 
                error.response.data.code === 'user_inactive')) {
            clearStorage();
            window.location.href = '/login/';
            return Promise.reject(error);
        }

        if (error.response.data.code === "token_not_valid" &&
            error.response.status === 401 && 
            error.response.statusText === "Unauthorized") 
            {
                const refreshToken = localStorage.getItem('refresh_token');

                if (refreshToken){
                    const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                    // exp date in token is expressed in seconds, while now() returns milliseconds:
                    const now = Math.ceil(Date.now() / 1000);

                    if (tokenParts.exp > now) {
                        return axios
                        .post('/token/refresh/', {refresh: refreshToken})
                        .then((response) => {
            
                            localStorage.setItem('access_token', response.data.access);
                            localStorage.setItem('refresh_token', response.data.refresh);
            
                            axios.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                            originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
            
                            return axios(originalRequest);
                        })
                        .catch(err => {
                            console.log(err)
                        });
                    }else{
                        console.log("Refresh token is expired", tokenParts.exp, now);
                        clearStorage();
                        window.location.href = '/login/';
                    }
                }else{
                    console.log("Refresh token not available.")
                    clearStorage();
                    window.location.href = '/login/';
                }
        }
        // specific error handling done elsewhere
        return Promise.reject(error);
});

export default axios;