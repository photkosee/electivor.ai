"use client";

import { useEffect, useState } from "react";

const useStreamText = (text: string) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => index + 1);
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, []);

  return text.slice(0, index);
}

export default useStreamText
