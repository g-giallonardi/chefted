import './App.css'
import Homepage from "./pages/Homepage/Homepage.jsx";
import Header from "./components/Header/Header.jsx";

function App() {

  return (
      <div className={`flex d-flex flex-fill justify-content-center appContainer `}>
        <Header/>
        <div className={` mainContainer`}>
            <Homepage/>
        </div>
    </div>
  )
}

export default App
