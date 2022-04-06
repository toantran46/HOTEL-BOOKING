import axiosClient from "./axiosClient";

export const tienNghiApi = {
    getAll: () => {
        const url = `/TienNghi/TienNghis`;
        return axiosClient.get(url);
    }
    ,
    get: (tienNghiId) => {
        const url = `/TienNghi/${tienNghiId}`;
        return axiosClient.get(url);
    },
    add: (data) => {
        const url = `/TienNghi`;
        return axiosClient.post(url, data);
    },
    delete: (tienNghiId) => {
        const url = `/TienNghi/${tienNghiId}`;
        return axiosClient.delete(url);
    },
    update: (tienNghiId, data) => {
        const url = `/TienNghi/${tienNghiId}`;
        return axiosClient.patch(url, data);
    },
}