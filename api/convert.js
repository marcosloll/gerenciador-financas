const ALLOWED_CURRENCIES = new Set([
  "USD",
  "BRL",
  "EUR",
  "GBP",
  "JPY",
  "CAD",
  "AUD",
]);

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const from = String(request.query.from || "").toUpperCase();
  const to = String(request.query.to || "").toUpperCase();
  const amount = Number(request.query.amount);

  if (
    !ALLOWED_CURRENCIES.has(from) ||
    !ALLOWED_CURRENCIES.has(to) ||
    !Number.isFinite(amount) ||
    amount <= 0 ||
    amount > 1_000_000_000
  ) {
    return response.status(400).json({ error: "Invalid conversion data." });
  }

  const apiKey =
    process.env.EXCHANGE_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ error: "Exchange service unavailable." });
  }

  try {
    const endpoint = new URL(
      `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`,
    );
    const apiResponse = await fetch(endpoint, {
      headers: { Accept: "application/json" },
    });
    const data = await apiResponse.json();

    if (!apiResponse.ok || data.result === "error") {
      return response.status(502).json({ error: "Exchange provider error." });
    }

    response.setHeader("Cache-Control", "no-store");
    return response.status(200).json({
      conversionResult: data.conversion_result,
    });
  } catch {
    return response.status(502).json({ error: "Exchange provider unavailable." });
  }
}
