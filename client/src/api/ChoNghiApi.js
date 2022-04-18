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
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const url = `/ChoNghi`;
                    const response = await axiosClient.post(url, data);
                    resolve(response);
                } catch (error) {
                    reject(error)
                }
            }, 2000)
        })
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