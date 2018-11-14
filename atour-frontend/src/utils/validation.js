export function validateUsername(username) {
  if (!username || username.length < 6) {
    return "Username must be ...";
  }
  return false;
}

export function validatePassword(password) {
  if (!password || password.length < 6) {
    return "Password length must more than 6";
  }
  return false;
}

export function validateEmail(email) {
  if (!email || !emailRegex.test(email)) {
    return "Please enter email in the correct format";
  }
  return false;
}

export function validateSID(sid) {
  if (!sid || !SID(sid)) {
    return "Invalid Personnal ID";
  }
  return false;
}

export function validateBirthDate(birthDate) {
  if (birthDate) {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const currentDate = new Date(year, month, day);
    const inputDate = new Date(
      birthDate.substring(0, 4),
      birthDate.substring(5, 7) - 1,
      birthDate.substring(8, 10)
    );
    if (currentDate - inputDate < 567993600000) {
      return "your age must higher than 12";
    }
  }

  return false;
}

export function validatePhone(phone) {
  if (!phone || (phone.length !== 10 || isNaN(phone))) {
    return "Invalid Phone number";
  }
  return false;
}

export function validateAddress(address) {
  if (!address || address.length < 20) {
    return "Address length must more than 20";
  }
  return false;
}

export function validateName(name) {
  if (!name || name.length < 5) {
    return "Name must ...";
  }
  return false;
}

export function validateBankAccountName(bankAccountName) {
  if (!bankAccountName || bankAccountName.length < 5) {
    return "Bank Account Name must ...";
  }
  return false;
}

export function validateBankAccountNumber(bankAccountNumber) {
  if (
    !bankAccountNumber ||
    bankAccountNumber.length !== 7 ||
    isNaN(bankAccountNumber)
  ) {
    return "Bank Account Number must ...";
  }
  return false;
}

export function validateTourName(tourName) {
  if (!tourName || tourName.length > 50) {
    return "Tour name must ...";
  }
  return false;
}

export function validateMinGroupSize(minGroupSize) {
  let regex = /^(\$|)([1-9]\d{0,2}(\,\d{3})*|([1-9]\d*))(\.\d{2})?$/;
  let passed = minGroupSize.match(regex);
  if (passed == null || minGroupSize.length > 50 || isNaN(minGroupSize)) {
    return "minimum group size must ...";
  }
  return false;
}

export function validateMaxGroupSize(minGroupSize, maxGroupSize) {
  let regex = /^(\$|)([1-9]\d{0,2}(\,\d{3})*|([1-9]\d*))(\.\d{2})?$/;
  let passed = maxGroupSize.match(regex);
  if (
    passed == null ||
    maxGroupSize.length > 50 ||
    isNaN(minGroupSize) ||
    isNaN(maxGroupSize) ||
    parseInt(minGroupSize) > parseInt(maxGroupSize)
  ) {
    return "maximum group size must ...";
  }
  return false;
}

// export function validateMaxGroupSize(maxGroupSize) {
//   let regex = /^(\$|)([1-9]\d{0,2}(\,\d{3})*|([1-9]\d*))(\.\d{2})?$/;
//   let passed = price.match(regex);
//   if (!price || price.length > 50 || isNaN(price)) {
//     return "price must ...";
//   }
//   return false;
// }

const emailRegex = /\w+@\w+\.\w+/;

function SID(sid) {
  if (sid.length !== 13) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += parseFloat(sid.charAt(i)) * (13 - i);
  if ((11 - (sum % 11)) % 10 !== parseFloat(sid.charAt(12))) return false;
  return true;
}

export function validatePrice(price) {
  let regex = /^(\$|)([1-9]\d{0,2}(\,\d{3})*|([1-9]\d*))(\.\d{2})?$/;
  let passed = price.match(regex);
  if (passed == null || price.length > 50 || isNaN(price)) {
    return "price must ...";
  }
  return false;
}

export function validateDetail(detail) {
  if (!detail || detail.length < 5 || detail.length > 500) {
    return "Detail must ...";
  }
  return false;
}
