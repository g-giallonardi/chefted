import styles from './Chat.module.scss'
import {useEffect, useRef, useState} from "react";
import useSse from "../../../hooks/useSse.js";
import {user} from "../../data/user.mock.js"
import Message from "./components/Message.jsx";

function Chat(){
    const { execute, data, isLoading } = useSse()
    const [currentMessage, setCurrentMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [expand, setExpand] = useState(false)

    useEffect(() => {
        const newMessages = data.map((d)=>{
            return {type: 'other', content : d}
        })
        setMessages([...messages, ...newMessages])
    }, [data]);

    function sendMessage(){
        const newMessage = {type: 'user', content :currentMessage}
        execute('POST', '/api/chat/message', {user,message:currentMessage});
        setMessages([...messages, newMessage])
        setCurrentMessage('')
    }

    function handleKeyPress(e){
        if(e.key === 'Enter'){
            sendMessage()
        }
    }

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    return (
        <div className='flex flex-col fixed backdrop-blur bottom-1 right-3 bg-white/10 rounded-lg border border-primary'>
            <i className={`fas fa-expand-arrows-alt`} onClick={()=>setExpand(!expand)}></i>
            <div className={`flex flex-col border-b h-60 w-full max-w-xs overflow-y-scroll h-full gap-2 mx-2`}>
                {
                    messages.map(
                        (message, i) => <Message key={i} message={message}/>
                    )
                }
                <AlwaysScrollToBottom />
            </div>
            <div className={`justify-center flex w-full `}>
                <input placeholder='Ecrivez...' type="text"
                       className='w-full mx-1 my-1 focus:outline-none focus:ring-1 focus:ring-primary/20'
                       value={currentMessage}
                       onKeyDown={handleKeyPress}
                       onChange={(e) => setCurrentMessage(e.target.value)}/>
            </div>
        </div>
    );
}

export default Chat;