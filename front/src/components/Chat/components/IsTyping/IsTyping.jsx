export default function IsTyping(){

    return (
        <div
            className='flex
            dark:invert font-bold text-lg border rounded-lg px-2 bg-primary/20
            w-fit transition-all h-fit'>
            <span className='sr-only'>Loading...</span>
            <div className='animate-bounce [animation-delay:-0.3s] font-bold text-3xl'>.</div>
            <div className='animate-bounce [animation-delay:-0.15s] font-bold text-3xl'>.</div>
            <div className='animate-bounce font-bold text-3xl'>.</div>
        </div>
    );
}