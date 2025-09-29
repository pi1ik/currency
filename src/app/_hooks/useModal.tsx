import React from "react";

export default function useModal() {
  const [isShowing, setIsShowing] = React.useState(false);

  const toggle = () => {
    console.log("toggle");
    console.log(!isShowing);
    setIsShowing(!isShowing);
  };

  return { isShowing, toggle };
}
