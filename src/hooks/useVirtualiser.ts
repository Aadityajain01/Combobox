import { useState } from "react";

export function useVirtualizer<T>(items: T[], rowHeight = 32, overscan = 5) {
  const [scrollTop, setScrollTop] = useState(0);

  const start = Math.floor(scrollTop / rowHeight);
  const end = start + 20 + overscan;

  return {
    totalHeight: items.length * rowHeight,
    offset: start * rowHeight,
    visible: items.slice(start, end),
    onScroll: (e: React.UIEvent<HTMLDivElement>) =>
      setScrollTop(e.currentTarget.scrollTop)
  };
}
