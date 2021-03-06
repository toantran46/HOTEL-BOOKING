import axiosClient from "./axiosClient";

export const thanhPhoApi = {
    getAll: (params) => {
        const url = `/ThanhPho/ThanhPhos`;
        return axiosClient.get(url, { params });
    }
    ,
    get: (thanhPhoId) => {
        const url = `/ThanhPho/${thanhPhoId}`;
        return axiosClient.get(url);
    },
    add: (data) => {
        const url = `/ThanhPho`;
        return axiosClient.post(url, data);
    },
    delete: (thanhPhoId) => {
        const url = `/ThanhPho/${thanhPhoId}`;
        return axiosClient.delete(url);
    },
    update: (thanhPhoId, data) => {
        const url = `/ThanhPho/${thanhPhoId}`;
        return axiosClient.patch(url, data);
    },
}