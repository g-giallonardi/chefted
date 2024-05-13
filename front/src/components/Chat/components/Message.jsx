import styles from "./Message.module.scss";

function Message({message}){

    const classMessageType = message.type === 'user' ? styles.userMessage : styles.chefMessage

    return (
        <div className={`${styles.message} ${classMessageType} ${styles.clearfix}`}>
            {message.content}
        </div>
    )
}

export default Message;