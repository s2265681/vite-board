import React, { FC } from "react";
import CardPage from '../component/CardPage'

const Overview: FC = () => {
  return (
    <div className="site-card-wrapper">
        <CardPage apitype="all"/>
    </div>
  );
};

export default Overview;
