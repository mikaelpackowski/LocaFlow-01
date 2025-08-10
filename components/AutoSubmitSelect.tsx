"use client";

import { useEffect, useRef } from "react";

export default function AutoSubmitSelect(
  props: React.SelectHTMLAttributes<HTMLSelectElement>
) {
  const ref = useRef<HTMLSelectElement>(null);
  const initialValueRef = useRef<string | number | readonly string | undefined>(props.defaultValue);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const handler = () => {
      // Ne soumet que si la valeur a réellement changé
      if (el.value !== String(initialValueRef.current ?? "")) {
        // Petite tempo pour éviter le double submit en StrictMode
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.form?.requestSubmit();
          // Mémorise la nouvelle valeur comme référence
          initialValueRef.current = el.value;
        });
      }
    };

    el.addEventListener("change", handler);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("change", handler);
    };
  }, []);

  return <select ref={ref} {...props} />;
}
