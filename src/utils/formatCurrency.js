export function formatCurrency(value, currency = "USD") {
  return new Intl.NumberFormat(getLocale(currency), {
    style: "currency",
    currency: currency,
  }).format(value);
}

function getLocale(currency) {
  const locales = {
    USD: "en-US",
    BRL: "pt-BR",
    EUR: "de-DE",
    GBP: "en-GB",
    JPY: "ja-JP",
    CAD: "en-CA",
    AUD: "en-AU",
  };
  return locales[currency] || "en-US";
}