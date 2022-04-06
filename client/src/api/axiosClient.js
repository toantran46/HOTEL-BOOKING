import axios from 'axios';
import queryString from 'query-string';


const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "content-type": 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params)
});


axiosClient.interceptors.request.use(async config => {
    //handle token when login username password

    // const { currentUser } = JSON.parse(localStorage.getItem('persist:auth'));

    // const { auth: { token } } = JSON.parse(currentUser);

    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
})

axiosClient.interceptors.response.use(response => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (err) => {
    throw err;
})


export default axiosClient;