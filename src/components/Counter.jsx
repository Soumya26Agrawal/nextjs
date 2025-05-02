"use client";
// use client component for client side rendering
import React, { use } from "react";

function Counter() {
  const [counter, setCounter] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return <div>{counter}</div>;
}

export default Counter;
