import { useState } from 'react';
import cn from 'classnames';
import 'animate.css';
import Autocomplete from '@mui/material/Autocomplete';
import styles from './ModalForm.module.scss';
import TextField from '@mui/material/TextField';
/* import InfoIcon from '../../assets/icons/info-grey.svg'; */
import { setOnClose } from '../../utils/setOnClose';
import { Button } from '../UI';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
export const ModalForm = ({
  setOnOpen,
  setHasAddress,
  setHasForm,
  subtitle,
  amount,
  buttonTitle,
  sendDataToServer,
  minAmount,
  amountError,
  setIsCloseCurrent,
}) => {

const footerModal = document.getElementById('footerModal');
const [currencyInputValue, setCurrencyInputValue] = useState('');
const currencyInputHandler = (event, value) => {
  console.log([event, value])
  setCurrencyInputValue(value);
 
  
};
  let height = window.visualViewport.height;
  const viewport = window.visualViewport;

  window.addEventListener('scroll', blurHandler);
  window.visualViewport.addEventListener('resize', resizeHandler);

  function resizeHandler() {
    // if (!/iPhone|iPad|iPod/.test(window.navigator.userAgent)) {
   

    if (footerModal) {
      footerModal.style.bottom = `${height - viewport.height}px`;
    }
  }

  function blurHandler() {
    if (footerModal) {
      footerModal.style.bottom = 0;
    }
  }





  const [amountInputValue, setAmountInputValue] = useState('');
  const user = useRef();
  user.current = useSelector(state=>state.user.user)
  const [hasAmountInputError, setHasAmountInputError] = useState(false);
  const [tooMuchMoneyToPayout, settooMuchMoneyToPayout] = useState(false);
  const toomuchmessage = 'Сумма вывода превышает ваш баланс!'
  const amountInputHandler = (event) => {
    setAmountInputValue(event.target.value);
    
    
    if (buttonTitle == 'Вывод'){
      if (Number(event.target.value )> user.current.real_balance){
        settooMuchMoneyToPayout(true);
       
      }
      else{
        settooMuchMoneyToPayout(false);
      }
    }
    setHasAmountInputError(false);
  };


  const formSubmitHandler = (e) => {
    e.preventDefault();
    blurHandler();
    if (!!amountInputValue
      && Number(amountInputValue) >= minAmount) {
      const data = {
        amountInputValue,
      };
      if (buttonTitle!='Вывод'){
      sendDataToServer(user.current.id,amountInputValue, currencyInputValue);}
      else{
      
       if ((Number(amountInputValue )<= user.current.real_balance)){
        sendDataToServer(amountInputValue)}
        else{
          settooMuchMoneyToPayout(true)
        }
      }
      if (!tooMuchMoneyToPayout){
      setOnOpen(setHasAddress);
      setOnClose(setIsCloseCurrent, setHasForm);
      }}
    console.log(user.current.real_balance < amountInputValue)
 
    setHasAmountInputError( (!amountInputValue || Number(amountInputValue) < minAmount) );
   
  };

  return (
    <form
      className={styles.form}
      onSubmit={formSubmitHandler}
    style={{width:"100%",

      }}
    >
      <h5 className={styles.form__subheader}>
        {/* <InfoIcon className={styles.form__icon} /> */}
        {subtitle}
      </h5>

      <div className={styles.form__section}>
        <label
          htmlFor="amount"
          className={styles.form__label}
        >
          {amount}
        </label>

        <div className={styles['form__input-wrapper']}>
          <input
             className={styles.form__input}
            id="amount"
            type="number"
            placeholder='0'
            value={amountInputValue}
            onChange={amountInputHandler}
 onBlur={blurHandler}
 pattern="[0-9]*[.,]?[0-9]*"
          />
        </div>
{ (buttonTitle != 'Вывод') && <div>

<label
          htmlFor="currency"
          className={styles.form__label}
        >
          Валюта
        </label>

        <Autocomplete
          disablePortal
          id="currency"
          clearIcon={null}
          className={styles.form__autocomplete}
          options={['USDT', 'TON', 'BNB', 'BTC', 'LTC', 'TRX']}
          sx={{ width: 300 }}
          defaultValue={'USDT'}
          // PaperComponent={({ children }) => (
          //   <Paper style={{ background: "yellow" }}>{children}</Paper>
          // )}
          inputValue={currencyInputValue}
          onChange={currencyInputHandler}
       renderInput={(params) => <TextField {...params} label="" InputProps={{ ...params.InputProps, inputProps: { ...params.inputProps, inputMode: 'none' }}} />}
 
        />


</div>}
       


        {(hasAmountInputError || tooMuchMoneyToPayout) && (<p className={cn(
          'animate__animated',
          'animate__fadeInLeft',
          { [styles.error__message]: (hasAmountInputError || tooMuchMoneyToPayout) }
          )}>
          {!tooMuchMoneyToPayout ? amountError : toomuchmessage}
        </p>)}
      </div>

      <Button
        buttonClassName={styles.form__submit}
        onClick={formSubmitHandler}
      >
        {buttonTitle}
      </Button>
    </form>
  );
};
