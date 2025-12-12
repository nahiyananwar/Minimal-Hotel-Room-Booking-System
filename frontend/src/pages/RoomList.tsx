import { useGetRoomsQuery } from '../store/api/roomsApi';
import RoomCard from '../components/RoomCard';

const RoomList = () => {
    const { data, isLoading, isError, error } = useGetRoomsQuery();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading rooms...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center bg-red-50 p-6 rounded-xl">
                    <p className="text-red-600 text-lg font-medium">Failed to load rooms</p>
                    <p className="text-red-500 text-sm mt-2">
                        {(error as any)?.data?.message || 'Please try again later'}
                    </p>
                </div>
            </div>
        );
    }

    const rooms = data?.data || [];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Hotel Rooms</h1>
                <p className="text-gray-600 mt-2">Manage and book available rooms</p>
            </div>

            {/* Stats */}
            {rooms.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-2xl font-bold text-blue-600">{rooms.length}</p>
                        <p className="text-sm text-gray-600">Total Rooms</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-2xl font-bold text-green-600">
                            {rooms.filter((r) => r.available).length}
                        </p>
                        <p className="text-sm text-gray-600">Available</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-2xl font-bold text-red-600">
                            {rooms.filter((r) => !r.available).length}
                        </p>
                        <p className="text-sm text-gray-600">Booked</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-2xl font-bold text-purple-600">
                            {[...new Set(rooms.map((r) => r.type))].length}
                        </p>
                        <p className="text-sm text-gray-600">Room Types</p>
                    </div>
                </div>
            )}

            {/* Room Grid */}
            {rooms.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <p className="text-gray-500 text-lg">No rooms found</p>
                    <p className="text-gray-400 text-sm mt-2">
                        Add your first room to get started
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map((room) => (
                        <RoomCard key={room._id} room={room} />
                    ))}
                </div>
            )}

            {/* Pagination Info */}
            {data?.pagination && data.pagination.totalPages > 1 && (
                <div className="mt-8 text-center text-gray-600 text-sm">
                    Showing {rooms.length} of {data.pagination.total} rooms
                </div>
            )}
        </div>
    );
};

export default RoomList;
