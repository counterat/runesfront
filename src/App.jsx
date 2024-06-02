import { useState, useEffect } from "react";
import ProfilePage from "./pages/ProfilePage";
import FirstPage from "./pages/FirstPage";
import { Routes, Route, json, Navigate  } from "react-router-dom";
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

  var invitCode = pathname.current.split('/')[1]

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const isTest = true;

  useEffect(() => {
    var WebApp = window.Telegram.WebApp; 

    WebApp.expand()
  var initdata = WebApp.initData 

    socket.onmessage = function(event) {
      let data = (event.data)
      
      data = JSON.parse(data)
      alert(JSON.stringify(data))
      if (data.eventname == 'income_for_frog'){
        console.log(data.user)
        dispatch(setUser(data.user))
      }
      if (data.eventname == 'paid_invoice'){
        alert(JSON.stringify(data))

        if (data.id == user.current.id){
          dispatch(setUser(data.user))
        }
      }
    }
                
    if (isTest){
    authorise(initdata, invitCode).then(json=>{
        console.log(json)
       dispatch(setUser(json))
   
    setLoading(false)


      }) 
    
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default App;
