import axios, {AxiosError} from "axios";
import appConfig from "../config";

axios.interceptors.request.use(config => {
    if (!config.baseURL) config.baseURL = appConfig.apiUrl;
    return config;
});

axios.interceptors.response.use(response => {
    return response;
}, (error: AxiosError) => {
    switch (error.response.status) {
        case 0:
            alert('API is not running, please check and try again');
            break;
        case 404:
            alert('Request is not found');
            break;
        case 500:
            alert('Server error.');
            break;
        default:
            alert('An error occurred please try again later.');
    }
});