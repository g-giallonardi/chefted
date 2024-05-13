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
        <div className={`${styles.chatContainer} flex d-flex flex-column flex-fill`}>
            <i className={`fas fa-expand-arrows-alt`} onClick={()=>setExpand(!expand)}></i>
            <div className={`${styles.feed} ${expand && styles.expandFeed}`}>
                {
                    messages.map(
                        (message, i) => <Message key={i} message={message}/>
                    )
                }
                <AlwaysScrollToBottom />
            </div>
            <div className={`justify-content-center ${styles.inputContainer} flex d-flex flex-fill`}>
                <input placeholder='Ecrivez...' type="text"
                       value={currentMessage}
                       onKeyDown={handleKeyPress}
                       onChange={(e) => setCurrentMessage(e.target.value)}/>
            </div>
        </div>
    );
}

export default Chat;