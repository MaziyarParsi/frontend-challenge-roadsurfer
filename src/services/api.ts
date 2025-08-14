import axios from "axios";

const API_URL = "https://605c94c36d85de00170da8b4.mockapi.io/stations";

export const getStations = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};
