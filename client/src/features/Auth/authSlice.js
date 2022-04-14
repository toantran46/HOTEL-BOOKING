import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    selectStar: 0,
    nameHotel: null,
    nameOwner: null,
    phoneOwner: null,
    otherHothelCheck: null,
    addrMain: null,
    addrCity: null,
    tab: 1,
}

const auth = createSlice({
    name: 'aboutInfo',
    initialState: initialState,
    reducers: {
        addInforBasic: (state, action) => {
            // const newInforBasic = action.payload;
            state.selectStar = action.payload.selectStar;
            state.nameHotel = action.payload.nameHotel;
            state.nameOwner = action.payload.nameOwner;
            state.phoneOwner = action.payload.phoneOwner;
            state.otherHothelCheck = action.payload.otherHothelCheck;
            state.addrMain = action.payload.addrMain;
            state.addrCity = action.payload.addrCity;
        },
        setTab: (state, action) => {
            state.tab = action.payload.tab + 1;
        },
    }
});

const { reducer, actions } = auth;
export const { addInforBasic, setTab } = actions;
export default reducer;