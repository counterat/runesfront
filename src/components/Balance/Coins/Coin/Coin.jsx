
import PropTypes from 'prop-types';
import './Coin.css'
import withdraw from '../../../../assets/ProfilePage/withdraw.png';
import withdrawNoShadow from '../../../../assets/ProfilePage/withdrawNoShadow.png';import ton from '/src/assets/ProfilePage/ton.png';
import fehu from '../../../../assets/ProfilePage/fehu.png';

import { UserFooter } from '../../../UserFooter';
import { MODAL_TYPES } from '../../../../constants/constants';
import { useState } from 'react';
function Coin({ balance, name, special }) {
  const  [hasModal, setHasModal] = useState(false)
  const handle = ()=>{setHasModal(!hasModal)}
  return (
    <div className='coin'>
      <div className='coinInner'>
        <p className='balance special'>{balance}</p>
      </div>
      <div className={`coinName ${name === "ton" ? "ton" : "fehu"}`}>
        <img src={name === "ton" ? ton : fehu} alt="" />
      </div>
      <button className={`withdraw ${name === "fehu" ? 'disabled' :''}`} onClick={name=='ton'? function(){setHasModal(!hasModal)} : function(){}} >
        <img src={name === "ton" ? withdraw : withdrawNoShadow} alt="" />
      </button> 
      {hasModal && <UserFooter setHasFooter={setHasModal} modalType={MODAL_TYPES.WITHDRAWAL} />}
    </div>
  )
}

Coin.propTypes = {
  balance: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  special: PropTypes.bool
};

export default Coin
