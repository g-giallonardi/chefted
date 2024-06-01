import {useState} from "react";
import Meal from "./components/Meal.jsx";
import {user} from "../../../../assets/mock/user.mock.js";
import {Button, Chip, Skeleton, Stack} from "@mui/material";
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import ChangeMenuDialog from "../ChangeMenuDialog/ChangeMenuDialog.jsx";

import {userSettings} from "@/assets/mock/userSettings.js";
import {mealPreset} from "@/assets/mock/mealPreset.js";
import {cn} from "@/lib/utils.js";

function Menu(){
    const [isLoading, setIsLoading] = useState(false)
    const [selectedDay, setSelectedDay ] = useState(0)
    const [recipes, setRecipes] = useState(mealPreset)

    const [ mealPrepSettings, setMealPrepSettings] = useState({
       userSettings
    })

    function daysForLocale(localeName = 'fr-FR', weekday = 'long') {
        const {format} = new Intl.DateTimeFormat(localeName, { weekday });
        return [...Array(7).keys()]
            .map((day) => format(new Date(Date.UTC(2021, 5, day))));
    }

    function handleSelectDay(dayIndex){
        setSelectedDay(dayIndex)
    }

    function fillInMissingMeals(meals){
        if (meals.length === 7) {
            return meals
        } else {
            const missingDay = 7 - meals.length
            for (let i = 1; i <= missingDay; i++) {
                meals.push(meals[Math.floor(Math.random() * meals.length)]);
            }
            return meals
        }
    }

    return (
        <div className='w-full lg:ml-20 md:ml-9 ml-3 '>
            <div className={`flex flex-row mx-auto gap-10 justify-center w-full`}>
                <div className={`flex flex-col border-l-4 `}>
                    {daysForLocale().map(
                        (day, i) => <div key={i}
                                         className={`flex flex-col
                                             h-20 -translate-y-3 aspect-square
                                              before:bg-primary before:w-4 before:h-4 before:rounded-full
                                              before:-translate-x-2.5 before:translate-y-5
                                             
                                              ${selectedDay === i ? 
                                                'font-bold before:scale-150 before:border-4 before:bg-white before:border-primary'
                                                : 'hover:before:bg-primary hover:before:scale-150 before:transition-all ' +
                                             'hover:before:border-4 hover:before:border-primary ' +
                                             'hover:cursor-pointer'
                                                }
                                              `}
                                         onClick={() => handleSelectDay(i)}>
                            <div>
                                <div className='ml-5 '>{day}</div>
                                <div className=' text-lg font-bold'>{i + 12}</div>
                            </div>

                        </div>
                    )}
                </div>

                <div className={`flex flex-col w-full`}>
                    Menu du
                    <div className={`flex flex-row w-full items-end gap-2`}>
                        <div className=' text-lg font-bold '>{daysForLocale()[selectedDay]}</div>
                        <div className=' text-2xl font-bold'>{selectedDay + 12}</div>
                    </div>
                    <div className='flex flex-col gap-4 justify-center h-full'>
                        {isLoading ?
                            <>
                                <Skeleton className={`mr-5`} variant="rounded" width={345} height={200}/>
                                <Skeleton variant="rounded" width={345} height={200}/>
                            </> :
                            <>
                                <Meal currentMeal={recipes.menu[selectedDay].midi} type='0' />
                                <Meal currentMeal={recipes.menu[selectedDay].soir} type='1' />
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu