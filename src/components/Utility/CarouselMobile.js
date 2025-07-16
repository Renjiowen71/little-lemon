import { useEffect,useState, useRef } from 'react';
import SpecialsCard from "../card/SpecialsCard";
import "./Carousel.css";

function CarouselMobile({items}) {
   const containerRef = useRef(null);
  const directionRef = useRef('down');
  const [isPaused, setIsPaused] = useState(false);
  const [isInteracted, setIsInteracted] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    const bounceScroll = () => {
      if (!container || isPaused) return;

      if (directionRef.current === 'down') {
        container.scrollTop += 1;
      } else {
        container.scrollTop -= 1;
      }

      const atEnd = container.scrollTop + container.clientHeight >= container.scrollHeight;
      const atStart = container.scrollTop <= 0;

      if (atEnd) {
        directionRef.current = 'up';
      } else if (atStart) {
        directionRef.current = 'down';
      }
    };

    const scrollInterval = setInterval(bounceScroll, 30);

    return () => clearInterval(scrollInterval);
  }, [isPaused]);

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    if(!isInteracted) setIsPaused(false);
  };

  const handleInteract = () => {
    setIsInteracted(true);
    handlePause();
    setTimeout(() => {
      setIsInteracted(false);
    }, 3000);
  }

  return (
    <section
      className="carousel-mobile-container"
      ref={containerRef}
      onMouseMove={handlePause}
      onMouseLeave={handleResume}
      onMouseDown={handleInteract}
      onTouchStart={handlePause}
      onTouchMove={handleInteract}
      onTouchEnd={handleResume}
    >
      {items.map((item, index) => {
          return (
            <SpecialsCard key={item.id} item={item}/>
          );
      })}
    </section>
  );
}

export default CarouselMobile;
