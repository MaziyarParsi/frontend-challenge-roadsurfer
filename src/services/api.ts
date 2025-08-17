import { fetchHandler } from "../utils/fetchHandler";

const API_URL = "https://605c94c36d85de00170da8b4.mockapi.io/stations";

export type Station = {
  id: string;
  name: string;
  bookings: Array<{
    id: string;
    startDate: string;
    endDate: string;
    pickupReturnStationId: string;
    customerName: string;
  }>;
};

export const getStations = () => {
  return fetchHandler<Station[]>(API_URL);
};

export const getBookingDetails = (stationId: string, bookingId: string) => {
  return fetchHandler<Station["bookings"][0]>(
    `${API_URL}/${stationId}/bookings/${bookingId}`
  );
};
