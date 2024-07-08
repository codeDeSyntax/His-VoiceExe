import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const initialImages = [
  './gallery/eagle6.jpeg',
  './gallery/eagle1.jpeg',
  './gallery/eagle2.jpeg',
  './gallery/branham.jpeg',
  './gallery/eagle7.jpeg',
  './gallery/lamb1.jpeg',
  './gallery/moon1.jpeg',
  './gallery/splash.jpeg',
  './gallery/moon2.jpeg',
  './gallery/eagle5.jpeg',
  './gallery/lamb1.jpeg',
  './gallery/lamb.jpeg',
  './Bro bob.jpg',
  './gallery/moon2.jpeg',
  './gallery/lamb2.jpeg',
  './gallery/wmb.jpeg',
  './gallery/vog.jpeg',
  './gallery/hno.jpeg',
];

const VideosContent = () => {
  const [images, setImages] = useState(initialImages);
  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
    dragItem.current = position;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", e.target.id);
    e.target.style.opacity = '0.5';
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    e.preventDefault();
  };

  const drop = (e) => {
    e.preventDefault();
    const copyListItems = [...images];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setImages(copyListItems);
  };

  return (
    <div className="flex flex-wrap justify-center p-4 bg-background text-white min-h-screen">
      {images.map((src, index) => (
        <motion.div
          key={index}
          className="m-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.1, boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)' }}
          draggable
          onDragStart={(e) => dragStart(e, index)}
          onDragEnter={(e) => dragEnter(e, index)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnd={(e) => e.target.style.opacity = '1'}
          onDrop={drop}
        >
          <img
            src={src}
            alt={`Gallery item ${index + 1}`}
            className="w-[10rem] h-[18rem] object-cover rounded-lg shadow-lg cursor-move"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default VideosContent;