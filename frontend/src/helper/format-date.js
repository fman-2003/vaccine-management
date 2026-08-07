export default function formatDate(date) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-UK", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
