/**
 *
 * @param {number} amount
 * @returns {string} number formatted as currency
 *
 * @example
 * formatCurrency(0)   => $0.00
 * formatCurrency(2.3) => $2.30
 *
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}
