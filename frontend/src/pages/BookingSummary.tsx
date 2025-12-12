import { useGetBookingSummaryQuery } from '../store/api/bookingsApi';

const BookingSummary = () => {
    const { data, isLoading, isError, error } = useGetBookingSummaryQuery();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading booking summary...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center bg-red-50 p-6 rounded-xl">
                    <p className="text-red-600 text-lg font-medium">Failed to load summary</p>
                    <p className="text-red-500 text-sm mt-2">
                        {(error as any)?.data?.message || 'Please try again later'}
                    </p>
                </div>
            </div>
        );
    }

    const summary = data?.data || [];

    // Calculate totals
    const totalNights = summary.reduce((acc, item) => acc + item.totalNightsBooked, 0);
    const totalBookings = summary.reduce((acc, item) => acc + item.totalBookings, 0);
    const totalRevenue = summary.reduce((acc, item) => acc + item.totalRevenue, 0);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Booking Summary</h1>
                <p className="text-gray-600 mt-2">Aggregated view of all room bookings</p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                    <p className="text-blue-100 text-sm font-medium">Total Rooms Booked</p>
                    <p className="text-4xl font-bold mt-2">{summary.length}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                    <p className="text-green-100 text-sm font-medium">Total Nights Booked</p>
                    <p className="text-4xl font-bold mt-2">{totalNights}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                    <p className="text-purple-100 text-sm font-medium">Total Revenue</p>
                    <p className="text-4xl font-bold mt-2">${totalRevenue.toLocaleString()}</p>
                </div>
            </div>

            {/* Summary Table */}
            {summary.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <p className="text-gray-500 text-lg">No bookings yet</p>
                    <p className="text-gray-400 text-sm mt-2">
                        Book some rooms to see the summary
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Room No
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Total Bookings
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Total Nights
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Revenue
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {summary.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-medium text-gray-900">
                                                Room {item.roomNo}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.type === 'Single'
                                                        ? 'bg-green-100 text-green-800'
                                                        : item.type === 'Double'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : item.type === 'Suite'
                                                                ? 'bg-purple-100 text-purple-800'
                                                                : 'bg-amber-100 text-amber-800'
                                                    }`}
                                            >
                                                {item.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="text-sm text-gray-900">{item.totalBookings}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="text-sm font-medium text-gray-900">
                                                {item.totalNightsBooked}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <span className="text-sm font-semibold text-green-600">
                                                ${item.totalRevenue.toLocaleString()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            {/* Table Footer with Totals */}
                            <tfoot className="bg-gray-50">
                                <tr>
                                    <td
                                        colSpan={2}
                                        className="px-6 py-4 text-sm font-semibold text-gray-900"
                                    >
                                        Totals
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                                        {totalBookings}
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                                        {totalNights}
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-bold text-green-600">
                                        ${totalRevenue.toLocaleString()}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingSummary;
