import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import style from './Card.module.css';

interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  subtitle: string;
}

export const Card: FC<CardProps> = ({ title, subtitle }) => {
  return (
    <div className={style.card}>
      <h3 className={style.title}>{title}</h3>
      <div className={style.subtitle}>{subtitle}</div>
    </div>
  );
};
