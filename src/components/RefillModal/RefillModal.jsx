import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { MESSAGES, MIN_REFILL_AMOUNT } from "../../constants/constants";

import styles from "./RefillModal.module.scss";

import LoadingIcon from "../../assets/icons/loader-icon-white.svg?react";
/* import InfoIcon from '../../assets/icons/info-grey.svg?react'; */
import { HeaderSection, ModalMainButton, Overlay } from "../UI";
import { getRefillModalTitle } from "../../utils/getRefillModalTitle";
import { setOnClose } from "../../utils/setOnClose";
import { ModalForm } from "../ModalForm/ModalForm";
import { createCopy } from "../../utils/createCopy";
import { SuccessSection } from "../SuccessSection/SuccessSection";
import { makePayment } from "../../api/makePayment";
////////////////////////////////

//////////////////////////////////////

export const RefillModal = ({ setHasFooter }) => {
  const [isPaid, setIsPaid] = useState(false);
  const [address, setAddress] = useState("ADDRESS FROM SERVER");
  const [hasForm, setHasForm] = useState(true);
  const [isFormClose, setIsFormClose] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [hasAddress, setHasAddress] = useState(false);
  const [isAddressClose, setIsAddressClose] = useState(false);
  const [currencyForPayment, setCurrencyForPayment] = useState("");
  const [hasSuccess, setHasSuccess] = useState(false);
  const [isSuccessClose, setIsSuccessClose] = useState(false);

  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  const setOnOpen = (setHasElement) => {
    setIsFormClose(false);
    setIsAddressClose(false);
    setIsSuccessClose(false);

    setHasElement(true);
  };

  const tooltipMessage = isCopied ? MESSAGES.COPIED : MESSAGES.TOOLTIP_COPY;

  const setSuccessHandler = () => {
    //////send data to server, when loading setIsLoading(true), after: setIsLoading(false) setHasSuccess(true); setHasAddress(false);

    setOnOpen(setHasSuccess);
  };

  const sendDataToServer = (userId, amount, currency) => {
    makePayment(userId, amount, currency).then((json) => {
      console.log(json);
      setAddress(json.address);
      setPaymentAmount(json.amount);
      setCurrencyForPayment(currency);
    });
    //////code for sending data from ModalForm component
  };

  return (
    <>
      {hasForm && (
        <Overlay isClose={isFormClose} close={() => setHasFooter(false)}>
          <HeaderSection
            setOnClose={setOnClose}
            hasForm={hasForm}
            setIsThisModalClose={setIsFormClose}
            setHasThisModal={setHasForm}
            closeHandler={setHasFooter}
            getModalTitle={getRefillModalTitle}
          />

          <ModalForm
            setOnOpen={setOnOpen}
            setHasAddress={setHasAddress}
            setHasForm={setHasForm}
            subtitle="Mинимальная сумма депозита 0.1 Ton"
            amount="Сумма пополнения в Ton"
            buttonTitle="Пополнить"
            sendDataToServer={sendDataToServer}
            minAmount={MIN_REFILL_AMOUNT}
            amountError={MESSAGES.EMPTY_REFIL_AMOUNT_INPUT}
            setIsCloseCurrent={setIsFormClose}
          />
        </Overlay>
      )}

      {hasAddress && (
        <Overlay
          isClose={isAddressClose}
          close={() => {
            setHasAddress(undefined);
            setHasFooter(true)
            setHasForm(true);
          }}
        >
          <HeaderSection
            setOnOpen={setOnOpen}
            setHasPrev={setHasForm}
            setIsThisModalClose={setIsAddressClose}
            setHasThisModal={setHasAddress}
            closeHandler={setHasFooter}
            hasAddress={hasAddress}
            getModalTitle={getRefillModalTitle}
          />

          <p
            className={`${styles.refill__subheader} ${styles["refill__address-subheader"]}`}
          >
            Адрес кошелька для пополнения
          </p>

          <div className={styles.refill__address}>
            <Tooltip title={tooltipMessage} placement="top">
              <p>
                <span>{address}</span>

                <button onClick={() => createCopy(address, setIsCopied)} />
              </p>
            </Tooltip>
          </div>
          <p
            className={`${styles.refill__subheader} ${styles["refill__address-subheader"]}`}
          >
            Сумма для перевода
          </p>
          <div className={styles.refill__address}>
            <Tooltip title={tooltipMessage} placement="top">
              <p>
                <span>
                  {paymentAmount}
                  {currencyForPayment}
                </span>

                <button
                  onClick={() => createCopy(paymentAmount, setIsCopied)}
                />
              </p>
            </Tooltip>
          </div>

          <ModalMainButton
            setOnOpen={setOnOpen}
            setIsCloseCurrent={setIsAddressClose}
            setHasNext={setSuccessHandler}
            setHasCurrent={setHasAddress}
            isDisabled={isLoading}
            content={
              isLoading ? (
                <LoadingIcon className={styles.refill__loader} />
              ) : (
                "Я оплатил (а)"
              )
            }
          />

          <div className={`${styles.refill__subheader} ${styles.refill__info}`}>
            <div>{/*           <InfoIcon /> */}</div>

            <p>
              Внимание: проверьте адрес кошелька перед отправкой средств. После
              отправки полной суммы на указанный адрес нажмите кнопку «я
              оплатил(а)»
            </p>
          </div>
        </Overlay>
      )}

      {hasSuccess && (
        <Overlay isClose={isSuccessClose}
          close={() => {
            setHasSuccess(false);
            setHasForm(true);
          }}>
          <HeaderSection
            setOnClose={setOnClose}
            setIsThisModalClose={setIsSuccessClose}
            hasSuccess={hasSuccess}
            closeHandler={setHasFooter}
            getModalTitle={getRefillModalTitle}
            title={!isPaid && "Ожидание оплаты"}
          />

          <SuccessSection
            setIsThisModalClose={setIsSuccessClose}
            closeHandler={setHasFooter}
            content="Баланс пополнится сразу после подтверждения транзакции."
          />
        </Overlay>
      )}
    </>
  );
};
