import axios from "axios";

const expandUrl = async (shortUrl) => {
  try {
    const response = await axios.get(shortUrl, {
      maxRedirects: 5, // Follows redirects
    });
    return response.request.res.responseUrl; // Get final redirected URL
  } catch (error) {
    console.error(`Error expanding URL ${shortUrl}:`, error.message);
    return null;
  }
};

const extractCoordinates = (googleMapsUrl) => {
  const match = googleMapsUrl.match(/@([-.\d]+),([-.\d]+)/);
  return match ? { lat: parseFloat(match[1]), lng: parseFloat(match[2]) } : null;
};

export const getCoordinatesFromShortUrl = async (shortUrl) => {
  const expandedUrl = await expandUrl(shortUrl);
  return expandedUrl ? extractCoordinates(expandedUrl) : null;
};
