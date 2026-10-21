/* A tiny shared-state helper for widgets whose parts sit in different places on a page
   (e.g. a chart and its detail box). Each widget module creates its own small store. */
import { useSyncExternalStore } from "react";

export function createStore<T>(initial: T) {
  let value = initial;
  const subs = new Set<() => void>();
  const get = () => value;
  const set = (next: T | ((v: T) => T)) => {
    value = typeof next === "function" ? (next as (v: T) => T)(value) : next;
    subs.forEach((f) => f());
  };
  const subscribe = (f: () => void) => { subs.add(f); return () => subs.delete(f); };
  const use = () => useSyncExternalStore(subscribe, get, get);
  return { get, set, use };
}
