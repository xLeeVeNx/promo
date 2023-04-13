import React, { ChangeEvent, useState } from 'react';
import style from './PromoCode.module.css';
import classNames from 'classnames';
import { bigPromoCodes, promoCodes, smallPromoCodes } from '@/constants';

type RadioValueType = 'en' | 'ru';

export const PromoCode = () => {
  const [inputValue, setInputValue] = useState('');
  const [isPromoCodeCorrect, setIsPromoCodeCorrect] = useState(false);
  const [radioValue, setRadioValue] = useState<RadioValueType>('ru');
  const [paymentLink, setPaymentLink] = useState('https://platim.ru/pay/4bDS2j');
  const [priceText, setPriceText] = useState('Оплатить 15 000 ₽');
  const smallDiscount = smallPromoCodes.includes(inputValue);
  const bigDiscount = bigPromoCodes.includes(inputValue);
  const ruPayment = radioValue === 'ru';

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onApplyPromoCode = () => {
    if (promoCodes.includes(inputValue)) {
      setIsPromoCodeCorrect(true);
      if (smallDiscount) {
        setPaymentLink('https://platim.ru/pay/7L4GK4');
        setPriceText(ruPayment ? 'Оплатить 12 000 ₽' : 'Оплатить 168 $');
      }

      if (bigDiscount) {
        setPaymentLink('https://platim.ru/pay/7SH4vH');
        setPriceText(ruPayment ? 'Оплатить 10 000 ₽' : 'Оплатить 140 $');
      }
    }
  };

  const onPayButtonClick = () => {
    window.open(paymentLink);
  };

  const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as RadioValueType;
    const ru = value === 'ru';
    setRadioValue(value);

    if (isPromoCodeCorrect) {
      if (smallDiscount) {
        setPriceText(ru ? 'Оплатить 12 000 ₽' : 'Оплатить 168 $');
      } else if (bigDiscount) {
        setPriceText(ru ? 'Оплатить 10 000 ₽' : 'Оплатить 140 $');
      }
    } else {
      setPriceText(ru ? 'Оплатить 15 000 ₽' : 'Оплатить 210 $');
    }
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
          {priceText}
        </button>
      </div>
    </div>
  );
};
