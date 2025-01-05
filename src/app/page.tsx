'use client'; // 如果你使用的是Next.js的App Router，需要添加这一行
import '@ant-design/v5-patch-for-react-19';

import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const HomePage: React.FC = () => {
  return (
    <div>
      <Button type="primary"
      onClick={() => {
        console.log('click');
      }}
      icon={<PlusOutlined />}>
        Primary Button
      </Button>
    </div>
  );
};

export default HomePage;
