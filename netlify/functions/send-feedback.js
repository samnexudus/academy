exports.handler = async (event) => {
    // Handle OPTIONS preflight request
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Allow all origins (or specify your GitHub Pages URL for security)
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            body: "",
        };
    }

    // Handle POST request (the actual feedback submission)
    try {
        const data = JSON.parse(event.body);

        // Webhook URL
        const webhookURL = "https://hooks.airtable.com/workflows/v1/genericWebhook/appdInia1qyUjAidC/wfl7NhRg3j8GZ83cq/wtrqlYKwEyA9yu68K";

        const response = await fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Webhook request failed with status ${response.status}`);
        }

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Allow all origins (or specify your GitHub Pages URL for security)
            },
            body: JSON.stringify({ message: "Feedback sent successfully!" }),
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ error: error.message }),
        };
    }
};
