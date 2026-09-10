const numberFormatter = new Intl.NumberFormat("uk-UA");
const moneyFormatter = new Intl.NumberFormat("uk-UA", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatNumber(value: number) {
  return numberFormatter.format(value);
}

export function formatMoney(value: number, currency = "UAH") {
  return `${currency} ${moneyFormatter.format(value)}`;
}
