import { BarsOutlined, HeartOutlined, SmileOutlined } from '@ant-design/icons';
import React from 'react';
export default [
  {
    path: '/overview',
    name: '我的会议',
    icon: <SmileOutlined />,
    hideChildrenInMenu:true,
    redirect:'/overview/all',
    children: [
      {
        path: '/overview',
        name: '我的会议',
      },
      {
        path: '/overview/create',
        name: '我的会议',
      },
      {
        path: '/overview/join',
        name: '我的会议',
      },
    ],
  },
  {
    path: '/list',
    name: '会议模版',
    icon: <BarsOutlined />
  },
  {
    path: '/demo',
    name: '回收站',
    icon: <HeartOutlined />,
  },
];
