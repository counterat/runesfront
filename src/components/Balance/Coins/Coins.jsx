import Coin from './Coin'
import './Coins.css'

function Coins({realBalance, fehuBalance}) {

  return (
    <div className='coins'>
      <Coin balance={realBalance} name='ton' />
      <Coin balance={fehuBalance} name='fehu' />
    </div>
  )
}

export default Coins
