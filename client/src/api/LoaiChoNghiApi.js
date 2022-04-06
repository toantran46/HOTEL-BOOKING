import axiosClient from "./axiosClient";

export const loaiChoNghiApi = {
    getAll: () => {
        const url = `/LoaiChoNghi/LoaiChoNghis`;
        return axiosClient.get(url);
    }
    ,
    get: (loaiChoNghiId) => {
        const url = `/LoaiChoNghi/${loaiChoNghiId}`;
        return axiosClient.get(url);
    },
    add: (data) => {
        const url = `/LoaiChoNghi`;
        return axiosClient.post(url, data);
    },
    delete: (loaiChoNghiId) => {
        const url = `/LoaiChoNghi/${loaiChoNghiId}`;
        return axiosClient.delete(url);
    },
    update: (loaiChoNghiId, data) => {
        const url = `/LoaiChoNghi/${loaiChoNghiId}`;
        return axiosClient.patch(url, data);
    },
}