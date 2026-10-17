export async function shopifyFetch({ query, variables = {} }) {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const endpoint = `https://${domain}/api/2026-01/graphql.json`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    console.error("Shopify API Errors:", errors);
    throw new Error("Failed to fetch API");
  }

  return data;
}
