import { useState } from 'react';
import cn from 'classnames';

import { MESSAGES, MIN_WITHDRAWAL_AMOUNT } from '../../constants/constants';
import { setOnClose } from '../../utils/setOnClose';
import { getRefillWithdrawalTitle } from '../../utils/getRefillWithdrawalTitle';
import { SuccessSection } from '../SuccessSection/SuccessSection';
import { ModalForm } from '../ModalForm/ModalForm';
import { requestPayout } from '../../api/requestPayout';
import styles from './WithdrawalModal.module.scss';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIcon from '../../assets/icons/loader-icon-white.svg?react';
/* import InfoIcon from '../../assets/icons/info-grey.svg?react'; */
import { HeaderSection, ModalMainButton, Overlay } from '../UI';
import { setUser } from '../../redux/features/userSlice';

export const WithdrawalModal = ({ setHasFooter }) => {
  const [hasForm, setHasForm] = useState(true);
  const [isFormClose, setIsFormClose] = useState(false);
  const [amount, setAmount] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);
  const [isAddressClose, setIsAddressClose] = useState(false);
    const [amountToPay, setamountToPay] = useState(0)
const user = useRef();
user.current = useSelector(state=>state.user.user);
  const [hasSuccess, setHasSuccess] = useState(false);
  const [isSuccessClose, setIsSuccessClose] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [walletInputValue, setWalletInputValue] = useState('');
  const [hasWalletInputError, setHasWalletInputError] = useState(false);
  const dispatch = useDispatch();
  const walletInputHandler = (event) => {
    setWalletInputValue(event.target.value);
    setHasWalletInputError(false);
  };

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  const setOnOpen = (setHasElement) => {
    setIsFormClose(false);
    setIsAddressClose(false);
    setIsSuccessClose(false);

    setHasElement(true);
  };

  const setSuccessHandler = () => {
    if (walletInputValue) {
      //////send data to server, when loading setIsLoading(true), after: setIsLoading(false) setHasSuccess(true); setHasAddress(false);

      setOnOpen(setHasSuccess);
      setOnClose(setIsAddressClose, setHasAddress);
    }

    if (!walletInputValue) {
      setHasWalletInputError(true);

      return;
    }
  };

  const sendDataToServer = (amount=0) => {
    if (amount!=0){
    setamountToPay(amount)}
if (walletInputValue!=''){
requestPayout(user.current.id, amountToPay, walletInputValue, user.current.sign).then(json=>{
if (json.id){

dispatch(setUser(json))
}
})}
    //////code for sending data from ModalForm component
  };

  return (
    <>
      {hasForm && (
        <Overlay isClose={isFormClose} close={setHasFooter}>
          <HeaderSection
            setOnClose={setOnClose}
            hasForm={hasForm}
            setIsThisModalClose={setIsFormClose}
            setHasThisModal={setHasForm}
            closeHandler={setHasFooter}
            getModalTitle={getRefillWithdrawalTitle}
          />

          <ModalForm
            setOnOpen={setOnOpen}
            setHasAddress={setHasAddress}
            setHasForm={setHasForm}
     
       subtitle='Mинимальная сумма вывода 0.35 Ton. Вывод осуществляется в течении 12 часов'
            amount='Сумма вывода'
            buttonTitle='Вывод'
            sendDataToServer={sendDataToServer}
            minAmount={MIN_WITHDRAWAL_AMOUNT}
            amountError={MESSAGES.EMPTY_WITHDRAWAL_AMOUNT_INPUT}
            setIsCloseCurrent={setIsFormClose}
          />
        </Overlay>
      )}

      {hasAddress && (
        <Overlay isClose={isAddressClose}>
          <HeaderSection
            setOnOpen={setOnOpen}
            setHasPrev={setHasForm}
            setIsThisModalClose={setIsAddressClose}
            setHasThisModal={setHasAddress}
            closeHandler={setHasFooter}
            hasAddress={hasAddress}
            getModalTitle={getRefillWithdrawalTitle}
          />

          <div className={styles.withdrawal__section}>
            <label
              htmlFor="wallet"
              className={styles.withdrawal__label}
            >
              Адрес кошелька для вывода
            </label>

            <input
              className={styles.withdrawal__input}
              id="wallet"
              type="text"
              value={walletInputValue}
              onChange={walletInputHandler}
            />

            {hasWalletInputError && (<p className={cn(
              'animate__animated',
              'animate__fadeInLeft',
              { [styles.error__message]: hasWalletInputError }
              )}>
              {MESSAGES.EMPTY_WITHDRAWAL_INPUT}
            </p>)}
          </div>

          <ModalMainButton
               sendData={sendDataToServer}
          iswithdraw = {true}
            setOnOpen={setOnOpen}
            setHasNext={setSuccessHandler}
            isDisabled={isLoading}
            content={
              isLoading
                ? (<LoadingIcon className={styles.withdrawal__loader} />)
                : 'Вывод'
            }
          />

          <div className={`${styles.withdrawal__subheader} ${styles.withdrawal__info}`}>
            <div>
   {/*            <InfoIcon /> */}
            </div>

            <p>Внимание: проверьте адрес кошелька перед отправкой средств.
            </p>
          </div>
        </Overlay>
      )}

      {hasSuccess && (
        <Overlay isClose={isSuccessClose}>
          <HeaderSection
            setIsThisModalClose={setIsSuccessClose}
            setHasForm={setHasForm}
            hasSuccess={hasSuccess}
            closeHandler={setHasFooter}
            getModalTitle={getRefillWithdrawalTitle}
          />

          <SuccessSection closeHandler={setHasFooter} setIsThisModalClose={setIsSuccessClose} />
        </Overlay>
      )}
    </>
  );
};

