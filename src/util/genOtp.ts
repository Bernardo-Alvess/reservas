export function genOtp() {
  const randomNumber = Math.floor(Math.random() * 1000000);
  const sixDigitNumber = String(randomNumber).padStart(6, "0");
  return sixDigitNumber;
}
