'use client';

import { useSyncExternalStore } from 'react';

const BUILD_TIME = new Date(process.env.NEXT_PUBLIC_BUILD_TIME ?? 0);
let clientNow: Date | undefined;

const subscribe = () => () => {};
const getSnapshot = () => (clientNow ??= new Date());
const getServerSnapshot = () => BUILD_TIME;

// Prerendered HTML is built with the build date; hydration reuses it to avoid a mismatch,
// then React re-renders with the real date so durations don't go stale between deploys.
export const useNow = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
