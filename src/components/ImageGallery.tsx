import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useState, useRef, useEffect } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { BsZoomIn } from 'react-icons/bs';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ImageGallery.css';
import { Markdown } from './Markdown';
interface ProjectImage {
  url: string;
  description?: string;
  title?: string;
}

interface ImageGalleryProps {
  projectImages: ProjectImage[];
  title: string;
  isOpen: boolean;
  onClose: () => void;
  initialSlide?: number;
}

export const ImageGallery = ({
  projectImages,
  title,
  isOpen,
  onClose,
  initialSlide = 0,
}: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(initialSlide);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
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

  const openFullscreen = (imageUrl: string) => {
    setFullscreenImage(imageUrl);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
    document.body.style.overflow = 'unset';
  };

  if (!isOpen) return null;

  return (
    <>
      <div className='fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[99999]'>
        <div className='absolute top-4 left-4 text-sm text-gray-400'>
          * 내용을 클릭하면 해당 이미지로 이동합니다
        </div>
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
                {projectImages.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    className='!h-full flex items-center justify-center px-16'
                  >
                    <div className='relative w-full h-full flex items-center justify-center p-8 group'>
                      <img
                        src={image.url}
                        alt={`${title} 스크린샷 ${index + 1}`}
                        className='max-w-[90%] max-h-[90%] w-auto h-auto object-contain select-none border border-gray-200/20 rounded-lg'
                      />
                      <button
                        onClick={() => openFullscreen(image.url)}
                        className='absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110'
                        aria-label='이미지 전체보기'
                      >
                        <BsZoomIn className='w-5 h-5' />
                      </button>
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
                  {projectImages.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => handleDescriptionClick(index)}
                      className={`transition-all duration-300 ${
                        index === activeIndex
                          ? 'opacity-100'
                          : 'opacity-50 hover:opacity-75'
                      } cursor-pointer hover:translate-x-2`}
                    >
                      {image.title && (
                        <h3 className='inline-block text-lg font-semibold mb-2 px-3 py-1 bg-white/10 text-white rounded-md border border-white/20 hover:bg-white/20 transition-all'>
                          {image.title}
                        </h3>
                      )}
                      {image.description && (
                        <Markdown className='pl-2' white>
                          {image.description}
                        </Markdown>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 전체화면 모드 */}
      {fullscreenImage && (
        <div
          className='fixed inset-0 bg-black z-[999999] flex items-center justify-center'
          onClick={closeFullscreen}
        >
          <img
            src={fullscreenImage}
            alt='전체화면 이미지'
            className='max-w-screen max-h-screen object-contain'
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={closeFullscreen}
            className='absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors p-4'
          >
            ×
          </button>
        </div>
      )}
    </>
  );
};
