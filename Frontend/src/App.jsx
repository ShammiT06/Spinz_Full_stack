import { BrowserRouter, Route, Routes } from "react-router-dom";
import Terms from "./Pages/Terms";
import Camera from "./Pages/Camera";
import Location from "./Pages/Location";
import User from "./Components/User";
import Payment from "./Pages/Payment";
import Reference from "./Pages/Referance";

import AdminLoginPage from "/src/Admin/AdminLogin.jsx"
import Tabs from "./Admin/Tabs.jsx"
import InnerPending from "./Admin/Pending/InnerPending.jsx"
import AdminPayment from "./Admin/AdminPayment.jsx"

import { createContext, useState } from "react";
import Tracking from "./SMS/Tracking.jsx";
import SMSForm from "../src/SMS/SMSForm.jsx";
import SupportRef from "../src/SMS/SupportRef.jsx";
import Dashboard from "./Admin/Dashboard.jsx";
import Pending from "./Admin/Pending/MainPending.jsx";


const ImageContext = createContext();
const Refcontext=createContext()

function App() {
  const [image, setimage] = useState();
  const [spin,setspin]=useState()

  return (
    <>
      <ImageContext.Provider value={{ image, setimage }}>
        <Refcontext.Provider value={{spin,setspin}}>
        <BrowserRouter>
          <Routes>
            {/* Vendor Page Routes */}
            <Route path="/" element={<Terms />} />
            <Route path="/cam" element={<Camera />} />
            <Route path="/loc" element={<Location />} />
            <Route path="/form" element={<User />} />
            <Route path="/pay" element={<Payment />} />
            <Route path="/ref" element={<Reference />} />
            {/* Admin Page Routes */}
            <Route path="/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<Tabs />} />
            <Route path="/pending/:id" element={<InnerPending />} />
            <Route path="/payout" element={<AdminPayment />} />
            <Route path="/dash" element={<Dashboard/>}></Route>
            <Route path="/pend" element={<Pending/>}>~</Route>
            {/* SMS Routes */}
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/smsform" element={<SMSForm />} />
            <Route path="/supportRef" element={<SupportRef />} />
          </Routes>
        </BrowserRouter>
        </Refcontext.Provider>
      </ImageContext.Provider>
    </>
  );
}

export default App;
export { ImageContext };
export {Refcontext}