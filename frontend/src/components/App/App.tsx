import React, { FC } from 'react';
import { Title } from '@/components/Title/Title';
import style from './App.module.css';
import { Card } from '@/components/Card/Card';
import { cards } from '@/constants';
import { PromoCode } from '@/components/PromoCode/PromoCode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export const App: FC = () => {
  const matches = useMediaQuery('(max-width: 768px)');
  return (
    <div className={style.app}>
      <div className={style.container}>
        <Title className={style.title}>
          <div>Оплата курса</div>
          по ChatGPT и Midjourney
        </Title>
        <div className={style.cards}>
          {matches ? (
            <Swiper slidesPerView="auto" spaceBetween={10}>
              {cards.map(({ id, title, subtitle }) => (
                <SwiperSlide key={id}>
                  <Card title={title} subtitle={subtitle} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            cards.map(({ id, title, subtitle }) => (
              <Card key={id} title={title} subtitle={subtitle} />
            ))
          )}
        </div>
        <PromoCode />
      </div>
    </div>
  );
};
