exports.handler = async (event) => {
    // Handle OPTIONS preflight request
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "https://samnexudus.github.io", // Replace with your exact domain
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            body: "",
        };
    }

    // Handle POST request (the actual feedback submission)
    if (event.httpMethod === "POST") {
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
                    "Access-Control-Allow-Origin": "https://samnexudus.github.io", // Replace with your exact domain
                },
                body: JSON.stringify({ message: "Feedback sent successfully!" }),
            };

        } catch (error) {
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "https://samnexudus.github.io", // Replace with your exact domain
                },
                body: JSON.stringify({ error: error.message }),
            };
        }
    }

    // If the method is not POST or OPTIONS, return a 405 error
    return {
        statusCode: 405,
        headers: {
            "Access-Control-Allow-Origin": "https://samnexudus.github.io", // Replace with your exact domain
        },
        body: JSON.stringify({ error: "Method Not Allowed" }),
    };
};
