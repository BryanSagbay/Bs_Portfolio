import { useEffect } from 'react';

type UseScrollToRedirectProps = {
  elementRef: React.RefObject<HTMLElement>;
  onTrigger: () => void;
  enabled: boolean;
};

export function useScrollToRedirect({ elementRef, onTrigger, enabled }: UseScrollToRedirectProps) {
  useEffect(() => {
    if (!enabled) return;

    // Eliminar timeout innecesario para mejor rendimiento
    const section = elementRef.current;
    if (!section) return;

    let hasScrolled = false;
    let lastWheelTime = 0;
    const throttleTime = 100; // Throttle de 100ms

    // Usar throttle para mejor rendimiento
    const handleWheel = (event: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime > throttleTime) {
        lastWheelTime = now;
        if (event.deltaY > 0 && !hasScrolled) {
          hasScrolled = true;
          onTrigger();
          // Eliminar listener después de activar para evitar múltiples disparos
          window.removeEventListener('wheel', handleWheel);
        }
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
  }, [elementRef, onTrigger, enabled]);
}