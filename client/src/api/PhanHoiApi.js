import axiosClient from "./axiosClient";

export const phanHoiApi = {
    getAll: (params) => {
        const url = `/PhanHoi/PhanHois`;
        return axiosClient.get(url, { params });
    }
    ,
    get: (phanHoiId) => {
        const url = `/PhanHoi/${phanHoiId}`;
        return axiosClient.get(url);
    },
    add: (data) => {
        const url = `/PhanHoi`;
        return axiosClient.post(url, data);
    },
    delete: (phanHoiId) => {
        const url = `/PhanHoi/${phanHoiId}`;
        return axiosClient.delete(url);
    },
    update: (phanHoiId, data) => {
        const url = `/PhanHoi/${phanHoiId}`;
        return axiosClient.patch(url, data);
    },
}