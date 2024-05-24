import styles from "./Message.module.scss";

function Message({message}){

    const classMessageType = message.type === 'user' ? styles.userMessage : styles.chefMessage

    return (
        <div className={`flex flex-col w-full  `}>
            <div className={`flex font-light text-xs w-full ${message.type === 'user' && 'justify-end'}`}>
                 {message.type === 'user' ? 'vous' : 'ChefTed'}
            </div>
            <div className={`flex font-light   rounded-lg py-2 px-2 max-w-[70%] w-fit text-sm backdrop-blur text-white ${message.type === 'user' ? 'self-end bg-slate-500' : 'bg-primary/70'}`}>
               {message.content}
            </div>

        </div>
    )
}

export default Message;