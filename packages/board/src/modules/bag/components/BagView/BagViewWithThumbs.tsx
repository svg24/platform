import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import { useStore } from 'src/store';
import type SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

function BagViewMain({
  children,
  thumbs,
}: {
  children: JSX.Element[];
  thumbs: SwiperCore | null;
}): JSX.Element {
  const { bag, content } = useStore();
  const navigation = {
    prev: {
      id: 'prev',
      ref: useRef<HTMLButtonElement>(null),
      icon: ChevronLeftIcon,
    },
    next: {
      id: 'next',
      ref: useRef<HTMLButtonElement>(null),
      icon: ChevronRightIcon,
    },
  };
  const swiper = {
    slidesPerView: 1,
    spaceBetween: 0,
    thumbs: {
      swiper: thumbs,
      slideThumbActiveClass: 'bag-view__slide_active',
    },
    onInit: (core: SwiperCore) => {
      const { params } = core;
      params.navigation = {
        ...params.navigation as object,
        prevEl: navigation.prev.ref.current,
        nextEl: navigation.next.ref.current,
        disabledClass: 'bag-view__btn_disabled',
      };

      core.navigation.init();
      core.navigation.update();
    },
    onSlideChange: (core: SwiperCore) => {
      const item = content.item.response?.data[core.realIndex];
      if (item) bag.item.setData(item);
    },
  };

  return (
    <Swiper
      className="bag-view__main"
      slidesPerView={swiper.slidesPerView}
      spaceBetween={swiper.spaceBetween}
      thumbs={swiper.thumbs}
      onInit={swiper.onInit}
      onSlideChange={swiper.onSlideChange}
    >
      {[navigation.prev, navigation.next].map((item) => (
        <button
          aria-label="prev"
          className="bag-view__btn"
          key={item.id}
          ref={item.ref}
          type="button"
        >
          {item.icon({ className: 'bag-view__icon' })}
        </button>
      ))}
      {children}
    </Swiper>
  );
}

function BagViewThumbs({
  children,
  onSwiper,
}: {
  children: JSX.Element[];
  onSwiper: (swiper: SwiperCore) => void;
}): JSX.Element {
  return (
    <Swiper
      allowTouchMove={false}
      className="bag-view__thumbs"
      slidesPerView={3}
      spaceBetween={8}
      watchSlidesProgress
      onSwiper={onSwiper}
    >
      {children}
    </Swiper>
  );
}

export function BagViewWithThumbs(): JSX.Element {
  const { content } = useStore();
  const [thumbs, setThumbs] = useState<SwiperCore | null>(null);
  const slides = [] as JSX.Element[];

  content.item.response?.data.forEach((item) => {
    const svg = item.content.original?.snippets.svg;

    if (svg) {
      slides.push((
        <SwiperSlide
          className="bag-view__slide"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ));
    }
  });

  return (
    <>
      <BagViewMain thumbs={thumbs}>
        {slides}
      </BagViewMain>
      <BagViewThumbs onSwiper={setThumbs}>
        {slides}
      </BagViewThumbs>
    </>
  );
}
