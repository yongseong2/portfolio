import { useState } from 'react';
import { BsZoomIn } from 'react-icons/bs';

interface ImageFullscreenProps {
  src: string;
  alt: string;
}

export const ImageFullscreen = ({ src, alt }: ImageFullscreenProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openFullscreen = () => {
    setIsFullscreen(true);
    // 스크롤 방지
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    // 스크롤 복원
    document.body.style.overflow = 'unset';
  };

  if (!isFullscreen) {
    return (
      <button
        onClick={openFullscreen}
        className='absolute top-3 right-12 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110'
        aria-label='이미지 전체보기'
      >
        <BsZoomIn className='w-5 h-5' />
      </button>
    );
  }

  return (
    <div
      className='fixed inset-0 bg-black z-[999999] flex items-center justify-center'
      onClick={closeFullscreen}
    >
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='relative w-full h-full'>
          <img
            src={src}
            alt={alt}
            className='absolute inset-0 w-full h-full object-contain'
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
      <button
        onClick={closeFullscreen}
        className='absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors p-4 z-10'
      >
        ×
      </button>
    </div>
  );
};
