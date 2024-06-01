import {useState} from "react";

export default function QuickPanel({sendMessage}){
    const ideas= [
            // ['🍖 BBQ', '5 idées de recettes pour un barbecue, s\'il te plait'],
            // ['🇮🇳 Indien', '5 idées de recettes indienne, s\'il te plait'],
            // ['🥢 Asiatique', '5 idées de recettes asiatique, s\'il te plait'],
            ['🔮', '5 idées de plats au hasard, s\'il te plait'],
            ['🌭 Chill', '5 idées de recettes pour une soirée chill, s\'il te plait'],
            ['🍰 Dessert', '5 idées de gateaux, s\'il te plait'],
            ['🍎 Snack', '5 idées de recettes d\'en cas healthy, s\'il te plait']
        ]

    // Array.prototype.random = function () {
    //     return this[Math.floor((Math.random()*this.length))];
    // }
    //
    // const randomQuickIdeas = () => {
    //     const randomIndexes = Array.from({length: 3}, () => Math.floor(Math.random() * ideas.length));
    //     const randomIdeas = randomIndexes.map(index => ideas[index]);
    //     return randomIdeas
    // }

    return(
        <div className='flex flex-row gap-1 justify-end '>
            {
                ideas.map(
                    (idea,idx ) => <span
                        key={idx}
                        className='text-sm  border bg-primary text-primary-foreground rounded px-1 hover:opacity-50 hover:cursor-pointer'
                        onClick={()=>sendMessage(idea[1])}
                    >{idea[0]}</span>
                )
            }
        </div>
    )
}