import { useCallback, useState } from "react";
import ShopDrawer from "../../components/drawers/ShopDrawer";
import { Link } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import InviteFriendsDrawer from "../../components/drawers/InviteFriendsDrawer";
import ManaDrawer from "../../components/drawers/ManaDrawer";
import StoryDrawer from "../../components/drawers/StoryDrawer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_TYPES } from '../../constants/constants'
import { UserFooter } from '../../components/UserFooter'
import { useRef } from "react";

import base from "/src/assets/GeneralPage/base.png";
import runeMiddle from "/src/assets/GeneralPage/rune middle.png";
import rune1 from "/src/assets/GeneralPage/rune 1.png";
import rune2 from "/src/assets/GeneralPage/rune 2.png";
import rune3 from "/src/assets/GeneralPage/rune 3.png";
import rune4 from "/src/assets/GeneralPage/rune 4.png";
import inviteFriends from "/src/assets/GeneralPage/inviteFriends.png";
import shop from "/src/assets/GeneralPage/shop.png";
import mana from "/src/assets/GeneralPage/mana.png";
import add from "/src/assets/GeneralPage/add.png";
import backgroundGeneral from "/src/assets/GeneralPage/backgroundGeneral.png";
import profileIcon from "/src/assets/GeneralPage/profileIcon.png";
import question from "/src/assets/GeneralPage/question.png";
import balanceFigure1 from "/src/assets/GeneralPage/balanceFigure1.png";
import balanceFigure2 from "/src/assets/GeneralPage/balanceFigure2.png";

import "./GeneralPage.css";
import { authorise } from "../../api/authorise";
import { setUser } from "../../redux/features/userSlice";
import CountdownTimer from "../CountdownTimer/CountdownTimer";

function GeneralPage() {
  const [isOpenInvite, setIsOpenInvite] = useState(false);
  const [isOpenShop, setIsOpenShop] = useState(false);
  const [isOpenMana, setIsOpenMana] = useState(false);
  const [isOpenStory, setIsOpenStory] = useState(false);
  const  [hasModal, setHasModal] = useState(false)

const user = useRef();
user.current=useSelector(state=>state.user.user)
console.log(user.current)
  const dispatch = useDispatch();
  const toggleInviteFriendsDrawer = useCallback(() => {
    setIsOpenInvite((prevState) => !prevState);
  }, []);

  const toggleShopDrawer = useCallback(() => {
    setIsOpenShop((prevState) => !prevState);
  }, []);

  const toggleManaDrawer = useCallback(() => {
    setIsOpenMana((prevState) => !prevState);
  }, []);

  const toggleStoryDrawer = useCallback(() => {
    setIsOpenStory((prevState) => !prevState);
  }, []);

  function isEmptyArray(arr) {
    return arr.length === 0;
  }

  function getTimeDifference(createdAt, expirationDate) {
    // Преобразуем строки в объекты Date
    const created = new Date(createdAt);
    const expiration = new Date(expirationDate);
  
    // Вычисляем разницу в миллисекундах
    const diff = expiration - created;
  
    // Преобразуем разницу в часы, минуты и секунды
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
    // Форматируем результат с ведущими нулями, если необходимо
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
  
    // Возвращаем результат в формате часы:минуты:секунды
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  let now = new Date()
now = new Date(now.getTime() + now.getTimezoneOffset()*60000)
console.log(now)

  return (
    <div className="container">
      <div className="innerContainer">
        <div className="baseWrapper">
          <img src={base} alt="" />
        </div>
        <div className="runeMiddleWrapper">
     {!isEmptyArray(user.current.balances[1]) &&    < img src={ runeMiddle} alt="" />}
        </div>
        {!isEmptyArray(user.current.balances[1]) &&      <CountdownTimer expirationDate={user.current.balances[1][0].expiration_date} cl={"runeMiddleTime"} />}
        <div className="rune1Wrapper">
          
        {!isEmptyArray(user.current.balances[2]) &&       <img src={rune1} alt="" />}
        </div>
        {!isEmptyArray(user.current.balances[2]) &&         <CountdownTimer expirationDate={user.current.balances[2][0].expiration_date} cl={"rune1Time"} />}
        <div className="rune3Wrapper">
  {!isEmptyArray(user.current.balances[3]) && <img src={rune3} alt="" />}
</div>
{!isEmptyArray(user.current.balances[3]) && <CountdownTimer expirationDate={user.current.balances[3][0].expiration_date} cl={"rune2Time"} />}

<div className="rune2Wrapper">
  {!isEmptyArray(user.current.balances[4]) && <img src={rune2} alt="" />}
</div>
{!isEmptyArray(user.current.balances[4]) && <CountdownTimer expirationDate={user.current.balances[4][0].expiration_date} cl={"rune3Time"} />}

<div className="rune4Wrapper">
  {!isEmptyArray(user.current.balances[5]) && <img src={rune4} alt="" />}
</div>
{!isEmptyArray(user.current.balances[5]) && <CountdownTimer expirationDate={user.current.balances[5][0].expiration_date} cl={"rune4Time"} />}
        <button
          type="button"
          onClick={toggleInviteFriendsDrawer}
          className="inviteWrapper"
        >
          <img src={inviteFriends} alt="" />
        </button>
        <button
          type="button"
          onClick={toggleShopDrawer}
          className="shopWrapper"
        >
          <img src={shop} alt="" />
        </button>
        <div className="manaWrapper">
          <img src={mana} alt="" />
          <button className="manaAddWrapper" onClick={toggleManaDrawer}>
            <img src={add} alt="" />
          </button>
          <div className="content">
            <p className="manaText">Mana</p>
            <ProgressBar
              completed={user.current.mana}
              className="progressBar"
              bgColor="#fec14d"
              labelColor="black"
              labelAlignment="left"
              borderRadius={5}
              maxCompleted={100}
              baseBgColor="#204061"
              barContainerClassName="barContainerClassName"
            />
          </div>
        </div>
      </div>
      <div className="backgroundWrapper">
        <img src={backgroundGeneral} alt="" />
      </div>
      <div className="profileIconWrapper">
        <img src={profileIcon} alt="" />
        <Link to="/profile" className="link" />
      </div>
      <button
        type="button"
        onClick={toggleStoryDrawer}
        className="questionWrapper"
      >
        <img src={question} alt="" />
      </button>
      <div className="generalBalanceContainer">
        <div className="balanceFigure1Wrapper">
          <img src={balanceFigure1} alt="" />
          <p className="tonBalance">{user.current.real_balance} ton</p>
        </div>
        <div className="balanceFigure2Wrapper">
          <img src={balanceFigure2} alt="" />
          <p className="fehuBalance">{user.current.fehu_balance} $fehu</p>
        </div>
        <div className="addWrapper">
          <img src={add} alt="" onClick={()=>{setHasModal(!hasModal)}} />
        </div>
      </div>
      <InviteFriendsDrawer
        isOpen={isOpenInvite}
        toggleDrawer={toggleInviteFriendsDrawer}
      />
      <ShopDrawer isOpen={isOpenShop} toggleDrawer={toggleShopDrawer} />
      <ManaDrawer userMana={user.current.mana} isOpen={isOpenMana} toggleDrawer={toggleManaDrawer} />
      <StoryDrawer isOpen={isOpenStory} toggleDrawer={toggleStoryDrawer} />
      {hasModal && <UserFooter setHasFooter={setHasModal} modalType={MODAL_TYPES.REFILL} />}
    </div>
  );
}

export default GeneralPage;
