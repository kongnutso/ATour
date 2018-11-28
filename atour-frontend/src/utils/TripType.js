export const UNBOOKEDTRIP = 0;
export const BOOKEDTRIP = 1;
export const PAIDTRIP = 2;
export const REJECTEDPAIDTRIP = 3;
export const APPROVETRIP = 4;
export const REFUNDREQUESTEDTRIP = 5;
export const REFUNDTRIP = 6;
export const FINISHEDTRIP = 7;
export const CANCELLEDTRIP = 8;

export function toStatus(number) {
  switch (number) {
    case 0:
      return "Unbooked";
    case 1:
      return "Booked";
    case 2:
      return "Paid";
    case 3:
      return "Rejected payment";
    case 4:
      return "Approved";
    case 5:
      return "Refund reqeusted";
    case 6:
      return "Refund trip";
    case 7:
      return "Finished trip";
    case 8:
      return "Canceled trip";
    default:
      return "Invalid";
  }
}
