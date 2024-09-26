import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cartReducer from './CartSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const Store = configureStore({
    reducer: {
        cart: persistedReducer,
    },
});

export const persistor = persistStore(Store);