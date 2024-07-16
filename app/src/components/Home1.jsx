import React, { useState, useContext,useEffect } from 'react';
import { SermonContext } from '../components/GlobalState';
import SolarSystem from './Stars';
import {
  BookOutlined,
} from '@ant-design/icons';
import { Layout, Button, theme, List, Typography } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

const Home1 = ({sermonTextRef}) => {
  const { allSermons, selectedSermon } = useContext(SermonContext);
  const { settings, updateSettings } = useContext(SermonContext);
  const [textSize, setTextSize] = useState(settings.textSize);
  const [textColor, setTextColor] = useState(settings.textColor);
  const [backgroundColor, setBackgroundColor] = useState(settings.backgroundColor);
  const [fontFamily, setFontFamily] = useState(settings.fontFamily);

  const handleReset = () => {
    setTextSize('1');
    setTextColor('#000000');
    setBackgroundColor('#ffffff');
    setFontFamily('monospace');
  };
  const sermonTextStyle = {
    fontSize: `${settings.textSize}rem`,
    fontFamily: `${settings.fontFamily}`, // Convert textSize to rem units
  };

  useEffect(() => {
    updateSettings({ textSize, textColor, backgroundColor, fontFamily });
  }, [textSize, textColor, backgroundColor, fontFamily, updateSettings]);



  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggle}
        width={310}
        collapsedWidth={80}
        title="Sermons"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          paddingTop: '1rem',
          borderRadius: '10px',
          marginTop: '3rem',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertica" />
        <List
          dataSource={allSermons}
          renderItem={(sermon, index) => (
            <List.Item
              key={index}
              style={{
                padding: 0,
                background: index % 2 === 0 ? '#3d4043' : '#303336',
              }}
            >
              <div className="w-full flex items-center justify-between group hover:cursor-pointer hover:bg-gray-800">
                <div className="p-2 flex flex-col items-center justify-center">
                  {collapsed ? (
                    <BookOutlined style={{ fontSize: '24px', color: '#fff' }} />
                  ) : (
                    <div className="flex flex-col items-start justify-start">
                      <Text style={{ fontSize: '0.8rem', color: '#fff' }}>{sermon.title}</Text>
                      <Text style={{ fontSize: '0.6rem', color: '#3eb7ee' }}>
                        {sermon.date}
                        {sermon.hasOwnProperty('type') ? ' - 🔊' : ''}
                      </Text>
                      <Text style={{ fontSize: '0.5rem', color: '#fff' }}>{sermon.location}</Text>
                    </div>
                  )}
                </div>
              </div>
            </List.Item>
          )}
        />
      </Sider>
      <Layout
        style={{
          paddingLeft: collapsed ? 80 : 310,
        }}
      >
        <Header
          style={{
            padding: 0,
            position: 'fixed',
            top: 40,
            width: '100%',
          }}
        >
          <Button
            type="primary"
            onClick={toggle}
            style={{
              marginBottom: 14,
              marginLeft: 16,
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </Header>
        <Content
          style={{
            // margin: '10rem 16px 0',
            overflow: 'initial',
          }}
        >
         <div className=" min-h-screen bg-background flex flex-col items-center justify-start sem">
      <h3 className="text-[1.5rem] font-mono font-semibold text-text text-center mt-28 ">
        {selectedSermon.title}
      </h3>
      <p className="font-mono text-text text-center">{selectedSermon.date}</p>
      <SolarSystem />
      {selectedSermon.hasOwnProperty('type') ? (
        <>
          <audio controls className="mt-6">
            <source src={selectedSermon.audioUrl} type="audio/mp4" />
            <p className="text-text font-mono">
              This sermon is in audio format
            </p>
          </audio>
          <a href={selectedSermon.audioUrl} className="text-[blue] italic">
            {selectedSermon.audioUrl}
          </a>
        </>
      ) : (
        <div
          ref={sermonTextRef} // Attach the ref to the sermon text div
          className=
          {`sermonText w-[100%] font-bold text-center ${!collapsed && 'text-left'} text-text break-words  font-mono `}
          style={{
            ...sermonTextStyle,
            fontFamily: `${settings.fontFamily}`,
            backgroundColor: `${settings.backgroundColor}`,
            color: `${settings.textColor}`,
          }}


        >
           🔊 {selectedSermon.sermon} 🔑

        </div>
      )}
    </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home1;
