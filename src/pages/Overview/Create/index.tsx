import React, { FC } from "react";
import CardPage from '../component/CardPage'

const Create: FC = () => {
  return (
    <div className="site-card-wrapper">
        <CardPage apitype="is_creator"/>
    </div>
  );
};

export default Create;
