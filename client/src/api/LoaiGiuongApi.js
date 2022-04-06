import axiosClient from "./axiosClient";

export const loaiGiuongApi = {
    getAll: () => {
        const url = `/LoaiGiuong/LoaiGiuongs`;
        return axiosClient.get(url);
    }
    ,
    get: (loaiGiuongId) => {
        const url = `/LoaiGiuong/${loaiGiuongId}`;
        return axiosClient.get(url);
    },
    add: (data) => {
        const url = `/LoaiGiuong`;
        return axiosClient.post(url, data);
    },
    delete: (loaiGiuongId) => {
        const url = `/LoaiGiuong/${loaiGiuongId}`;
        return axiosClient.delete(url);
    },
    update: (loaiGiuongId, data) => {
        const url = `/LoaiGiuong/${loaiGiuongId}`;
        return axiosClient.patch(url, data);
    },
}