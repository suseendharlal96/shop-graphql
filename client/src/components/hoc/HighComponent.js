import React, { useState, useEffect } from "react";

const onInterval = (Susee) => (Refresh) => (props) => {
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    setInterval(() => {
      tick();
    }, Refresh);
  }, [ticks]);

  const tick = () => {
    setTicks(ticks + 1);
  };

  return <Susee {...props} />;
};

export default onInterval;
