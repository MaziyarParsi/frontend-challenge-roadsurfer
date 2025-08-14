import useWeek from "../../hooks/useWeek";
import DayTile from "./DayTile";
import useMediaQuery from "../../hooks/useMediaQuery";

interface Station {
  id: string;
  name: string;
  bookings: Array<{
    id: string;
    startDate: string;
    endDate: string;
    pickupReturnStationId: string;
  }>;
}

interface Booking {
  id: string;
  startDate: string;
  endDate: string;
  pickupReturnStationId: string;
}

interface WeekViewProps {
  selectedStation: Station;
  onBookingClick: (booking: Booking) => void;
}

const WeekView = ({ selectedStation, onBookingClick }: WeekViewProps) => {
  const { week, nextWeek, prevWeek } = useWeek();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const bookings = selectedStation.bookings || [];

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
      {/* Header with pagination */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={prevWeek}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous Week
        </button>

        <h2 className="text-2xl font-bold text-white">
          {week[0].fullDate.toLocaleString("default", { month: "long" })}{" "}
          {week[0].fullDate.getFullYear()}
        </h2>

        <button
          onClick={nextWeek}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Next Week
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Week grid */}
      <div
        className={`grid ${isDesktop ? "grid-cols-7" : "grid-cols-1"} gap-4`}
      >
        {week.map(({ day, date, fullDate }) => {
          const dayBookings = bookings.filter((booking) => {
            try {
              const startDate = new Date(booking.startDate);
              const endDate = new Date(booking.endDate);
              const dayDate = fullDate;

              if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                return false;
              }

              return (
                startDate.toDateString() === dayDate.toDateString() ||
                endDate.toDateString() === dayDate.toDateString() ||
                (startDate <= dayDate && endDate >= dayDate)
              );
            } catch {
              return false;
            }
          });

          return (
            <DayTile
              key={date}
              day={day}
              date={date}
              fullDate={fullDate}
              bookings={dayBookings}
              onBookingClick={onBookingClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WeekView;
