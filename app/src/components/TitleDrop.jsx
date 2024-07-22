import React, { useContext, useEffect } from 'react';
import { Dropdown, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { SermonContext } from './GlobalState';
import earlySermons from '../sermons/1964-1969/firstset';
import secondSet from '../sermons/1970/1970';
import thirdSet from '../sermons/1971/1971';
import fourthSet from '../sermons/1972/1972';
import lastSet from '../sermons/1973/1973';
import audioSermons from '../sermons/audio';

const sermonCollection = [
  ...earlySermons,
  ...secondSet,
  ...thirdSet,
  ...fourthSet,
  ...lastSet,
  ...audioSermons
];

const TitleDrop = () => {
  const { setAllSermons } = useContext(SermonContext);

  useEffect(() => {
    setAllSermons(sermonCollection);
  }, [setAllSermons]);

  const filterByTitle = (letter) => {
    const titleFiltered = sermonCollection.filter((eachSermon) => 
      eachSermon.title.toLowerCase().startsWith(letter.toLowerCase())
    );
    setAllSermons(titleFiltered);
  };

  const resetFilter = () => {
    setAllSermons(sermonCollection);
  };

  const items = [
    {
      key: 'alphabet',
      label: (
        <div className="grid grid-cols-5 gap-1 w-80">
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
            <Button
              key={letter}
              onClick={() => filterByTitle(letter)}
              className="m-1"
            >
              {letter}
            </Button>
          ))}
          <Button
            className="col-span-5 m-1"
            onClick={resetFilter}
          >
            Reset
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      placement="bottomLeft"
    >
      <Button className='bg-background '>
        <Space>
          Title
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default TitleDrop;