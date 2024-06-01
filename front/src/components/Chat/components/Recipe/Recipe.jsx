import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import { CookingPot } from 'lucide-react';
export default function Recipe({children, sendMessage}){
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <div
                        className='flex flex-row gap-1  underline'
                        onClick={()=>sendMessage(`J'aimerais en savoir plus, à propose de la recette : ${children}`)}
                    >
                        <CookingPot className='h-4 w-4' /> {children}
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>En savoir plus sur cette recette</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}