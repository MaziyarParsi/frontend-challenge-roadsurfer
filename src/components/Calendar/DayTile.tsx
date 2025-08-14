interface Booking {
  id: string;
  startDate: string;
  endDate: string;
  pickupReturnStationId: string;
}

interface DayTileProps {
  day: string;
  date: string;
  fullDate: Date;
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
}

const DayTile = ({
  day,
  date,
  fullDate,
  bookings,
  onBookingClick,
}: DayTileProps) => {
  const isToday = new Date().toDateString() === fullDate.toDateString();

  return (
    <div
      className={`bg-gray-700 border-2 rounded-lg p-4 min-h-[120px] transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
        isToday ? "border-blue-500 bg-gray-600" : "border-gray-600"
      }`}
    >
      {/* Day header */}
      <div className="text-center mb-3">
        <div
          className={`text-sm font-medium uppercase tracking-wide ${
            isToday ? "text-blue-400" : "text-gray-400"
          }`}
        >
          {day}
        </div>
        <div
          className={`text-2xl font-bold ${
            isToday ? "text-blue-400" : "text-white"
          }`}
        >
          {date}
        </div>
      </div>

      {/* Bookings */}
      <div className="space-y-2">
        {bookings.length === 0 ? (
          <div className="text-gray-500 text-xs text-center py-2">
            No bookings
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs p-2 rounded cursor-pointer hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-md"
              onClick={() => onBookingClick(booking)}
            >
              <div className="font-medium">
                Booking #{booking.id.slice(0, 4)}
              </div>
              <div className="text-blue-200 text-xs">
                {new Date(booking.startDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DayTile;
