const SendRequest = async ({ url, method = "GET", data = null, headers = {}, }) => {
    try {
        const isFormData = data instanceof FormData;

        const requestHeaders = {
            ...headers,
        };

        if (!isFormData && data !== null) {
            requestHeaders["Content-Type"] = "application/json";
        }

        const response = await fetch(url, {
            method,
            headers: requestHeaders,
            credentials: "include",
            body: data ? isFormData ? data : JSON.stringify(data) : undefined,
        });

        let result;

        const contentType = response.headers.get("content-type");

        if (contentType?.includes("application/json")) {
            result = await response.json();
        } else {
            result = await response.text();
        }

        // return typeof result === "object" ? result : { data: result };
        return result;

    } catch (error) {
        console.error("API Request Error:", error);

        return {
            flag: false,
            status: null,
            message: "Failed to connect to the server",
            error: error.message,
        };
    }
};

export default SendRequest;