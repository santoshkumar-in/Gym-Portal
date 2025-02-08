import { useState, useEffect } from "react";

function useGeoLocation() {
  const [location, setLocation] = useState<string>("");
  const [error, setError] = useState<string>("");

  const refresh = () => {
    setLocation("");
    setError("");
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    function handleSuccess(position: GeolocationPosition) {
      const { latitude, longitude } = position.coords;
      setLocation(`${latitude}, ${longitude}`);
    }

    function handleError(error: GeolocationPositionError) {
      setError(error.message);
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { location, error, refresh };
}

export default useGeoLocation;
