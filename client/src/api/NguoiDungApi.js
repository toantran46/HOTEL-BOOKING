import { toastError } from "utils/notifi";
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

    getMe: () => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const url = `/NguoiDung`;
                    const response = await axiosClient.get(url);
                    resolve(response);
                } catch (error) {
                    reject(error);
                }
            }, 1000)
        });
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
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const url = `/NguoiDung/${nguoiDungId}`;
                    const response = await axiosClient.patch(url, data);
                    resolve(response);
                } catch (error) {
                    reject(error)
                }
            }, 2000);
        })
    },
}