import React, { FC } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import cx from "classnames";

interface Iprops {
  show: Boolean;
  children?:React.ReactElement|null,
  size?: Number;
  className?: String;
  isTeamind?: Boolean;
}

let styleSty:any = {
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    display:"flex",
    justifyContent: "center",
    alignItems: "center"
}

const Loading: FC<Iprops> = ({
  show,
  children,
  size = 40,
  className = "",
  isTeamind,
}) => {
  if (isTeamind) {
    return show ? (
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          background: "#eef2f8",
          zIndex: 1034,
        }}
      >
        <div
          className="main__loading"
          style={{
            width: 240,
            height: 85,
            background: `url(https://teamind-static-oss.teamind.co/meeting/home/logo-preview.svg)`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    ) : (
      children || null
    );
  }
  const spinIcon = <LoadingOutlined style={{ fontSize: size }} spin />;
  return show ? (
       <Spin style={{...styleSty}} className={cx(className, "main__loading")} indicator={spinIcon} />
  ) : (
    children || null
  );
};

export default Loading;
