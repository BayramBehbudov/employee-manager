export const formatPhoneNumber = (phoneNumber: string) => {
  const [main] = phoneNumber.split("x");
  const baseNumber = main.split(/x|ext|extension/i)[0];
  const digitsOnly = baseNumber.replace(/[^\d]/g, "");
  return `+${digitsOnly.trim()}`;
};
