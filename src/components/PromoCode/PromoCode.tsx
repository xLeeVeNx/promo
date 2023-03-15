import React, { ChangeEvent, useState } from 'react';
import style from './PromoCode.module.css';
import { promoCodes } from '@/constants';
import classNames from 'classnames';

type RadioValueType = 'en' | 'ru';

export const PromoCode = () => {
  const [inputValue, setInputValue] = useState('');
  const [isPromoCodeCorrect, setIsPromoCodeCorrect] = useState(false);
  const [radioValue, setRadioValue] = useState<RadioValueType>('en');
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onApplyPromoCode = () => {
    if (promoCodes.includes(inputValue)) {
      setIsPromoCodeCorrect(true);
    }
  };

  const onPayButtonClick = () => {
    window.open(`https://kakay-to_ssylka.com/${radioValue}`);
  };

  const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value as RadioValueType);
  };

  return (
    <div className={style.promoCode}>
      <h3 className={style.title}>Промокод</h3>
      <div className={style.wrapper}>
        <input
          className={style.input}
          value={inputValue}
          disabled={isPromoCodeCorrect}
          onChange={onInputChange}
          type="text"
        />
        <button
          className={classNames(style.button, { [style.correct]: isPromoCodeCorrect })}
          onClick={onApplyPromoCode}
          type="button"
          disabled={!promoCodes.includes(inputValue)}
        >
          {isPromoCodeCorrect ? 'Применен!' : 'Применить'}
        </button>
      </div>
      <div className={style.payment}>
        <div className={style.radios}>
          <label className={style.label}>
            <input
              className={style.radio}
              onChange={onRadioChange}
              value="en"
              type="radio"
              name="radio"
            />
            <span className={classNames(style.fakeRadio, { [style.active]: radioValue === 'en' })}>
              <div>
                <div>Оплата</div> иностранной картой
              </div>
            </span>
          </label>
          <label className={style.label}>
            <input
              className={style.radio}
              onChange={onRadioChange}
              value="ru"
              type="radio"
              name="radio"
            />
            <span className={classNames(style.fakeRadio, { [style.active]: radioValue === 'ru' })}>
              <div>
                <div>Оплата</div> российской картой
              </div>
            </span>
          </label>
        </div>
        <button className={style.paymentButton} onClick={onPayButtonClick}>
          Оплатить 210 $
        </button>
      </div>
    </div>
  );
};
