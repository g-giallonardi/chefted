import {PawPrint} from 'lucide-react';

export default function ChatButton({onClick}){
    return (
        <div className='fixed flex bottom-3 right-3
        border rounded-full h-14 w-14
        shadow-2xl
        items-center justify-center
        hover:cursor-pointer
        bg-gradient-to-r from-primary/70 to-primary/10
        hover:from-primary/90 hover:to-primary/30
        animate-bounce
        transform active:scale-75 transition-all '
        onClick={onClick}>
            <PawPrint />
        </div>
    );
}