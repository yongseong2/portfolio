import { FaPlay, FaStop } from 'react-icons/fa';
import { usePlayingStore } from '../store/usePlaying';

export const PlayingButton = () => {
  const { isPlaying, setIsPlaying } = usePlayingStore();
  return (
    <button
      onClick={() => setIsPlaying(!isPlaying)}
      className='absolute top-4 right-4 z-50 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors text-white shadow-lg'
    >
      {isPlaying ? <FaStop size={14} /> : <FaPlay size={14} />}
    </button>
  );
};
