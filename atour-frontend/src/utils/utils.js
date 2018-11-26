export function dateToString(date) {
  if (date) return new Date(date).toString().substring(0, 15);
  return "invalid date format";
}

export const API_ENDPOINT = process.env.API_ENDPOINT || "35.198.215.185:3000";
