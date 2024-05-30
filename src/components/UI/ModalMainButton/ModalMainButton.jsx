import styles from './ModalMainButton.module.scss';

import WhiteArrowIcon from '../../../assets/icons/arrow-right.svg?react';
import { setOnClose } from '../../../utils/setOnClose';
import { Button } from '../Button/Button';

export const ModalMainButton = ({
  sendData= ()=>{},
  iswithdraw = false,
  setOnOpen = () => {},
  content,
  isDisabled,
  setHasNext = () => {},
  setHasCurrent = () => {},
  setIsCloseCurrent = () => {},
  setHasFooter = () => {},
}) => {

  const buttonHandler = () => {
     if (iswithdraw){
      sendData()
    }

    if (setHasFooter) {
      setHasFooter(true);
    }

    setOnOpen(setHasNext);
    setOnClose(setIsCloseCurrent, setHasCurrent);
  };

  return (
    <Button
      buttonClassName={styles.button}
      onClick={() => buttonHandler()}
      disabled={isDisabled}
    >
      {content
        ? (
          <div className={`${styles.button__cript} ${styles.button__content}`}>
            {content}
          </div>
          ) : (
          <div className={styles.button__cript}>
            <span className={styles.button__text}>Криптовалюта</span>

            <WhiteArrowIcon />
          </div>
        )}
    </Button>
  );
};
