import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "features/Auth/authSlice"
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
    key: 'auth',
    storage,
};

const rootReducer = combineReducers({
    aboutInfo: persistReducer(authPersistConfig, authReducer),
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
});

export const persistor = persistStore(store);
export default store;