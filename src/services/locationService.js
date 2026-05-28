const HONGDAE_LOCATION = {
  latitude: 37.5572,
  longitude: 126.9245,
  locationName: "홍대입구",
  locationSource: "fallback",
};

export function getFallbackLocation() {
  return HONGDAE_LOCATION;
}

export function getCurrentLocation() {
  if (!("geolocation" in navigator)) {
    return Promise.resolve(HONGDAE_LOCATION);
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          locationName: "현재 위치",
          locationSource: "current",
        });
      },
      () => {
        resolve(HONGDAE_LOCATION);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000 * 60 * 10,
        timeout: 5000,
      }
    );
  });
}
