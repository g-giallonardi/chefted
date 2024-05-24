import styles from './Chat.module.scss'
import {useEffect, useRef, useState} from "react";
import useSse from "../../../hooks/useSse.js";
import {user} from "../../data/user.mock.js"
import Message from "./components/Message/Message.jsx";
import IsTyping from "@/components/Chat/components/IsTyping/IsTyping.jsx";
import { Maximize2, Send } from 'lucide-react';

function Chat(){
    const { execute, data, error,setError, isLoading } = useSse()
    const [currentMessage, setCurrentMessage] = useState('')
    const [messages, setMessages] = useState([
        {
            type: 'system',
            content : `Bonjour ${user.firstname}! Comment puis-je vous aider ?`
        }
        ])
    const [expand, setExpand] = useState(false)

    useEffect(() => {
        const newMessages = data.map((d)=>{
            return {type: 'other', content : d}
        })
        setMessages([...messages, ...newMessages])
    }, [data]);

    function sendMessage(){
        setError('')
        if(currentMessage) {
            const newMessage = {type: 'user', content :currentMessage}
            console.info('message', currentMessage)
            execute('POST', '/api/chat/message', {user, message: currentMessage});
            setMessages([...messages, newMessage])
            setCurrentMessage('')
        }
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
        <div
            className={`flex flex-col fixed backdrop-blur bottom-1 right-3 bg-white/10 rounded-lg border border-primary ${expand ? 'max-w-2xl w-2xl  max-h-[600px] h-[600px]' : 'max-w-md w-md max-h-[400px] h-[400px] '} transition-all`}>
            <Maximize2 className={` absolute rotate-90 text-slate-500 translate-x-1 translate-y-1 h-5 hover:h-6 hover:scale-110 transition-all`} onClick={() => setExpand(!expand)}/>
            <div className={`flex flex-col border-b  w-full overflow-y-scroll h-full gap-2  p-3 pl-7`}>
                {
                    messages.filter(
                        (message) => message.content
                    ).map(
                        (message, i) => <Message key={i} message={message}/>
                    )
                }
                {isLoading && <IsTyping/>}
                {error && <span className='text-destructive text-xs self-end'>{error}</span>}
                <AlwaysScrollToBottom/>
            </div>
            <div className={`flex flex-row w-full items-center justify-center mx-2`}>
                <input placeholder='Ecrivez...' type="text"
                           className=' rounded-xl w-full bg-white px-3 py-2 shadow mr-3 border my-4 focus:outline-none bg-muted'
                           value={currentMessage}
                           onKeyDown={handleKeyPress}
                           onChange={(e) => setCurrentMessage(e.target.value)}/>

                    <Send className={`mr-5  shadow rounded-2xl p-2 h-10 w-10 ${currentMessage ? ' bg-primary/50 hover:bg-primary hover:shadow-inner hover:translate-y-0.5 hover:cursor-pointer' : 'bg-muted'} transition-all`}
                        onClick={sendMessage}
                    />

            </div>
        </div>
    );
}

export default Chat;