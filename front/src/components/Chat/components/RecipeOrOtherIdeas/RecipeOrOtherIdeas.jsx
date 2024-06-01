import { ReceiptText } from 'lucide-react';
import { Repeat2 } from 'lucide-react';
export default function RecipeOrOtherIdeas({sendMessage}){
    return (
        <div className='flex flex-row gap-2'>
            <div
                className='flex flex-row gap-1 underline hover:cursor-pointer'
                onClick={()=>sendMessage(`Oui je veux bien la recette`)}
            ><ReceiptText className='h-4 w-4'/> La recette</div>
            <div> ou </div>
            <div
                className='flex flex-row gap-1 underline hover:cursor-pointer'
                onClick={()=>sendMessage(`Non, donne moi d'autres recettes s'il te plait`)}
            ><Repeat2 className='h-4 w-4'/> D'autres idées</div>
        </div>
    );
}