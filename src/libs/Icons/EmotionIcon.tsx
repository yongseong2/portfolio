import React from 'react';

const EmotionIcon = () => {
  return (
    <div>
      <img
        width={'100px'}
        height={'100px'}
        src={`${process.env.PUBLIC_URL}/Image/EmotionIcon.png`}
        alt='emotion'
      />
    </div>
  );
};

export default EmotionIcon;
