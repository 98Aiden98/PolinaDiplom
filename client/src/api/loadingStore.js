let count = 0;
const listeners = new Set();

function notify() {
  const isLoading = count > 0;
  listeners.forEach((listener) => listener(isLoading));
}

export function startLoading() {
  count += 1;
  notify();
}

export function stopLoading() {
  count = Math.max(0, count - 1);
  notify();
}

export function subscribe(listener) {
  listeners.add(listener);
  listener(count > 0);
  return () => listeners.delete(listener);
}

export function getSnapshot() {
  return count > 0;
}
