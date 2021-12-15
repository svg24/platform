import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useEffect, useRef, useState } from 'react';
import { useStore } from 'src/store';
import SwiperCore, { Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { ApiItem } from 'types/api';

SwiperCore.use([Navigation, Thumbs]);

function BagViewWithThumbs(): JSX.Element {
  const { bag, content } = useStore();
  const { data } = content.item.result as ApiItem;
  const slides = [] as JSX.Element[];

  data.forEach((item) => {
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

  const thumbs = {
    _state: useState<SwiperCore | null>(null),
    get state() {
      return thumbs._state[0];
    },
    get setState() {
      return thumbs._state[1];
    },
  };

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
    get els() {
      return [navigation.prev, navigation.next].map((item) => (
        <button
          aria-label="prev"
          className="bag-view__btn"
          key={item.id}
          ref={item.ref}
          type="button"
        >
          {item.icon({ className: 'bag-view__icon' })}
        </button>
      ));
    },
  };

  return (
    <>
      <Swiper
        className="bag-view__main"
        slidesPerView={1}
        spaceBetween={0}
        thumbs={{
          swiper: thumbs.state,
          slideThumbActiveClass: 'bag-view__slide_active',
        }}
        onInit={(swiper) => {
          const { params } = swiper;
          params.navigation = {
            ...params.navigation as object,
            prevEl: navigation.prev.ref.current,
            nextEl: navigation.next.ref.current,
            disabledClass: 'bag-view__btn_disabled',
          };

          swiper.navigation.init();
          swiper.navigation.update();
        }}
        onSlideChange={(swiper) => {
          const item = data[swiper.realIndex];

          if (item) {
            bag.item.setData(item);
          }
        }}
      >
        {navigation.els}
        {slides}
      </Swiper>
      <Swiper
        allowTouchMove={false}
        className="bag-view__thumbs"
        slidesPerView={3}
        spaceBetween={8}
        watchSlidesProgress
        onSwiper={thumbs.setState}
      >
        {slides}
      </Swiper>
    </>
  );
}

function BagViewWithoutThumbs(): JSX.Element {
  const { bag } = useStore();
  const svg = bag.item.data?.content.original?.snippets.svg;

  return (svg
    ? (
      <div
        className="bag-view__slide"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    )
    : <></>
  );
}

export function BagView(): JSX.Element {
  const { bag, content } = useStore();

  const root = {
    view: <></>,
    mount() {
      if (content.item.result) {
        const { data } = content.item.result;

        useEffect(() => {
          if (data[0]) bag.item.setData(data[0]);
        }, []);

        if (data.length > 1) {
          root.view = <BagViewWithThumbs />;
        } else {
          root.view = <BagViewWithoutThumbs />;
        }
      }
    },
  };

  root.mount();

  return (
    <section className="bag-view">
      {root.view}
    </section>
  );
}
