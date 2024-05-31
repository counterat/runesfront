import Drawer from "react-modern-drawer";
import GoBackButton from "../../GoBackButton";
import PropTypes from "prop-types";
import shop from '../../../constants/shop'
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ShopDrawer.css";
import { buyStone } from "../../../api/buyStone";
import { setUser } from "../../../redux/features/userSlice";
function ShopDrawer({ isOpen, toggleDrawer }) {
  const user = useRef();
user.current=useSelector(state=>state.user.user)
const dispatch = useDispatch()
function buyPropHandler(itemId){
  buyStone(user.current.id, itemId, user.current.sign).then(json=>{
    if (json.id){
    dispatch(setUser(json)) } 
  })
}


function isEmptyArray(arr) {
  return arr.length === 0;
}
function ShopDrawer({ isOpen, toggleDrawer }) {
  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="bottom"
      zIndex={100}
      size="auto"
      className="shopDrawer"
      overlayColor={"rgba(0,0,0,0.5)"}
    >
      <div className="drawer">
        {shop.map((item, index) => (
          isEmptyArray(user.current.balances[item.id+1]) &&
          (<div className="shopItem" key={item.id}>
            <div className="iconWrapper">
              <img
                src={
                  index === 0
                    ? run0
                    : index === 1
                    ? run1
                    : index === 2
                    ? run2
                    : index === 3
                    ? run3
                    : run4
                }
                alt=""
              />
            </div>
            <p className={`count ${item.count < 1 && "big"}`}>
              {item.count} TON
            </p>
            <div className="main">
              <div className="profileText">PROFIT</div>
              {item.profitTon > 0 && (
                <div className="profitTon ">+{item.profitTon} TON</div>
              )}
              <div className="profitFehu">+{item.profitFehu} FEHU</div>
            </div>
            <button className="buy" onClick={()=>{buyPropHandler(item.id+1)}}>BUY</button>
          </div>)
        ))}
        <GoBackButton onClick={toggleDrawer} />
      </div>
    </Drawer>
  );
}

ShopDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default ShopDrawer;