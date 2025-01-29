export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const webhookURL = "https://hooks.airtable.com/workflows/v1/genericWebhook/appdInia1qyUjAidC/wfl7NhRg3j8GZ83cq/wtrqlYKwEyA9yu68K";

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: event.body,
    });

    const responseData = await response.json();
    return {
      statusCode: response.status,
      body: JSON.stringify(responseData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send data" }),
    };
  }
}
