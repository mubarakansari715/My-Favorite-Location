const GOOGLE_MAP_API = "ENTER_YOUR_API";

export function getMapPreview(lat, long) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${long}&key=${GOOGLE_MAP_API}`;
  return imagePreviewUrl;
}

// Test function to verify API key
export async function testGoogleMapsAPI() {
  const testUrl = `https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=14&size=400x200&maptype=roadmap&key=${GOOGLE_MAP_API}`;

  try {
    const response = await fetch(testUrl);
    if (response.ok) {
      console.log("✅ Google Maps API is working correctly!");
      return true;
    } else {
      const errorText = await response.text();
      console.error("❌ Google Maps API Error:", response.status, errorText);
      return false;
    }
  } catch (error) {
    console.error("❌ Network error testing Google Maps API:", error);
    return false;
  }
}

/**
 * Geo Code API
 */

export async function getUserAddress(lat, long) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_MAP_API}`;
  const result = await fetch(url);
  if (!result.ok) {
    throw Error("Something want wrong with api!");
  }

  const data = await result.json();
  const address = data.results[0].formatted_address;
  return address;
}
