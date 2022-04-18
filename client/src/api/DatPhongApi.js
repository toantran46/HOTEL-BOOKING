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
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const url = `/DatPhong`;
                    const response = await axiosClient.post(url, data);
                    resolve(response);
                } catch (error) {
                    reject(error)
                }
            }, 2000)
        })
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