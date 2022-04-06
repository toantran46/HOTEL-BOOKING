import axiosClient from "./axiosClient";

export const datPhongApi = {
    getAll: () => {
        const url = `/DatPhong/DatPhongs`;
        return axiosClient.get(url);
    }
    ,
    get: (datPhongId) => {
        const url = `/DatPhong/${datPhongId}`;
        return axiosClient.get(url);
    },
    add: (data) => {
        const url = `/DatPhong`;
        return axiosClient.post(url, data);
    },
    delete: (datPhongId) => {
        const url = `/DatPhong/${datPhongId}`;
        return axiosClient.delete(url);
    },
    update: (datPhongId, data) => {
        const url = `/DatPhong/${datPhongId}`;
        return axiosClient.patch(url, data);
    },
}