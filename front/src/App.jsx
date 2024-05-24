import './App.css'
import Homepage from "./pages/Homepage/Homepage.jsx";
import Header from "./components/Header/Header.jsx";
import {Outlet} from "react-router-dom";
import {Suspense} from "react";

function App() {

  return (
      <div className={`flex flex-col  items-center min-h-screen h-full`}>
        <Header/>
        <div className=' flex max-w-6xl  w-full '>
            <Suspense fallback={'Loading...'}>
                <Outlet />
            </Suspense>
        </div>
    </div>
  )
}

export default App
