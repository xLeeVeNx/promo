import React, { ChangeEvent, useState } from 'react';
import style from './PromoCode.module.css';
import classNames from 'classnames';
import { bigPromoCodes, leshaPromoCodes, promoCodes, smallPromoCodes } from '@/constants';
import { Api } from '@/api/api';
import { removeOrderId } from '@/lib/removeOrderId/removeOrderId';

type RadioValueType = 'en' | 'ru';

export const PromoCode = () => {
  const [inputValue, setInputValue] = useState('');
  const [isPromoCodeCorrect, setIsPromoCodeCorrect] = useState(false);
  const [radioValue, setRadioValue] = useState<RadioValueType>('ru');
  const [paymentLink, setPaymentLink] = useState('https://platim.ru/pay/4bDS2j');
  const [priceText, setPriceText] = useState('Оплатить 30 000 ₽');
  const [isLoading, setIsLoading] = useState(false);
  const smallDiscount = smallPromoCodes.includes(inputValue);
  const leshaDiscount = leshaPromoCodes.includes(inputValue);
  const bigDiscount = bigPromoCodes.includes(inputValue);
  const ruPayment = radioValue === 'ru';

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id');

    if (orderId) {
      localStorage.setItem('orderId', orderId);
      window.location.href = removeOrderId(window.location.href);
    } else {
      const orderId = localStorage.getItem('orderId');
      if (orderId) {
        (async () => {
          const order = await Api.checkOrderStatus(orderId);
          if (order.status === 'success') {
            window.open('https://forms.gle/rQcb4cqAjAiTheAB8');
          } else if (order.status === 'error') {
            alert(order.failure_message || order.status);
          }
          localStorage.removeItem('orderId');
        })();
      }
    }
  }, []);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onApplyPromoCode = () => {
    if (promoCodes.includes(inputValue)) {
      setIsPromoCodeCorrect(true);
      if (smallDiscount) {
        setPaymentLink('https://platim.ru/pay/7L4GK4');
        setPriceText(ruPayment ? 'Оплатить 25 000 ₽' : 'Оплатить 310 $');
      }

      if (leshaDiscount) {
        setPriceText(!ruPayment ? 'Оплатить 50 $' : 'Оплатить 30 000 ₽');
      }

      if (bigDiscount) {
        setPaymentLink('https://platim.ru/pay/7SH4vH');
        setPriceText(ruPayment ? 'Оплатить 20 000 ₽' : 'Оплатить 240 $');
      }
    }
  };

  const onPayButtonClick = async () => {
    if (!isLoading) {
      if (radioValue === 'en') {
        setIsLoading(true);
        const amount = smallDiscount ? 310 : bigDiscount ? 240 : leshaDiscount ? 50 : 370;
        const newUrl = await Api.createOrder({
          currency: 'USD',
          amount,
          options: {
            return_url: window.location.href,
            terminal: 'terminal_maslovai_usd',
          },
        });
        if (newUrl) {
          setIsLoading(false);
          window.location.href = newUrl;
        }
      } else {
        window.open(paymentLink);
      }
    }
  };

  const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as RadioValueType;
    const ru = value === 'ru';
    setRadioValue(value);

    if (isPromoCodeCorrect) {
      if (smallDiscount) {
        setPriceText(ru ? 'Оплатить 25 000 ₽' : 'Оплатить 310 $');
      } else if (bigDiscount) {
        setPriceText(ru ? 'Оплатить 20 000 ₽' : 'Оплатить 240 $');
      } else if (leshaDiscount) {
        setPriceText(ru ? 'Оплатить 30 000 ₽' : 'Оплатить 50 $');
      }
    } else {
      setPriceText(ru ? 'Оплатить 30 000 ₽' : 'Оплатить 370 $');
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
          {isLoading ? 'Загрузка...' : priceText}
        </button>
      </div>
    </div>
  );
};
