import Menu from "./components/Menu/Menu.jsx";
import Chat from "../../components/Chat/Chat.jsx";

function Homepage(){

    return (
        <div className={`flex flex-col w-full justify-center
         max-w-md md:max-w-xl lg:max-w-2xl mx-6`}>
            <h2 className='text-2xl font-bold m-5 self-start'>Mon menu de la semaine</h2>
            <Menu/>
            <Chat/>
        </div>
    )
}

export default Homepage;