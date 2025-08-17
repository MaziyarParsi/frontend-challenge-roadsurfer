import { useQuery } from "@tanstack/react-query";
import { getStations } from "../services/api";

export const useStations = () => {
  return useQuery({
    queryKey: ["stations"],
    queryFn: getStations,
    retry: 1,
  });
};
