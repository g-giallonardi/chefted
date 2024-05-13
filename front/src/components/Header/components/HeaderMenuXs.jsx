import styles from "./HeaderMenuXs.module.scss"

function HeaderMenuXs(){
    return (
        <ul className={`${styles.menuContainer} card p-20`}>
            <li>Wishlist</li>
            <li>Log in</li>
        </ul>
    )
}

export default HeaderMenuXs