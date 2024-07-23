import React, { useState, useContext, useEffect } from 'react';
import { SermonContext } from '../components/GlobalState';
import { SettingOutlined } from '@ant-design/icons';
import { Layout, Typography, Row, Col, Select, Input, Button, Card } from 'antd';

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const fontSizes = ['1', '2', '3', '4', '5', '6', '7', '8'];
const fontFamilies = [
  'Arial',
  'Times New Roman',
  'Georgia',
  'Courier New',
  'Verdana',
  'Comic Sans MS',
  'Impact',
  'monospace'
];

const SettingsContent = () => {
  const { settings, updateSettings } = useContext(SermonContext);
  const [textSize, setTextSize] = useState(settings.textSize);
  const [textColor, setTextColor] = useState(settings.textColor);
  const [backgroundColor, setBackgroundColor] = useState(settings.backgroundColor);
  const [fontFamily, setFontFamily] = useState(settings.fontFamily);
  const [useImageBackground, setUseImageBackground] = useState(true);

  const handleReset = () => {
    setTextSize('1');
    setTextColor('#bfc7ca');
    setBackgroundColor('#171a1c');
    setFontFamily('monospace');
    setUseImageBackground(false);
  };

  useEffect(() => {
    const storedSettings = JSON.parse(localStorage.getItem('sermonSettings'));
    if (storedSettings) {
      setTextSize(storedSettings.textSize);
      setTextColor(storedSettings.textColor);
      setBackgroundColor(storedSettings.backgroundColor);
      setFontFamily(storedSettings.fontFamily);
      setUseImageBackground(storedSettings.useImageBackground);
    }
  }, []);

  useEffect(() => {
    const updatedSettings = { textSize, textColor, backgroundColor, fontFamily, useImageBackground };
    updateSettings(updatedSettings);
    localStorage.setItem('sermonSettings', JSON.stringify(updatedSettings));
  }, [textSize, textColor, backgroundColor, fontFamily, useImageBackground, updateSettings]);

  const toggleImageBackground = (e) => {
    setUseImageBackground(!useImageBackground);
    e.preventDefault();
  };

  return (
    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <Card title={<Title level={2}><SettingOutlined /> Settings</Title>} bordered={false}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Title level={5}>Text Size: {textSize}</Title>
                  <Select
                    style={{ width: '100%' }}
                    value={textSize}
                    onChange={(value) => setTextSize(value)}
                  >
                    {fontSizes.map((size) => (
                      <Option key={size} value={size}>{size}</Option>
                    ))}
                  </Select>
                </Col>
                <Col span={12}>
                  <Title level={5}>Text Color</Title>
                  <Input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    style={{ width: '100%', height: '32px' }}
                  />
                </Col>
                <Col span={12}>
                  <Title level={5}>Background Color</Title>
                  <Input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    style={{ width: '100%', height: '32px' }}
                  />
                </Col>
                <Col span={12}>
                  <Title level={5}>Font Family</Title>
                  <Select
                    style={{ width: '100%' }}
                    value={fontFamily}
                    onChange={(value) => setFontFamily(value)}
                  >
                    {fontFamilies.map((family) => (
                      <Option key={family} value={family}>{family}</Option>
                    ))}
                  </Select>
                </Col>
              </Row>
              <Button type="primary" onClick={handleReset} style={{ marginTop: '16px' }}>
                Reset to Default
              </Button>
              <Button type="default" onClick={toggleImageBackground} style={{ marginTop: '16px', marginLeft: '8px' }}>
                {useImageBackground ? 'Use Solid Background' : 'Use Image Background'}
              </Button>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Preview" bordered={false}>
                <div
                  style={{
                    width: '100%',
                    height: '200px',
                    overflow: 'auto',
                    padding: '20px',
                    backgroundColor: useImageBackground ? 'transparent' : backgroundColor,
                    // backgroundImage: useImageBackground ? 'url(./darker.jpg)' : 'none',
                    backgroundSize: 'cover',
                    color: textColor,
                    fontFamily: fontFamily,
                    fontSize: `${textSize}rem`,
                  }}
                >
                  This is a preview of your text settings. You can see how your choices affect the appearance of the text.
                  <br /><br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
                </div>
              </Card>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default SettingsContent;
