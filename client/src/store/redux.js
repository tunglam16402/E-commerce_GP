import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { appSlice } from './app/appSlice';
import { userSlice } from './users/userSlice';
import { productSlice } from './products/productSlice';

const commonConfig = {
    key: 'shop/user',
    storage,
};

const userConfig = {
    ...commonConfig,
    whitelist: ['isLoggedIn', 'token'],
};

export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        products: productSlice.reducer,
        user: persistReducer(userConfig, userSlice.reducer),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: { ignoredActions: ['persist/PERSIST'] } }),
});

export const persistor = persistStore(store);
