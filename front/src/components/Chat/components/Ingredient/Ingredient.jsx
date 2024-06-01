import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import { ShoppingBasket } from 'lucide-react';

export default function Ingredient({children, sendMessage}){
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <div
                        className='flex flex-row gap-2 underline'

                    >
                        <ShoppingBasket className='h-4 w-4' /> {children}
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Ajouter "{children} à la liste de course</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}