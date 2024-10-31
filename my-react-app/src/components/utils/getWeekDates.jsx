import formatDateDashFormat from "./formatDateDashFormat";

export default function getWeekDates() {
  const date = Date.now();
  const dates = [];
  for (let i = 0; i < 7; i++) dates.push(formatDateDashFormat(i));
  return dates;
}
