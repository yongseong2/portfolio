/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import {
  getViewsCount,
  incrementViewsCount,
} from '../../firebase/controlViewCount';

export function ViewCount() {
  const [viewCount, setViewCount] = useState<number | null>(null);
  useEffect(() => {
    async function fetchDataAndUpdate() {
      try {
        const count = await getViewsCount();
        setViewCount(count);

        // 세션 스토리지를 확인하여 이전에 페이지를 방문한 적이 없으면 조회수를 증가
        if (!sessionStorage.getItem('viewCountIncremented')) {
          await incrementViewsCount();
          sessionStorage.setItem('viewCountIncremented', 'true');
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    }

    fetchDataAndUpdate();
  }, []);
  return (
    <h3
      css={{
        fontSize: '1rem',
      }}
    >
      방문자수: {viewCount !== null ? viewCount : 'Loading...'}
    </h3>
  );
}
