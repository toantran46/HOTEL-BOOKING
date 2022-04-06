import axiosClient from "./axiosClient";

export const loaiPhongApi = {
    getAll: () => {
        const url = `/LoaiPhong/LoaiPhongs`;
        return axiosClient.get(url);
    }
    ,
    get: (loaiPhongId) => {
        const url = `/LoaiPhong/${loaiPhongId}`;
        return axiosClient.get(url);
    },
    add: (data) => {
        const url = `/LoaiPhong`;
        return axiosClient.post(url, data);
    },
    delete: (loaiPhongId) => {
        const url = `/LoaiPhong/${loaiPhongId}`;
        return axiosClient.delete(url);
    },
    update: (loaiPhongId, data) => {
        const url = `/LoaiPhong/${loaiPhongId}`;
        return axiosClient.patch(url, data);
    },
}