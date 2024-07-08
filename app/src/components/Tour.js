// TourComponent.js
import React from 'react';
import Joyride from 'react-joyride';

const TourComponent = ({ runTour, setRunTour }) => {
  const steps = [
    {
      target: '#Sermons1',
      content:
        'This Opens a random Sermon from The Prophet of God. A second click will open the side bar for  sermon selection',
    },
    {
      target: '#Sermons',
      content:
        'This Opens a random Sermon from The Prophet of God. A second click will open the side bar for  sermon selection',
    },
    {
      target: '#year',
      content: 'filter sermons by from dropdown',
    },
    {
      target: '#title',
      content: 'filter sermons by title from dropdown',
    },
    {
      target: '#sort',
      content: 'filter sermons by title from dropdown',
    },
    {
      target: '#search',
      content: 'Search a phrase within the current sermon',
    },
    {
      target: '#media',
      content: 'See a view images and videos of the Prophet of God',
    },

    {
      target: '#settings',
      content:
        'Change the font size, font family, background color and text color of the sermon text',
    },
    {
      target: '#home',
      content: 'back to home',
    },
  ];

  return (
    <Joyride
      styles={{
        options: {
          arrowColor: '#fafafa',
          backgroundColor: '#fafafa',
          overlayColor: 'rgba(79, 26, 0, 0.4)',
          primaryColor: '#40aae2',
        },
      }}
      steps={steps}
      run={runTour}
      continuous
      scrollToFirstStep
      showSkipButton
      callback={(data) => {
        const { status } = data;
        if (status === 'finished' || status === 'skipped') {
          setRunTour(false);
        }
      }}
    />
  );
};

export default TourComponent;
