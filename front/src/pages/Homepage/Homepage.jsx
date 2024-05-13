import styles from './Homepage.module.scss'
import Menu from "./components/Menu/Menu.jsx";
import Chat from "../../components/Chat/Chat.jsx";
import chefImage from "../../assets/images/chefImage.png"
import MealPrepModal from "./components/MealPrepModal/MealPrepModal.jsx";

function Homepage(){

    return (
        <div className={`flex d-flex flex-column flex-fill`}>
            {/*<div className={`${styles.chefImgContainer}`}>*/}
            {/*    <img src={chefImage} alt="Image du chef Ted"/>*/}
            {/*</div>*/}
            {/*<MealPrepModal/>*/}
            <Menu/>
            <Chat/>
        </div>
    )
}

export default Homepage;