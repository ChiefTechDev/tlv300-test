import https from "https";
import querystring from "querystring";

// This function handles the API route request
export async function GET(request: { url: string | URL; }) {
  // Build the base URL and parameters
  let url = "https://www.whoisxmlapi.com/whoisserver/WhoisService?";

  // Extract query parameters from the request
  const { searchParams } = new URL(request.url);
  const domainName = searchParams.get("domainName") || "google.com"; // Default to google.com if not provided

  // Your API key
  const apiKey = process.env.NEXT_PUBLIC_WHOIS_API_KEY;

  // Parameters to be passed in the query string
  const parameters = {
    domainName: domainName,
    apiKey: apiKey,
    outputFormat: "json",
  };

  // Append query parameters to the URL
  url = url + querystring.stringify(parameters);

  // Return a promise that resolves when the HTTPS request is done
  return new Promise((resolve, reject) => {
    https
      .get(url, function (response) {
        const statusCode = response.statusCode;

        // Check if the response was successful
        if (statusCode !== 200) {
          resolve(
            new Response(
              JSON.stringify({
                error: `Request failed with status code ${statusCode}`,
              }),
              { status: statusCode }
            )
          );
          return;
        }

        let rawData = "";

        // Collect the response data
        response.on("data", (chunk) => {
          rawData += chunk;
        });

        // On response end, parse and send data back to client
        response.on("end", () => {
          try {
            const parsedData = JSON.parse(rawData);

            if (parsedData.WhoisRecord) {
              resolve(
                new Response(
                  JSON.stringify({
                    domainName: parsedData.WhoisRecord.domainName,
                    contactEmail: parsedData.WhoisRecord.contactEmail,
                  }),
                  { status: 200 }
                )
              );
            } else {
              resolve(
                new Response(JSON.stringify(parsedData), { status: 200 })
              );
            }
          } catch (error) {
            resolve(
              new Response(
                JSON.stringify({ error: "Error parsing response data" }),
                { status: 500 }
              )
            );
          }
        });
      })
      .on("error", (error) => {
        resolve(
          new Response(
            JSON.stringify({ error: `Request failed: ${error.message}` }),
            { status: 500 }
          )
        );
      });
  });
}

