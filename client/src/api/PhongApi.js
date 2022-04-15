import axiosClient from "./axiosClient";

export const phongApi = {
  getAll: () => {
    const url = `/Phong/Phongs`;
    return axiosClient.get(url);
  },
  get: (phongId) => {
    const url = `/Phong/${phongId}`;
    return axiosClient.get(url);
  },
  getEmptyRoom: (placeId, NgayNhanPhong, NgayTraPhong) => {
    const url = `/Phong/${placeId}/Phongtrong?ngayNhanPhong=${NgayNhanPhong}&ngayTraPhong=${NgayTraPhong}`;
    return axiosClient.get(url);
  },
  add: (data) => {
    const url = `/Phong`;
    return axiosClient.post(url, data);
  },
  delete: (phongId) => {
    const url = `/Phong/${phongId}`;
    return axiosClient.delete(url);
  },
  update: (phongId, data) => {
    const url = `/Phong/${phongId}`;
    return axiosClient.patch(url, data);
  },
};
