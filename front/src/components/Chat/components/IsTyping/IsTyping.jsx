export default function IsTyping(){

    return (
        <div className='flex h-screen dark:invert font-light text-xs '>
            <span className='sr-only'>Loading...</span>
            ChefTed is typing
            <div className=' animate-bounce [animation-delay:-0.3s]'>.</div>
            <div className='animate-bounce [animation-delay:-0.15s]'>.</div>
            <div className=' animate-bounce'>.</div>
        </div>
    );
}