import styles from './Chat.module.scss'
import {useEffect, useRef, useState} from "react";
import useSse from "../../../hooks/useSse.js";
import {user} from "../../data/user.mock.js"
import Message from "./components/Message/Message.jsx";
import IsTyping from "@/components/Chat/components/IsTyping/IsTyping.jsx";
import {Maximize2, Send, ChevronDown, Minimize2} from 'lucide-react';
import ChatButton from "@/components/Chat/components/ChatButton/ChatButton.jsx";

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
    const [collapse, setCollapse] = useState(true)


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
        <>
            <div className={collapse? 'visible' : 'hidden'}>
                <ChatButton onClick={() => setCollapse(false)}/>
            </div>
        <div
            className={`flex flex-col fixed backdrop-blur bottom-1 right-3 bg-white/10 rounded-lg border border-primary ${expand ? 'max-w-2xl w-full h-[calc(100vh-45px)]' : 'max-w-xs md:max-w-md w-md max-h-[400px] h-[400px] '} ${collapse ? ' scale-0' : ' scale-100' } transition-all`}>
            <div className='flex bg-primary border-b w-full h-16 text-lg font-bold items-center justify-between pl-2 pr-4 text-white shadow-lg'>
                <div className='flex flex-row py-2 self-start text-primary-foreground '>
                    {expand ?
                        <Minimize2 className={`rotate-180  h-4 hover:opacity-70 transition-all self-start hover:cursor-pointer`} onClick={() => setExpand(!expand)}/>
                    :   <Maximize2 className={`rotate-180  h-4 hover:opacity-70 transition-all self-start hover:cursor-pointer`} onClick={() => setExpand(!expand)}/>

                    }
                    <ChevronDown  className={` h-5 hover:opacity-70 transition-all self-start hover:cursor-pointer`} onClick={() => setCollapse(!collapse)}/>
                </div>
                <span className='text-primary-foreground'>
                    Chef Ted
                </span>
            </div>
            <div className={`flex flex-col border-b  w-full overflow-y-scroll h-full gap-2 p-3 pl-7 `}>
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
            <div className={`flex flex-row w-full items-center justify-center  mx-2`}>
                <input placeholder='Ecrivez...' type="text"
                           className=' rounded-xl w-full bg-white px-3 py-2 shadow mr-3 border my-4 focus:outline-none bg-muted font-light text-sm'
                           value={currentMessage}
                           onKeyDown={handleKeyPress}
                           onChange={(e) => setCurrentMessage(e.target.value)}/>

                    <Send className={`mr-5  shadow rounded-2xl p-2 h-10 w-10  ${currentMessage ? ' bg-primary/50 hover:bg-primary hover:shadow-inner hover:translate-y-0.5 hover:cursor-pointer' : 'bg-muted'} transition-all`}
                        onClick={sendMessage}
                    />

            </div>
        </div>
        </>
    );
}

export default Chat;