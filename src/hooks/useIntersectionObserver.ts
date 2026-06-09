import { useEffect, useRef } from "react";

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  enabled?: boolean;
  rootId?: string;
  rootMargin?: string;
}

export const useIntersectionObserver = ({
  onIntersect,
  enabled = true,
  rootId = "main-scroll-container",
  rootMargin = "400px",
}: UseIntersectionObserverProps) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const onIntersectRef = useRef(onIntersect);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    onIntersectRef.current = onIntersect;
    enabledRef.current = enabled;
  }, [onIntersect, enabled]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && enabledRef.current) {
          onIntersectRef.current();
        }
      },
      {
        root: rootId ? document.getElementById(rootId) : null,
        rootMargin,
        threshold: 0,
      },
    );

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [rootId, rootMargin]);

  return targetRef;
};
