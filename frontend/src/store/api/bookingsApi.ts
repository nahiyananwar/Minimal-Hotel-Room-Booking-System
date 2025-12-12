import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Booking, BookingSummary, CreateBookingData, ApiResponse } from '../../types';

export const bookingsApi = createApi({
    reducerPath: 'bookingsApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api' }),
    tagTypes: ['Booking', 'Summary'],
    endpoints: (builder) => ({
        // Get all bookings
        getBookings: builder.query<ApiResponse<Booking[]>, void>({
            query: () => '/bookings',
            providesTags: ['Booking'],
        }),

        // Create a new booking
        createBooking: builder.mutation<ApiResponse<Booking>, CreateBookingData>({
            query: (booking) => ({
                url: '/bookings',
                method: 'POST',
                body: booking,
            }),
            invalidatesTags: ['Booking', 'Summary'],
        }),

        // Get booking summary (aggregated data)
        getBookingSummary: builder.query<ApiResponse<BookingSummary[]>, void>({
            query: () => '/bookings/summary',
            providesTags: ['Summary'],
        }),
    }),
});

export const {
    useGetBookingsQuery,
    useCreateBookingMutation,
    useGetBookingSummaryQuery,
} = bookingsApi;
