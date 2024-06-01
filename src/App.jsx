import { useState, useEffect } from "react";
import ProfilePage from "./pages/ProfilePage";
import FirstPage from "./pages/FirstPage";
import { Routes, Route, json } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GeneralPage from "./pages/GeneralPage";
import { useRef } from "react";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "react-modern-drawer/dist/index.css";
import { authorise } from "./api/authorise";
import { setUser } from "./redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const user = useRef()
  user.current = useSelector(state=>state.user.user)
  const pathname = useRef();
  pathname.current = window.location.pathname;
  alert(pathname.current)
  var invitCode = pathname.current.split('/')[1]
  alert(invitCode)
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const isTest = true;

  useEffect(() => {
    var WebApp = window.Telegram.WebApp; 

    WebApp.expand()
   /*  var initdata = WebApp.initData  */

    socket.onmessage = function(event) {
      let data = (event.data)
      data = JSON.parse(data)

      if (data.eventname == 'income_for_frog'){
        console.log(data.user)
        dispatch(setUser(data.user))
      }
      if (data.eventname == 'paid_invoice'){
        if (data.id == user.current.id){
          dispatch(setUser(data))
        }
      }
    }
                
    if (isTest){
    /*   authorise(initdata, invitCode).then(json=>{
        console.log(json)
       dispatch(setUser(json))
       alert( JSON.stringify(json))
    setLoading(false)


      }) */
      dispatch(setUser({'id': 7712793, 'sign': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ODgxNzA0ODkzLCJwYXNzd29yZCI6IjAxZTQ2YTg1LTFmM2MtNGNkZS04OTM0LTVjMDgzYjlmMGRlZiJ9.a5dfCs-_O_liSpPBihJUYlN8IrkiZfIUYH5Z0_XLhTk', 'telegram_id': 881704893, 'name': 'Gorilla', 'mana': 100, 'fehu_balance': '0', 'username': 'gorilla_bsrb', 'invited_by': 7712786, 'invitation_code': 166123632, 'invited_users': [], 'real_balance': '0', 'balances': {'1': [], '2': [], '3': [], '4': [], '5': []}, 'amount_of_money_withdrawed': 0.0, 'amount_of_money_topupped': 0.0, 'profit': '0', 'created_at': '2024-06-01 22:20:48.775993'}))
      setLoading(false)
    }
  }, []);


  return (
    <div className="app">
      {loading ? (
        <FirstPage />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<GeneralPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default App;
