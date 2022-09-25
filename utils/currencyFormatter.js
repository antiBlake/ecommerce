export function formatCurrency(num) {
  const dollars = new Intl.NumberFormat(`en-US`, {
    currency: "EUR",
    style: "currency",
  }).format(num);

  return dollars;
}
