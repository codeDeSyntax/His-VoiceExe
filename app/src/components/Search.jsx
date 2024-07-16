import React, { useState, useContext } from 'react';
import { Input, Button, Drawer } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { SermonContext } from '../components/GlobalState';

const FloatingSearchIcon = ({ searchText }) => {
  const [visible, setVisible] = useState(false);
  const { searchTerm, setSearchTerm } = useContext(SermonContext);

  const handleSearch = (e) => {
    e.preventDefault();
    searchText(searchTerm);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        shape="circle"
        icon={<SearchOutlined />}
        size="large"
        style={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          zIndex: 1000,
        }}
        onClick={showDrawer}
      />

      <Drawer
        placement="top"
        closable={false}
        onClose={closeDrawer}
        visible={visible}
        height={80}
        bodyStyle={{ display: 'flex', alignItems: 'center', padding: '10px' }}
      >
        <form
          onSubmit={handleSearch}
          style={{ display: 'flex', alignItems: 'center', width: '100%' }}
        >
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            size="large"
            style={{ flex: 1, marginRight: 10 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<CloseOutlined />}
            size="large"
            onClick={closeDrawer}
          />
        </form>
      </Drawer>
    </div>
  );
};

export default FloatingSearchIcon;