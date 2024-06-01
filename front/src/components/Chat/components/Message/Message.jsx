import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import chefTedAvatar from '@/assets/images/chedTed_avatar.png'
import userAvatar from '@/assets/images/user_avatar.png'
import reactStringReplace from 'react-string-replace';
import Recipe from "@/components/Chat/components/Recipe/Recipe.jsx";
import Ingredient from "@/components/Chat/components/Ingredient/Ingredient.jsx";
import RecipeOrOtherIdeas from "@/components/Chat/components/RecipeOrOtherIdeas/RecipeOrOtherIdeas.jsx";

function Message({message, sendMessage}){
    const recipeRegexp = /@@([^\]]+)@@/gi;
    const ingredientRegexp = /@!@([^\]]+)@!@/gi;
    const recipeOrOtherRegexp = /RECIPE\/\/\/OTHER/gi;
    let content = reactStringReplace(message.content, recipeRegexp, (match, idx) => (
                        <Recipe key={idx} sendMessage={sendMessage}>{match}</Recipe>
        ))
    content = reactStringReplace(content, ingredientRegexp, (match, idx) => (
                        <Ingredient key={idx} sendMessage={sendMessage}>{match}</Ingredient>
        ))
    content = reactStringReplace(content, recipeOrOtherRegexp, (match, idx) => (
                        <RecipeOrOtherIdeas sendMessage={sendMessage}/>

        ))

    return (
        <div className={`flex flex-col w-full`}>
            <div className={`flex font-light text-xs w-full  ${message.type === 'user' && 'flex-row-reverse'}`}>
                 {message.type === 'user' ? 'vous' : 'ChefTed'}
            </div>
            <div className={`flex flex-row gap-2 ${message.type === 'user' && 'flex-row-reverse'}`}>
                <div>
                    <Avatar>
                        <AvatarImage src={message.type === 'user'? userAvatar : chefTedAvatar} alt={message.type === 'user'? 'Votre avatar' : 'Avatar de Chef Ted'} />
                    </Avatar>
                </div>
                <div
                    className={`flex py-2 px-2 max-w-[70%] w-fit
                    font-light  text-xs  
                    rounded-lg backdrop-blur
                    mx-2
                    ${message.type === 'user' ? 'after:h-3 after:w-3 after:rotate-45 '+
                     'self-end after:-right-1 bg-slate-300 after:bg-slate-300 text-slate-700 after:fixed' 
                     : '  bg-primary text-slate-700 ' +
                        'before:inline-block before:absolute before:w-3 before:h-3 before:content-[\' jhjkhjk\'] before:text-black before:-rotate-45 before:-translate-x-3 '+
                     ' before:bg-primary  ' 
                    }
                    `}>
                    {content}
                </div>
            </div>


        </div>
    )
}

export default Message;