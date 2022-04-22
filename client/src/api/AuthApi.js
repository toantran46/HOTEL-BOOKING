import axiosClient from "./axiosClient";

export const AuthApi = {
    login: (data) => {
        const url = "auth/login";
        return axiosClient.post(url, data);
    }
}