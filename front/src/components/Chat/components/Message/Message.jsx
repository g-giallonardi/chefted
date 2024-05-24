import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import chefTedAvatar from '@/assets/images/chedTed_avatar.png'
import userAvatar from '@/assets/images/user_avatar.png'

function Message({message}){

    return (
        <div className={`flex flex-col w-full`}>
            <div className={`flex font-light text-xs w-full  ${message.type === 'user' && 'flex-row-reverse'}`}>
                 {message.type === 'user' ? 'vous' : 'ChefTed'}
            </div>
            <div className={`flex flex-row gap-2 ${message.type === 'user' && 'flex-row-reverse'}`}>
                <div>
                    <img src={message.type === 'user'? userAvatar : chefTedAvatar} className='h-8 aspect-square' alt=""/>
                </div>
                <div
                    className={`flex font-light rounded-lg py-2 px-2 max-w-[70%] w-fit text-sm backdrop-blur text-white ${message.type === 'user' ? 'self-end bg-slate-500' : 'bg-primary/70'}`}>
                    {message.content}
                </div>
            </div>


        </div>
    )
}

export default Message;