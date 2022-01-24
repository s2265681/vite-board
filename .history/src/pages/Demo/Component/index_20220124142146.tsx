import React, { FC } from "react";
import useCountDown from "hooks/useCountDown";
const Component: FC = () => {
  const timer = useCountDown(10);
  return <div>demo组件</div>;
};

export default Component;
