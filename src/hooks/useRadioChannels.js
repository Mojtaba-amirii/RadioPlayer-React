import { useState, useEffect } from "react";
import { getRadioPlayerData } from "../utils/api";

export function useRadioChannels() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getRadioPlayerData(signal)
      .then((data) => {
        setChannels(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  return { channels, loading, error };
}
