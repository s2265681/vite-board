import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import React, { FC, useEffect } from 'react';
import moment from 'moment';

const Overview: FC = () => {

  const hashChange=(eee:any)=>{
    console.log('1111');
    console.log(eee)
  }

  useEffect(()=>{
      // window.addEventListener('hashchange',hashChange)
  },[])

  return (
    <div>
       Create
    </div>
  );
};

export default Overview;
