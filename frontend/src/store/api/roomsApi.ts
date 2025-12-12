import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Room, CreateRoomData, UpdateRoomData, ApiResponse } from '../../types';

export const roomsApi = createApi({
    reducerPath: 'roomsApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api' }),
    tagTypes: ['Room'],
    endpoints: (builder) => ({
        // Get all rooms with optional pagination
        getRooms: builder.query<ApiResponse<Room[]>, { page?: number; limit?: number } | void>({
            query: (params) => ({
                url: '/rooms',
                params: params ? { page: params.page, limit: params.limit } : {},
            }),
            providesTags: (result) =>
                result?.data
                    ? [
                        ...result.data.map(({ _id }) => ({ type: 'Room' as const, id: _id })),
                        { type: 'Room', id: 'LIST' },
                    ]
                    : [{ type: 'Room', id: 'LIST' }],
        }),

        // Get single room by ID
        getRoomById: builder.query<ApiResponse<Room>, string>({
            query: (id) => `/rooms/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Room', id }],
        }),

        // Create a new room
        createRoom: builder.mutation<ApiResponse<Room>, CreateRoomData>({
            query: (room) => ({
                url: '/rooms',
                method: 'POST',
                body: room,
            }),
            invalidatesTags: [{ type: 'Room', id: 'LIST' }],
        }),

        // Update a room
        updateRoom: builder.mutation<ApiResponse<Room>, { id: string; data: UpdateRoomData }>({
            query: ({ id, data }) => ({
                url: `/rooms/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Room', id },
                { type: 'Room', id: 'LIST' },
            ],
        }),

        // Delete a room
        deleteRoom: builder.mutation<ApiResponse<Room>, string>({
            query: (id) => ({
                url: `/rooms/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Room', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetRoomsQuery,
    useGetRoomByIdQuery,
    useCreateRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation,
} = roomsApi;
