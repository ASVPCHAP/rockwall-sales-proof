const usdFull = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export function usd(value: number) {
  return usdFull.format(value);
}

export function usdCompact(value: number) {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    const digits = millions >= 10 ? 1 : 1;
    const formatted = millions.toFixed(digits).replace(/\.0$/, "");
    return `$${formatted}M`;
  }
  if (value >= 1_000) {
    return `$${Math.round(value / 1_000)}k`;
  }
  return usd(value);
}
