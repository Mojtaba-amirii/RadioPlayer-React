import { useState, useEffect } from "react";
import { getRadioPlayerData } from "../utils/api";

export function useRadioChannels() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getRadioPlayerData()
      .then((data) => {
        if (isMounted) {
          setChannels(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { channels, loading, error };
}
