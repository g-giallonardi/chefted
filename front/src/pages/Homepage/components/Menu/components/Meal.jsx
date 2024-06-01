import {useState} from "react";
import mealImage from '../../../../../assets/images/mexican_meal.jpeg'
import {user} from "../../../../../assets/mock/user.mock.js"
import Spinner from "../../../../../components/Spinner/Spinner.jsx";
import { RefreshCw, Star, Heart } from 'lucide-react';

function Meal({currentMeal, type}){

    const [expanded, setExpanded] = useState(false);
    const [meal, setMeal] = useState(currentMeal)
    const [isLoading, setIsLoading] = useState(false)

    const payload = {currentMeal:meal, user}

    function hangeChangeMeal(){
        setIsLoading(true)
        fetch('/api/meal/change', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json()) // Parses the response as JSON
        .then(data => {
            setMeal(data.recipe)
            setIsLoading(false)
        }) // Do something with your data
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return(
        <div>
            {isLoading ?
                <Spinner /> :
                <div className='flex flex-col md:flex-row
                gap-2 shadow-sm
                h-full w-full
                border border-primary/30
                p-5 '>
                    <div className='flex justify-center'>
                        <img src={mealImage} alt="Meal" className='w-32  md:w-44 xl:w-58 aspect-square' />
                    </div>
                    <div className='flex flex-col w-full ml-5 flex-wrap justify-between my-2'>
                        <span className='text-lg font-bold'>{type === '0' ? 'Dejeuner' : 'Diner'}</span>
                        <span className='mb-2'>{currentMeal}</span>
                        <div className='flex flex-row justify-evenly w-full'>
                            <RefreshCw className='stroke-primary hover:animate-spin transition-all' onClick={hangeChangeMeal}/>
                            <Heart  className='stroke-primary hover:animate-pulse hover:stroke-red-300 transition-all'/>
                            <Star className='stroke-primary hover:animate-pulse hover:stroke-yellow-300 transition-all'/>
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}

export default Meal;