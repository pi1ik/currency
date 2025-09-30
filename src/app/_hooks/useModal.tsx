import React from "react";

export default function useModal() {
  const [isShowing, setIsShowing] = React.useState(false);

  const toggle = React.useCallback(() => {
    setIsShowing(!isShowing);
  }, [isShowing]);

  const isModalShowing = React.useMemo(() => isShowing, [isShowing]);

  return { isModalShowing, toggle };
}
