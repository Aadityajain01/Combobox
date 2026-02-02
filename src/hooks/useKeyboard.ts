import { useState } from "react";

export function useKeyboard(max: number) {
  const [focused, setFocused] = useState(0);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown")
      setFocused(f => Math.min(f + 1, max - 1));

    if (e.key === "ArrowUp")
      setFocused(f => Math.max(f - 1, 0));
  }

  return {
    focused,
    onKeyDown
  };
}
