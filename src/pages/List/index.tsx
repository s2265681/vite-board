import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import React, { FC, useEffect } from 'react';
import moment from 'moment';
import {message} from 'antd'

const Overview: FC = () => {
  useEffect(()=>{
    console.log('111')
    message.info('This is a normal message');
  },[])

  return (
    <div>
       List
    </div>
  );
};

export default Overview;
