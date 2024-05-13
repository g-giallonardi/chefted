import styles from './MealPrepModal.module.scss'

const ThemeCard = ({name}) => {

    return (
        <div className={`card`}>
            {name}
        </div>
    )
}

function MealPrepModal(){

    return (
        <div>
            <div className={'modal'}>
                <div className={'modal-header'}>
                    <h2>Dites-moi en plus...</h2>
                </div>
                <div className={'modal-content'}>
                    <h3>1. Preferences </h3>
                        <ThemeCard name={`Asiatique`} />
                        <ThemeCard name={`Indien`}/>
                    <h3>2. Thématique </h3>
                    <h3>3. Batch cooking </h3>
                </div>
            </div>
            <div className={`blurred`}></div>
        </div>

    );
}

export default MealPrepModal;