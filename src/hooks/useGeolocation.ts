"use client";

import { useEffect, useRef, useState } from "react";

export interface GeoPosition {
  lat: number;
  lng: number;
  accuracy: number;
}

interface GeolocationState {
  position: GeoPosition | null;
  error: string | null;
  isLoading: boolean;
}

const UNSUPPORTED_STATE: GeolocationState = {
  position: null,
  error: "Location isn't supported on this device — showing a default area instead.",
  isLoading: false,
};

/**
 * Continuously tracks the browser's reported location via watchPosition
 * (not a one-shot lookup), so the "current location" marker updates if
 * the user actually moves. Always resolves to a usable state even when
 * permission is denied or the API is unavailable — callers fall back to
 * a default map center rather than being blocked.
 */
export function useGeolocation(): GeolocationState {
  const isSupported = typeof navigator !== "undefined" && !!navigator.geolocation;
  const [state, setState] = useState<GeolocationState>(() =>
    isSupported ? { position: null, error: null, isLoading: true } : UNSUPPORTED_STATE
  );
  const watchId = useRef<number | null>(null);

  useEffect(() => {
    if (!isSupported) return;

    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        setState({
          position: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          },
          error: null,
          isLoading: false,
        });
      },
      (err) => {
        setState((prev) => ({
          position: prev.position,
          error:
            err.code === err.PERMISSION_DENIED
              ? "Location access denied — showing a default area instead."
              : "Couldn't determine your location — showing a default area instead.",
          isLoading: false,
        }));
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );

    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, [isSupported]);

  return state;
}
