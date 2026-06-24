import { useEffect, useState } from "react";

export default function useSmartSkeleton(minDelay = 150, slowExtra = 800) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const start = performance.now();

    const timer = setTimeout(() => {
      const duration = performance.now() - start;

      // ⭐ Als het laden traag is → skeleton langer tonen
      if (duration > 300) {
        setTimeout(() => setLoading(true), slowExtra);
      } else {
        setLoading(false);
      }
    }, minDelay);

    return () => clearTimeout(timer);
  }, [minDelay, slowExtra]);

  return loading;
}
