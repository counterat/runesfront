export const tgLink = 'https://t.me/TON_Runes_bot'
export const backendDomain = 'https://api.ton-runes.top/'

export const REFILL_MODAL_TITLE = {
  REFILL: 'Пополнение баланса',
  SUCCESS: 'Оплата прошла!',
};
export const WITHDRAWAL_MODAL_TITLE = {
  REFILL: 'Вывод средств',
  SUCCESS: 'Вывод средств в обработке',
};

export const MODAL_TYPES = {
    WITHDRAWAL: 'withdrawal',
    REFILL: 'refill',
    REFERAL: 'referal',
    INFO: 'info',
    SHOP: 'shop',
  };

  export const MESSAGES = {
    NO_SERVER_RESPONSE: 'Что-то пошло не так...',
    NOT_ENOUGH_MONEY: 'У вас недостаточно средств',
    EMPTY_REFIL_AMOUNT_INPUT: 'Сумма должна быть больше 0.2 Ton',
    EMPTY_WITHDRAWAL_AMOUNT_INPUT: 'Сумма должна быть больше 0.35 Ton',
    EMPTY_WITHDRAWAL_INPUT: 'Введите адрес кошелька',
    COPIED: 'Скопировано',
    TOOLTIP_COPY: 'Скопировать',
  };
  export const MIN_WITHDRAWAL_AMOUNT = 0.35;
  export const MIN_REFILL_AMOUNT = 0.2;