import axiosClient from "./axiosClient";

export const choNghiApi = {
    getAll: (params) => {
        const url = `/ChoNghi/ChoNghis`;
        return axiosClient.get(url, { params });
    }
    ,
    get: (choNghiId) => {
        const url = `/ChoNghi/${choNghiId}`;
        return axiosClient.get(url);
    },
    add: (data) => {
        const url = `/ChoNghi`;
        return axiosClient.post(url, data);
    },
    delete: (choNghiId) => {
        const url = `/ChoNghi/${choNghiId}`;
        return axiosClient.delete(url);
    },
    update: (choNghiId, data) => {
        const url = `/ChoNghi/${choNghiId}`;
        return axiosClient.patch(url, data);
    },
}