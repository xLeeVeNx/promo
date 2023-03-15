import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import style from './Title.module.css';
import classNames from 'classnames';

interface TitleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
}

export const Title: FC<TitleProps> = ({ children, className, ...restProps }) => {
  return (
    <h2 className={classNames(style.title, className)} {...restProps}>
      {children}
    </h2>
  );
};
