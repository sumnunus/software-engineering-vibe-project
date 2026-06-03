const SEOUL_BUS_API_BASE = "http://ws.bus.go.kr/api/rest/stationinfo";

function getEndpointPath(path) {
  if (Array.isArray(path)) {
    return path.join("/");
  }

  return path;
}

export default async function handler(request, response) {
  const apiKey = process.env.SEOUL_BUS_API_KEY;
  const endpointPath = getEndpointPath(request.query.path);

  if (!apiKey) {
    response.status(500).json({
      error: "SEOUL_BUS_API_KEY is not configured.",
    });
    return;
  }

  if (!endpointPath) {
    response.status(400).json({
      error: "Bus API endpoint path is required.",
    });
    return;
  }

  const incomingUrl = new URL(request.url, `https://${request.headers.host}`);
  incomingUrl.searchParams.delete("path");

  const targetUrl = new URL(`${SEOUL_BUS_API_BASE}/${endpointPath}`);
  for (const [key, value] of incomingUrl.searchParams.entries()) {
    targetUrl.searchParams.append(key, value);
  }

  // Preserve the public-data service key as configured in the environment.
  const separator = targetUrl.search ? "&" : "?";
  const proxiedUrl = `${targetUrl.toString()}${separator}serviceKey=${apiKey}`;

  try {
    const apiResponse = await fetch(proxiedUrl);
    const body = await apiResponse.text();
    const contentType = apiResponse.headers.get("content-type") ?? "application/json";

    response.status(apiResponse.status);
    response.setHeader("Content-Type", contentType);
    response.send(body);
  } catch {
    response.status(502).json({
      error: "Seoul bus API request failed.",
    });
  }
}
