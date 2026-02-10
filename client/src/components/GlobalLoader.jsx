import { useSyncExternalStore } from 'react';
import { getSnapshot, subscribe } from '../api/loadingStore';

export default function GlobalLoader() {
  const isLoading = useSyncExternalStore(subscribe, getSnapshot);
  if (!isLoading) return null;
  return (
    <div className="loader-overlay" role="status" aria-live="polite">
      <div className="loader-spinner" />
    </div>
  );
}
