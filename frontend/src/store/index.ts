import { configureStore } from '@reduxjs/toolkit';
import { roomsApi } from './api/roomsApi';
import { bookingsApi } from './api/bookingsApi';

export const store = configureStore({
    reducer: {
        [roomsApi.reducerPath]: roomsApi.reducer,
        [bookingsApi.reducerPath]: bookingsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(roomsApi.middleware)
            .concat(bookingsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
