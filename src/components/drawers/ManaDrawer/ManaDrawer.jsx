import Drawer from "react-modern-drawer";
import GoBackButton from "../../GoBackButton";
import PropTypes, { func } from "prop-types";
import ManaBalance from "../../ManaBalance";
import ProgressBar from "@ramonak/react-progress-bar";

import mana from "/src/assets/GeneralPage/mana.png";
import buyMana from '/src/assets/GeneralPage/buyMana.png';
import { useRef } from "react";
import { useSelector } from "react-redux";
import { buyManafunc } from "../../../api/buyMana";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/features/userSlice";
import "./ManaDrawer.css";

function ManaDrawer({ isOpen, toggleDrawer }) {
  const user = useRef()
  const dispatch = useDispatch()

  user.current = useSelector(state=>state.user.user)
  function buyManaHandler(){
    buyManafunc(user.current.id,user.current.sign).then(json=>{
      if (json.id){
      dispatch(setUser(json))}
    })
  }

  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="bottom"
      zIndex={100}
      size="fit-content"
      className="manaDrawerContainer"
      overlayColor={"rgba(0,0,0,0.5)"}
    >
      <div className="manaDrawer">
      <div className="manaBalance">
          <img src={mana} alt="" />
          <p className="manaBalanceText">Mana</p>
          <ProgressBar
            completed={60}
            className="progressBarManaBalance"
            bgColor="#fec14d"
            labelColor="black"
            labelAlignment="left"
            borderRadius={5}
            maxCompleted={100}
            baseBgColor="#204061"
            barContainerClassName="barContainerClassName"
          />
        </div>
        <div className="manaDrawerContent">
          <div className="manaDrawerContentText1">
            Мана - сила которая помогает рунам давать ton быстрее
          </div>
          <div className="manaDrawerContentText2">
            <p>
              Каждый раз когда вы используете любой рунный камень, уровень маны
              падает на 20%
            </p>
            <p>
              Каждый раз когда количество маны опускается на 25% время
              превращения рунного камня в тон увеличивается на 1 час.
            </p>
          </div>
          <h2 className='buyManaTitle'>
            Вы можете восполнить ману купив её
          </h2>
          <button className='buyManaWrapper' onClick={buyManaHandler}>
            <img src={buyMana} alt="" />
          </button>
        </div>
        <GoBackButton onClick={toggleDrawer} />
      </div>
    </Drawer>
  );
}

ManaDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default ManaDrawer;
