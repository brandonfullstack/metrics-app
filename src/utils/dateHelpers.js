import { getDay, subDays } from 'date-fns';

export const today = new Date();
export const lastWeekday = getDay(today) === 0 // Sunday
  ? subDays(today, 2)
  : getDay(today) === 6 // Saturday
    ? subDays(today, 1)
    : today; // Any other day (no change)