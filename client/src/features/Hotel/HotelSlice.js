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
        bookingInfo: [{
            placeInfo: null,
            roomSelected: [{ room: null, quantity: null, price: null }],
        }]
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

        //reducers for detail page
        chooseRoom: (state, action) => {
            // booking=[ { room , quantity , price } ];
            state.detailPage.bookingInfo = [...state.detailPage.bookingInfo, { room: action.payload.room, quantity: action.payload.quantity, price: action.payload.price }]
        },
        selectedPlace: (state, action) => {
            state.placeSelected = action.payload;
        }

    }
});



const { actions, reducer } = hotelSlice;

export const { choosePlace, saveSearchValue, chooseDate, setIsLoading, chooseRoom, selectedPlace } = actions;

export default reducer;
