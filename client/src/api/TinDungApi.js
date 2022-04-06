import axiosClient from "./axiosClient";

export const tinDungApi = {
    getAll: () => {
        const url = `/TinDung/TinDungs`;
        return axiosClient.get(url);
    }
    ,
    get: (tinDungId) => {
        const url = `/TinDung/${tinDungId}`;
        return axiosClient.get(url);
    },
    add: (data) => {
        const url = `/TinDung`;
        return axiosClient.post(url, data);
    },
    delete: (tinDungId) => {
        const url = `/TinDung/${tinDungId}`;
        return axiosClient.delete(url);
    },
    update: (tinDungId, data) => {
        const url = `/TinDung/${tinDungId}`;
        return axiosClient.patch(url, data);
    },
}