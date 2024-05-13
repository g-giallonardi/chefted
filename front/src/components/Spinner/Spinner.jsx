import styles from './Spinner.module.scss'
function Spinner(){
    return(
        <span className={`${styles.loader}`}></span>
    )
}

export default Spinner;