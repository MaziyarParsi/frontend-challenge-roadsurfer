import { useState } from "react";
import useWeek from "../../hooks/useWeek";
import DayTile from "./DayTile";
import useMediaQuery from "../../hooks/useMediaQuery";
import Modal from "../Modal/Modal";
import BookingDetails from "../Modal/BookingDetails";
import type { Station } from "../../services/api";

interface Booking {
  id: string;
  startDate: string;
  endDate: string;
  pickupReturnStationId: string;
}

interface WeekViewProps {
  selectedStation: Station;
  stations: Station[];
  onBookingClick?: (booking: Booking) => void;
}

const WeekView = ({
  selectedStation,
  stations,
  onBookingClick,
}: WeekViewProps) => {
  const { week, nextWeek, prevWeek } = useWeek();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    onBookingClick?.(booking);
  };

  const closeModal = () => {
    setSelectedBooking(null);
  };

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
              const startDate = new Date(
                new Date(booking.startDate).toDateString()
              );
              const endDate = new Date(
                new Date(booking.endDate).toDateString()
              );
              const dayDate = new Date(fullDate.toDateString());

              if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                return false;
              }

              return dayDate >= startDate && dayDate <= endDate;
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
              onBookingClick={handleBookingClick}
            />
          );
        })}
      </div>
      {selectedBooking && (
        <Modal isOpen={!!selectedBooking} onClose={closeModal}>
          <BookingDetails
            bookingId={selectedBooking.id}
            stationId={selectedStation.id}
            stations={stations}
            onClose={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default WeekView;
