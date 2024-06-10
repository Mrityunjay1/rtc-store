export const formatAsRupee = (price: string | number): string => {
  const rupeeAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(Number(price));
  return rupeeAmount;
};
