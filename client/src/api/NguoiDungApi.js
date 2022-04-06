import axiosClient from "./axiosClient";

export const NguoiDungApi = {
    getAll: () => {
        const url = `/NguoiDung/NguoiDungs`;
        return axiosClient.get(url);
    }
    ,
    get: (nguoiDungId) => {
        const url = `/NguoiDung/${nguoiDungId}`;
        return axiosClient.get(url);
    },
    add: (data) => {
        const url = `/NguoiDung`;
        return axiosClient.post(url, data);
    },
    delete: (nguoiDungId) => {
        const url = `/NguoiDung/${nguoiDungId}`;
        return axiosClient.delete(url);
    },
    update: (nguoiDungId, data) => {
        const url = `/NguoiDung/${nguoiDungId}`;
        return axiosClient.patch(url, data);
    },
}