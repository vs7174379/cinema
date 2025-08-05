import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const ImageSlider = ({ images }) => {
  const visibleCount = 4;
  const [index, setIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState([]);
  const [nextSet, setNextSet] = useState([]);

  const currentRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    setCurrentSet(images.slice(index, index + visibleCount));
  }, [images, index]);

  const slide = (direction) => {
    let newIndex = direction === 'next' ? index + visibleCount : index - visibleCount;
    if (newIndex >= images.length) newIndex = 0;
    if (newIndex < 0) newIndex = Math.max(images.length - visibleCount, 0);

    const nextImages = images.slice(newIndex, newIndex + visibleCount);
    setNextSet(nextImages);

    gsap.set(nextRef.current, {
      x: direction === 'next' ? '100%' : '-100%',
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setIndex(newIndex);
        setCurrentSet(nextImages);
        gsap.set(currentRef.current, { x: 0 });
        gsap.set(nextRef.current, { x: 0 });
      },
    });

    tl.to(currentRef.current, {
      x: direction === 'next' ? '-100%' : '100%',
      duration: 0.5,
      ease: 'power2.inOut',
    });
    tl.to(nextRef.current, {
      x: '0%',
      duration: 0.5,
      ease: 'power2.inOut',
    }, 0);
  };

  const renderSlides = (set) =>
    set.map((url, i) => (
      <div
        key={i}
        className="min-w-[calc(25%-15px)] h-full bg-cover bg-center rounded-xl"
        style={{ backgroundImage: `url(${url})`, marginRight: '20px' }}
      />
    ));

  return (
    <div className="relative w-[90%] max-w-[1000px] h-[220px] overflow-hidden mx-auto">
      {/* Buttons */}
      <button
        onClick={() => slide('prev')}
        className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-black/60 hover:bg-red-700 text-white px-4 py-2 rounded-full z-10"
      >
        &#8592;
      </button>
      <button
        onClick={() => slide('next')}
        className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-black/60 hover:bg-red-700 text-white px-4 py-2 rounded-full z-10"
      >
        &#8594;
      </button>

      {/* Sliders */}
      <div ref={currentRef} className="absolute top-0 left-0 w-full h-full flex">
        {renderSlides(currentSet)}
      </div>
      <div ref={nextRef} className="absolute top-0 left-0 w-full h-full flex">
        {renderSlides(nextSet)}
      </div>
    </div>
  );
};

export default ImageSlider;
