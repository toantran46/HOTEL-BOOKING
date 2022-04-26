import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthApi } from 'api/AuthApi';
import { NguoiDungApi } from 'api/NguoiDungApi';
// import reducer from 'features/Auth/authSlice';

export const login = createAsyncThunk("user/login", async (data, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
        const { accessToken, refreshToken } = await AuthApi.login(data);
        return fulfillWithValue({ accessToken, refreshToken });
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const getMe = createAsyncThunk("auth/getMe", async (data, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
        const { user } = await NguoiDungApi.getMe();
        return fulfillWithValue(user);
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

const initialState = {
    auth: {
        token: null,
        refreshToken: null,
    },
    loggedIn: false,
    user: null,
};

const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.loggedIn = false;
            state.user = {};
            state.auth = {
                token: null,
                refreshToken: null,
            };
        }
    }, extraReducers: {
        //post login
        [login.pending]: (state) => {
            state.isLoading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.auth = action.payload;
            state.loggedIn = true;
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        //get me
        [getMe.pending]: (state) => {
            state.isLoading = true;
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.loggedIn = true;
        },
        [getMe.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
    }
});

const { reducer, actions } = auth;
export const { logout } = actions;
export default reducer;