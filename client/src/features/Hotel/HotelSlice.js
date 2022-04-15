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
    detailPage: {}
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
        }
    }
});



const { actions, reducer } = hotelSlice;

export const { choosePlace, saveSearchValue, chooseDate, setIsLoading } = actions;

export default reducer;
