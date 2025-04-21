import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useState, useRef, useEffect } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ImageGallery.css';

interface ImageGalleryProps {
  images: string[];
  descriptions: string[];
  title: string;
  isOpen: boolean;
  onClose: () => void;
  initialSlide?: number;
}

export const ImageGallery = ({
  images,
  descriptions,
  title,
  isOpen,
  onClose,
  initialSlide = 0,
}: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(initialSlide);
  const swiperRef = useRef<SwiperType>();

  useEffect(() => {
    setActiveIndex(initialSlide);
  }, [initialSlide]);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleDescriptionClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[99999]'>
      <button
        onClick={onClose}
        className='absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-[99999] p-4'
      >
        ×
      </button>
      <div className='w-full h-full flex items-center justify-center p-4'>
        <div className='w-full max-w-7xl h-[90vh] flex flex-col lg:flex-row items-center gap-6 lg:gap-8'>
          {/* 이미지 스와이퍼 */}
          <div className='w-full lg:w-3/5 h-[50vh] lg:h-full flex items-center justify-center relative'>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              initialSlide={initialSlide}
              onSlideChange={handleSlideChange}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              className='w-full h-full gallery-swiper'
            >
              {images.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className='!h-full flex items-center justify-center px-16'
                >
                  <div className='relative w-full h-full flex items-center justify-center p-8'>
                    <img
                      src={image}
                      alt={`${title} 스크린샷 ${index + 1}`}
                      className='max-w-[90%] max-h-[90%] w-auto h-auto object-contain select-none border border-gray-200/20 rounded-lg'
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* 설명 섹션 */}
          <div className='w-full lg:w-2/5 h-[40vh] lg:h-full overflow-y-auto flex flex-col text-white px-4 lg:pr-8 custom-scrollbar'>
            <div className='flex-1'>
              <h2 className='text-2xl lg:text-3xl font-bold mb-4'>{title}</h2>
              <div className='space-y-6'>
                {descriptions.map((description, index) => (
                  <div
                    key={index}
                    onClick={() => handleDescriptionClick(index)}
                    className={`transition-all duration-300 ${
                      index === activeIndex
                        ? 'opacity-100'
                        : 'opacity-50 hover:opacity-75'
                    } cursor-pointer hover:translate-x-2`}
                  >
                    <h3 className='text-lg font-semibold mb-2'>
                      이미지 {index + 1}
                    </h3>
                    <p className='text-gray-300 whitespace-pre-line leading-relaxed'>
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className='mt-4 text-sm text-gray-400'>
              * 설명을 클릭하면 해당 이미지로 이동합니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
