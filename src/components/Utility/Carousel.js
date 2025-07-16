import {useState,useEffect} from 'react';
import CarouselDesktop from './CarouselDesktop';
import CarouselMobile from './CarouselMobile';

function Carousel({items}) {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {innerWidth<800 ? (
          <CarouselMobile items={items} />
      ) : (
          <CarouselDesktop items={items} />
      )}
    </>
  );
}

export default Carousel;
