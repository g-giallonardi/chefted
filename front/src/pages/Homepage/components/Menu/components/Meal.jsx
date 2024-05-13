import {useState} from "react";
import mealImage from '../../../../../assets/images/mexican_meal.jpeg'
import {user} from "../../../../../data/user.mock.js"
import Spinner from "../../../../../components/Spinner/Spinner.jsx";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia, Collapse,
    IconButton,
    Typography
} from "@mui/material";
import { yellow} from "@mui/material/colors";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {ExpandMore} from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Meal({currentMeal}){

    const [expanded, setExpanded] = useState(false);
    const [meal, setMeal] = useState(currentMeal)
    const [isLoading, setIsLoading] = useState(false)

    const payload = {currentMeal:meal, user}

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
                <Card className={`mr-5`} sx={{ maxWidth: 345 }}>
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: yellow[500] }}>
                            <WbSunnyIcon />
                          </Avatar>
                        }
                        title={currentMeal}
                      />
                      <CardMedia
                        component="img"
                        height="194"
                        image={mealImage}
                        alt="Paella dish"
                      />
                      <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                          <FavoriteIcon />
                        </IconButton>
                        <ExpandMore
                          expand={expanded.toString()}
                          onClick={handleExpandClick}
                          aria-expanded={expanded}
                          aria-label="show more"
                        >
                          <ExpandMoreIcon />
                        </ExpandMore>
                      </CardActions>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                          <Typography paragraph>Method:</Typography>
                          <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                            aside for 10 minutes.
                          </Typography>
                          <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                            large plate and set aside, leaving chicken and chorizo in the pan. Add
                            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                            stirring often until thickened and fragrant, about 10 minutes. Add
                            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                          </Typography>
                          <Typography paragraph>
                            Add rice and stir very gently to distribute. Top with artichokes and
                            peppers, and cook without stirring, until most of the liquid is absorbed,
                            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                            mussels, tucking them down into the rice, and cook again without
                            stirring, until mussels have opened and rice is just tender, 5 to 7
                            minutes more. (Discard any mussels that don&apos;t open.)
                          </Typography>
                          <Typography>
                            Set aside off of the heat to let rest for 10 minutes, and then serve.
                          </Typography>
                        </CardContent>
                      </Collapse>
                </Card>
            }
        </div>
    )
}

export default Meal;