/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import {
  getViewsCount,
  incrementViewsCount,
} from '../../firebase/controlViewCount';

export function ViewCount() {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchDataIncrement() {
      try {
        const count = await getViewsCount();
        setViewCount(count);

        if (!sessionStorage.getItem('viewCountIncremented')) {
          await incrementViewsCount();
          sessionStorage.setItem('viewCountIncremented', 'true');
          setViewCount((prev) => (prev !== null ? prev + 1 : null));
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    }

    fetchDataIncrement();
  }, []);

  return (
    <h3
      css={{
        fontSize: '1rem',
      }}
    >
      방문자수: {viewCount !== null ? viewCount : '로딩중..'}
    </h3>
  );
}
