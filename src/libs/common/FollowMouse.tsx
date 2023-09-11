import React, { useState, useEffect } from 'react';

export function FollowMouse() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const updateMousePosition = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <img
      style={{
        position: 'fixed',
        top: `${position.y - 25}px `,
        left: `${position.x - 25}px`,
        width: '50px',
        height: '50px',
        zIndex: 10000,
        pointerEvents: 'none',
      }}
      src={`${process.env.PUBLIC_URL}/Image/mouse.gif`}
      alt='mouse'
    />
  );
}
