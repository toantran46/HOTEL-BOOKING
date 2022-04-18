import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    homePage: {
        searchValue: null,
        placeChoosen: {
            _id: null,
            placeName: null,
            _idCity: null,
            cityName: null,
        },
        receiveDate: null,
        returnDate: null,
    },
    mainPage: {
        isLoading: false
    },
    detailPage: {
        placeSelected: null,
        bookingInfo: []
    },
    bookingPage: {
        currentStep: 2,
        ThongTinPhong: [
            // {
            //   Phong: null,
            //   TenNguoiNhanPhong: null,
            //   SoLuong: null,
            // },
        ],
        HoTenNguoiDat: null,
        Email: null,
        YeuCau: null,
        ThoiGianDenDuKien: null,
        MaKhachSan: null,
        NgayNhanPhong: null,
        NgayTraPhong: null,
        TongTien: null,
        //data step 3
        SoDienThoai: null
    }
}



const hotelSlice = createSlice({
    name: "hotel",
    initialState,
    reducers: {
        choosePlace: (state, action) => {
            state.homePage.placeChoosen = { ...state.homePage.placeChoosen, ...action.payload }
        },
        saveSearchValue: (state, action) => {
            state.homePage.searchValue = action.payload
        },
        chooseDate: (state, action) => {
            if (action.payload.type === 'returnDate') {
                state.homePage.returnDate = action.payload.returnDate;
            } else {
                state.homePage.receiveDate = action.payload.receiveDate;
            }
        },
        // reducers for main page
        setIsLoading: (state, action) => {
            // action.payload = { key: "mainPage" , isLoading :true }
            state[action.payload.key].isLoading = action.payload.isLoading;
        },
        //current hotel choosen
        saveCurrentPlace: (state, action) => {
            //action.payload =_idPlace
            state.detailPage.placeSelected = action.payload;
        },
        booking: (state, action) => {
            //action.payload = { placeInfo, roomSelected, timeInfo }
            // state.detailPage.bookingInfo = action.payload;
            const index = state.detailPage.bookingInfo.findIndex(place => place.placeInfo._id === action.payload.placeInfo._id);
            console.log({ index })
            if (index === -1) state.detailPage.bookingInfo.push(action.payload);
            else {
                state.detailPage.bookingInfo[index] = action.payload;
            }

        },
        //change step in booking page
        changeStep: (state, action) => {
            // action.payload="1"
            state.bookingPage.currentStep = state.bookingPage.currentStep + action.payload;
        },
        saveDataStepTwo: (state, action) => {
            state.bookingPage.HoTenNguoiDat = action.payload.bookerName;
            state.bookingPage.Email = action.payload.email;
            state.bookingPage.YeuCau = action.payload.request;
            state.bookingPage.ThoiGianDenDuKien = action.payload.intentTime;
            state.bookingPage.ThongTinPhong = action.payload.roomInfo;
            state.bookingPage.TongTien = action.payload.totalPrice;
            state.bookingPage.NgayNhanPhong = action.payload.receiveDate;
            state.bookingPage.NgayTraPhong = action.payload.returnDate;
            state.bookingPage.MaKhachSan = state.detailPage.placeSelected;
        },
        resetData: (state, action) => {
            state.bookingPage.currentStep = 2;
            state.bookingPage.ThongTinPhong = [];
            state.bookingPage.HoTenNguoiDat = null;
            state.bookingPage.Email = null;
            state.bookingPage.YeuCau = null;
            state.bookingPage.ThoiGianDenDuKien = null;
            state.bookingPage.MaKhachSan = null;
            state.bookingPage.NgayNhanPhong = null;
            state.bookingPage.NgayTraPhong = null;
            state.bookingPage.TongTien = null;
            //data step 3
            state.bookingPage.SoDienThoai = null
        }

    }
});



const { actions, reducer } = hotelSlice;

export const { choosePlace, saveSearchValue, chooseDate, setIsLoading,
    chooseRoom, saveCurrentPlace, booking, changeStep, saveDataStepTwo, resetData } = actions;

export default reducer;
