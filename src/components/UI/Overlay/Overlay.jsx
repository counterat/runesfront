import cn from 'classnames';
import closeImg from '/src/assets/common/close.png'

import 'animate.css';

import styles from './Overlay.module.scss';

export const Overlay = ({ children, isClose, close }) => {
  return (
    <>
      <div className={styles.position}>
        <div className={cn(
          styles.wrapper,
          'animate__animated',
          'animate__slideInUp',
          'animate__faster',
          { 'animate__slideOutDown': isClose }
        )}>
          {children}
          <button onClick={close} className={styles.closeWrapper}>
            <img src={closeImg} alt="" />
          </button>
        </div>
      </div>
    </>
  );
};
