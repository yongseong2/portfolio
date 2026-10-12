import { useEffect, useSyncExternalStore } from 'react';

const PDF_FILE_NAME = '김성용_프론트엔드_포트폴리오';
const IMAGE_TIMEOUT_MS = 10000;

let preparing = false;
const listeners = new Set<() => void>();

const setPreparing = (value: boolean) => {
  preparing = value;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const usePrintPreparing = () => useSyncExternalStore(subscribe, () => preparing);

// Lazy images that were never scrolled into view (or are print-only) would otherwise print blank.
const loadAllImages = () => {
  const images = Array.from(document.images);
  images.forEach((image) => {
    if (image.loading === 'lazy') image.loading = 'eager';
  });

  const pending = images
    .filter((image) => !image.complete)
    .map(
      (image) =>
        new Promise<void>((resolve) => {
          image.addEventListener('load', () => resolve(), { once: true });
          image.addEventListener('error', () => resolve(), { once: true });
        })
    );

  return Promise.race([
    Promise.all(pending),
    new Promise((resolve) => window.setTimeout(resolve, IMAGE_TIMEOUT_MS)),
  ]);
};

export const printPortfolio = async () => {
  if (preparing) return;

  setPreparing(true);
  try {
    await Promise.all([loadAllImages(), document.fonts.ready]);
  } finally {
    setPreparing(false);
  }

  const originalTitle = document.title;
  const restoreTitle = () => {
    document.title = originalTitle;
    window.removeEventListener('afterprint', restoreTitle);
  };

  // Chrome·Safari use document.title as the default PDF file name.
  document.title = PDF_FILE_NAME;
  window.addEventListener('afterprint', restoreTitle);
  window.print();
};

export const usePrintShortcut = () => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'p') {
        event.preventDefault();
        void printPortfolio();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
};
