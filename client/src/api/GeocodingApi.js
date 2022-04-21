import axiosClient from "./axiosClient";

export const geocodingApi = {
    get: (address) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODING_API}`;
        return axiosClient.get(url);
    }
}