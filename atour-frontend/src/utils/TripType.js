export const UNBOOKEDTRIP = 0;
export const BOOKEDTRIP = 1;
export const PAIDTRIP = 2;
export const APPROVETRIP = 3;
export const REFUNDREQUESTEDTRIP = 4;
export const REFUNDTRIP = 5;
export const FINISHEDTRIP = 6;
export const CANCELLEDTRIP = 7;

export function toStatus(number) {
  switch (number) {
    case 0:
      return 'Unbooked';
    case 1:
      return 'Booked';
    case 2:
      return 'Paid';
    case 3:
      return 'Approved';
    case 4:
      return 'Refund reqeusted';
    case 5:
      return 'Refund trip';
    case 6:
      return 'Finished trip';
    case 7:
      return 'Canceled trip';
  }
}
