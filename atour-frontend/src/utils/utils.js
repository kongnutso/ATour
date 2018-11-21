export function dateToString(date) {
  if (date) return new Date(date).toString().substring(0, 15);
  return 'invalid date format';
}
