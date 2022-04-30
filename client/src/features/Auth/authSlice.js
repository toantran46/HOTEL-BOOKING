import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    selectStar: 0,
    nameHotel: null,
    titleHotel: null,
    detailHotel: null,
    otherHothelCheck: false,
    addrMain: null,
    addrCity: null,

    typeRoom: '6268f19fd2cd433f452fe80a',
    nameRoom: null,
    Room: [
        {
            idBed: '6268f3675717716f2ed1a61e-1',
            quantity: 1,
        },
    ],
    smokingPolicy: 0,
    numRoom: 1,
    quantityRoom: 1,
    numberGuest: null,
    sizeRoom: null,
    price: null,

    isParking: true,
    isBreakfast: true,
    convenientGroup: [],

    imageHotel: [],

    policy: {
        cancelDate: null,
        charge: null,
        receiveDate: null,
        returnDate: null,
        insurance: null,
    },

    payment: {
        cartPayment: null,
        isCredit: null,
        nameInstead: null,
        nameCompany: null,
    },

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
            state.titleHotel = action.payload.titleHotel;
            state.detailHotel = action.payload.detailHotel;
            state.otherHothelCheck = action.payload.otherHothelCheck;
            state.addrMain = action.payload.addrMain;
            state.addrCity = action.payload.addrCity;
        },

        addLayoutNPrice: (state, action) => {
            state.typeRoom = action.payload.typeRoom;
            state.nameRoom = action.payload.nameRoom;
            state.smokingPolicy = action.payload.smokingPolicy;
            state.numRoom = action.payload.numRoom;
            state.quantityRoom = action.payload.quantityRoom;
            state.numberGuest = action.payload.numberGuest;
            state.sizeRoom = action.payload.sizeRoom;
            state.price = action.payload.price;
        },

        addBed: (state, action) => {
            state.Room = action.payload;
        },

        addConvenient: (state, action) => {
            state.isBreakfast = action.payload.isBreakfast;
            state.isParking = action.payload.isParking;
            state.convenientGroup = action.payload.convenientGroup;
        },

        addImg: (state, action) => {
            state.imageHotel = action.payload;
        },

        addPolicy: (state, action) => {
            state.policy = action.payload;

        },

        addPayment: (state, action) => {
            state.payment = action.payload;
        },

        setTab: (state, action) => {
            if (action.payload.key === 'next') {
                state.tab = action.payload.tab + 1;
            } else {
                state.tab = action.payload.tab;
            }
        },
    }
});

const { reducer, actions } = auth;
export const { addInforBasic, addLayoutNPrice, addBed, addConvenient, addImg, addPolicy, addCredit, addPayment, setTab } = actions;
export default reducer;