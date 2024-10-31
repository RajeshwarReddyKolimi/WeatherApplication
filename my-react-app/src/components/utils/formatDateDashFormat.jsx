export default function formatDateDashFormat(i) {
  const curDate = new Date(Date.now() - i * 86400000);
  const day = String(curDate.getDate()).padStart(2, "0");
  const month = String(curDate.getMonth() + 1).padStart(2, "0");
  const year = curDate.getFullYear();
  return `${year}-${month}-${day}`;
}
