import { useEffect, useMemo, useRef } from "react";

export function useObjectUrl(file: File | null) {
  const url = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  const prev = useRef<string | null>(null);

  useEffect(() => {
    if (prev.current && prev.current !== url) URL.revokeObjectURL(prev.current);
    prev.current = url;
    return () => {
      if (prev.current) URL.revokeObjectURL(prev.current);
    };
  }, [url]);

  return url;
}
