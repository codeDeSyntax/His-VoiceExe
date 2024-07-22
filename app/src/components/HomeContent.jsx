// app/renderer/components/HomeContent.jsx
import React from 'react';
import '../components/wave.css';

import { FaFish } from 'react-icons/fa';
const HomeContent = () => {
  return (
    <section>
      <div className="relative text-center text-white p-4 mt-[8rem] rounded">
        <h2 className="text-3xl mb-4 text-text font-serif italic font-medium">
          The Son of Man Recordings ...
        </h2>
        <p className="mb-4 text-textBlue text-2xl font-mono italic font-thin">
          1963 - 1970
        </p>
        <div className="w-[70%] flex flex-col items-center justify-center text-text m-auto gap-3">
          <p className="">
            And I saw another mighty angel come down from heaven, clothed with a
            cloud: and a rainbow was upon his head, and his face was as it were
            the sun, and his feet as pillars of fire:
          </p>

          <p className="">
            And he had in his hand a little book open: and he set his rightfoot
            upon the sea, and his left foot on the earth,
          </p>

          <p className="">
            And cried with a loud voice, as when a lion roareth: and when he had
            cried, seven thunders uttered their voices.
          </p>
        </div>

        <hr className="border-text mx-40 mt-20" />
        <p className="text-textBlue text-2xl">Rev 10:1-3</p>
      </div>

      <div className="air air1">
        <FaFish className="size-10 fish text-[pink]" />
      </div>
      <div className="air air2"></div>

      <div className="air air3"></div>
      <div className="air air4"></div>
    </section>
  );
};

export default HomeContent;
