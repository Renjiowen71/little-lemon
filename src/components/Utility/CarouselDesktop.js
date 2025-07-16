import { useEffect, useState, useRef } from 'react';
import SpecialsCard from "../card/SpecialsCard";
import "./Carousel.css";

function CarouselDesktop({ items }) {
  const containerRef = useRef(null);
  const directionRef = useRef('left');
  const [isPaused, setIsPaused] = useState(false);
  const [isInteracted, setIsInteracted] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    const bounceScroll = () => {
      if (!container || isPaused) return;

      if (directionRef.current === 'left') {
        container.scrollLeft += 1;
      } else {
        container.scrollLeft -= 1;
      }

      const atEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth;
      const atStart = container.scrollLeft <= 0;

      if (atEnd) {
        directionRef.current = 'right';
      } else if (atStart) {
        directionRef.current = 'left';
      }
    };

    const scrollInterval = setInterval(bounceScroll, 30); // Smooth scroll

    return () => clearInterval(scrollInterval);
  }, [directionRef, isPaused]);

  const handlePause = () => setIsPaused(true);

  const handleResume = () => {
    if (!isInteracted) setIsPaused(false);
  };

  const handleInteract = () => {
    setIsInteracted(true);
    handlePause();
    setTimeout(() => {
      setIsInteracted(false);
    }, 3000);
  };

  return (
    <section
      className="carousel-container"
      ref={containerRef}
      onMouseMove={handlePause}
      onMouseLeave={handleResume}
      onMouseDown={handleInteract}
      onTouchStart={handlePause}
      onTouchMove={handleInteract}
      onTouchEnd={handleResume}
    >
      {items.map((item) => (
        <SpecialsCard key={item.id} item={item} />
      ))}
    </section>
  );
}

export default CarouselDesktop;
