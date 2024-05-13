import {useState} from "react";
import styles from './Menu.module.scss'
import Meal from "./components/Meal.jsx";
import {user} from "../../../../data/user.mock.js";
import {Button, Chip, Skeleton, Stack} from "@mui/material";
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import ChangeMenuDialog from "../ChangeMenuDialog/ChangeMenuDialog.jsx";

function Menu(){
    const [isLoading, setIsLoading] = useState(false)
    const [selectedDay, setSelectedDay ] = useState(0)
    const [recipes, setRecipes] = useState({ menu : [
            {
                "midi": "Salade de quinoa au chorizo",
                "soir": "Poulet rôti aux légumes"
            },
            {
                "midi": "Pâtes au chorizo et aux légumes",
                "soir": "Saumon grillé avec ratatouille"
            },
            {
                "midi": "Salade de riz au chorizo et aux légumes",
                "soir": "Steak de bœuf avec purée de patates douces"
            },
            {
                "midi": "Omelette au chorizo et aux légumes",
                "soir": "Filet de poisson avec quinoa aux légumes"
            },
            {
                "midi": "Pizza au chorizo et aux légumes",
                "soir": "Côtelettes d'agneau avec haricots verts"
            },
            {
                "midi": "Tortilla au chorizo et aux légumes",
                "soir": "Escalopes de dinde avec salade verte"
            },
            {
                "midi": "Salade de pâtes au chorizo et aux légumes",
                "soir": "Risotto aux champignons"
            }
        ]})

    const [ mealPrepSettings, setMealPrepSettings] = useState({
        habit : 'flexitarien',
        allergies : [
            { name: 'Gluten', checked : false},
            { name: 'Lactose',checked : false},
            { name: 'Œufs',checked : false},
            { name: 'Poissons',checked : false},
            { name: 'Crustacés',checked : false},
            { name: 'Mollusques',checked : false},
            { name: 'Arachides',checked : false},
            { name: 'Fruits à coques',checked : false},
            { name: 'Céleri',checked : false},
            { name: 'Moutarde',checked : false},
            { name: 'Soja',checked : false},
            { name: 'Sésame',checked : false},
            { name: 'Lupin',checked : false},
            { name: 'Sulfites', checked : false},
        ],
        batchCooking: false
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

    function handleChangeMenu(){
        setIsLoading(true)
        const payload = { user}
        fetch('/api/meal/changeMenu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mealPrepSettings)
        })
            .then(response => response.json()) // Parses the response as JSON
            .then(data => {
                const completeWeek = fillInMissingMeals(data.menu)
                console.info('completeWeek', completeWeek)
                setRecipes({menu:  completeWeek})
                setIsLoading(false)
            }) // Do something with your data
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <ChangeMenuDialog open={open} handleClose={handleClose} handleChangeMenu={handleChangeMenu} mealPrepSettings={mealPrepSettings} setMealPrepSettings={setMealPrepSettings} / >
            <div className={`flex d-flex flex-fill flex-column align-items-center p-20`}>
                <div className={`flex d-flex flex-row flex-fill mb-20`}>
                    <Stack direction="row" spacing={1}>
                        {daysForLocale().map(
                            (day, i) => <Chip key={i} label={day} color="success" variant={selectedDay === i ? 'filled' : "outlined"} onClick={() => handleSelectDay(i)}/>
                        )}
                    </Stack>
                    <Button onClick={handleClickOpen} variant="contained" endIcon={<AutorenewOutlinedIcon />}>
                        Change Menu
                    </Button>
                </div>

                <div className={`flex d-flex flex-fill`}>
                    {isLoading ?
                        <>
                            <Skeleton className={`mr-5`} variant="rounded" width={345} height={200} />
                            <Skeleton variant="rounded" width={345} height={200} />
                        </> :
                        <div className={`flex d-flex flex-fill`}>
                            <Meal currentMeal={recipes.menu[selectedDay].midi}/>
                            <Meal currentMeal={recipes.menu[selectedDay].soir}/>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Menu