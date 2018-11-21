export function mapToStatus(number) {
  switch (number) {
    case 1:
      return '1';
    case 2:
      return '2';
    case 3:
      return '3';
    case 4:
      return '4';
    case 5:
      return '5';
    default:
      return 'invalid';
  }
}

export function dateToString(date) {
  if (date) return new Date(date).toString().substring(0, 15);
  return 'invalid date format';
}
