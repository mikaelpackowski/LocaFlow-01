"use client";

import { useEffect, useRef } from "react";

export default function AutoSubmitSelect(
  props: React.SelectHTMLAttributes<HTMLSelectElement>
) {
  const ref = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = () => el.form?.requestSubmit();
    el.addEventListener("change", handler);
    return () => el.removeEventListener("change", handler);
  }, []);

  return <select ref={ref} {...props} />;
}
