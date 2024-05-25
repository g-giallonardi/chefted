import Menu from "./components/Menu/Menu.jsx";
import Chat from "../../components/Chat/Chat.jsx";

function Homepage(){

    return (
        <div className={`flex flex-col w-full justify-center
         max-w-md md:max-w-xl lg:max-w-xl mx-6`}>
            <Menu/>
            <Chat/>
        </div>
    )
}

export default Homepage;