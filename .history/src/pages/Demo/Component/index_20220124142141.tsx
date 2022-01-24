import React, { FC } from "react";
import useCountDown from "hooks/useCountDown";
const Component: FC = () => {
  const timer = useCountDown();
  return <div>demo组件</div>;
};

export default Component;
