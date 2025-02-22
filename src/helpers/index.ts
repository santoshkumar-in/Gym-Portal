export const truncateString = (
  str: string | undefined | null,
  maxLength: number = 10,
): string => {
  if (!str) return "";
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isPastDay = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

export const getRecurringEvents = (date: Date) => {
  // const recurringCalenderSettings = {
  //   weekly: {
  //     0: { willOpen: false },
  //     1: {
  //       willOpen: true,
  //       timings: [
  //         ["05:30", "10:00"],
  //         ["17:30", "22:00"],
  //       ],
  //     },
  //     2: {
  //       willOpen: true,
  //       timings: [
  //         ["05:30", "10:00"],
  //         ["17:30", "22:00"],
  //       ],
  //     },
  //     3: {
  //       willOpen: true,
  //       timings: [
  //         ["05:30", "10:00"],
  //         ["17:30", "22:00"],
  //       ],
  //     },
  //     4: {
  //       willOpen: true,
  //       timings: [
  //         ["05:30", "10:00"],
  //         ["17:30", "22:00"],
  //       ],
  //     },
  //     5: {
  //       willOpen: true,
  //       timings: [
  //         ["05:30", "10:00"],
  //         ["17:30", "22:00"],
  //       ],
  //     },
  //     6: {
  //       willOpen: true,
  //       timings: [
  //         ["05:30", "10:00"],
  //         ["17:30", "22:00"],
  //       ],
  //     },
  //   },
  //   monthly: {
  //     15: {
  //       willOpen: false,
  //     },
  //     30: {
  //       willOpen: false,
  //     },
  //   },
  // };
  // const days = getDaysInMonth(date.getFullYear(), date.getMonth());
};
