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

const YearDrop = () => {
  const { setAllSermons } = useContext(SermonContext);

  const years = [
    '1964', '1965', '1966', '1967', '1968',
    '1969', '1970', '1971', '1972', '1973',
  ];

  useEffect(() => {
    setAllSermons(sermonCollection);
  }, [setAllSermons]);

  const filterByYear = (year) => {
    const yearFiltered = sermonCollection.filter((eachSermon) => 
      eachSermon.year === year
    );
    setAllSermons(yearFiltered);
  };

  const resetFilter = () => {
    setAllSermons(sermonCollection);
  };

  const items = [
    {
      key: 'years',
      label: (
        <div className="grid grid-cols-5 gap-1 w-80">
          {years.map((year) => (
            <Button
              key={year}
              onClick={() => filterByYear(year)}
              className="m-1"
            >
              {year}
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
      <Button className=' bg-lighter shadow-inner shadow-background border-none text-[white]'>
        <Space>
          Year
          <DownOutlined className='text-sm'/>
        </Space>
      </Button>
    </Dropdown>
  );
};

export default YearDrop;