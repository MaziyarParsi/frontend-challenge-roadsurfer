import { useState, useMemo } from "react";
import { startOfWeek, addDays, subDays, format } from "date-fns";

const useWeek = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const week = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    return Array.from({ length: 7 }).map((_, i) => {
      const day = addDays(start, i);
      return {
        day: format(day, "EEE"),
        date: format(day, "dd"),
        fullDate: day,
      };
    });
  }, [currentDate]);

  const nextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const prevWeek = () => {
    setCurrentDate(subDays(currentDate, 7));
  };

  return { week, nextWeek, prevWeek };
};

export default useWeek;
