import { useEffect } from 'react';

type UseScrollToRedirectProps = {
  elementRef: React.RefObject<HTMLElement>;
  onTrigger: () => void;
  enabled: boolean;
};

export function useScrollToRedirect({ elementRef, onTrigger, enabled }: UseScrollToRedirectProps) {
  useEffect(() => {
    if (!enabled) return;

    const timeout = setTimeout(() => {
      const section = elementRef.current;
      if (!section) return;

      let hasScrolled = false;

      const handleWheel = (event: WheelEvent) => {
        if (event.deltaY > 0 && !hasScrolled) {
          hasScrolled = true;
          onTrigger();
        }
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            window.addEventListener('wheel', handleWheel, { passive: true });
          } else {
            window.removeEventListener('wheel', handleWheel);
            hasScrolled = false;
          }
        },
        {
          root: null,
          threshold: 0.8,
        }
      );

      observer.observe(section);

      return () => {
        window.removeEventListener('wheel', handleWheel);
        observer.disconnect();
      };
    }, 100);

    return () => clearTimeout(timeout);
  }, [elementRef, onTrigger, enabled]);
}