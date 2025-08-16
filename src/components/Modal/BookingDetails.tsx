import { useEffect, useState } from "react";
import { getBookingDetails } from "../../services/api";

interface Station {
  id: string;
  name: string;
}

interface BookingDetailsProps {
  bookingId: string;
  stationId: string;
  stations: Station[];
  onClose: () => void;
}

interface BookingDetailsData {
  customerName: string;
  startDate: string;
  endDate: string;
  pickupReturnStationId: string;
}

const BookingDetails = ({
  bookingId,
  stationId,
  stations,
  onClose,
}: BookingDetailsProps) => {
  const [bookingDetails, setBookingDetails] =
    useState<BookingDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        const data = await getBookingDetails(stationId, bookingId);
        setBookingDetails(data);
      } catch (err) {
        setError("Failed to fetch booking details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId, stationId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!bookingDetails) {
    return <div>No booking details found.</div>;
  }

  const startDate = new Date(bookingDetails.startDate);
  const endDate = new Date(bookingDetails.endDate);
  const duration = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const stationName =
    stations.find((s) => s.id === bookingDetails.pickupReturnStationId)?.name ||
    "Unknown Station";

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Booking Details</h2>
      <p>
        <strong>Customer Name:</strong> {bookingDetails.customerName}
      </p>
      <p>
        <strong>Start Date:</strong> {startDate.toLocaleDateString()}
      </p>
      <p>
        <strong>End Date:</strong> {endDate.toLocaleDateString()}
      </p>
      <p>
        <strong>Duration:</strong> {duration} days
      </p>
      <p>
        <strong>Pickup/Return Station:</strong> {stationName}
      </p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Back to Calendar
      </button>
    </div>
  );
};

export default BookingDetails;
