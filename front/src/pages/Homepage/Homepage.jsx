import Menu from "./components/Menu/Menu.jsx";
import Chat from "../../components/Chat/Chat.jsx";

function Homepage(){

    return (
        <div className={`flex flex-col max-w-3xl w-full justify-center `}>
            <Menu/>
            <Chat/>
        </div>
    )
}

export default Homepage;