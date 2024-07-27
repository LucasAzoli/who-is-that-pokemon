import styles from './404.module.css';
import Image from 'next/image';
import logo from '../public/logo.png';
import pokeball from '../public/pokeball.svg';

export default function NotFound() {
    return (
    <div className={styles.menu}>
        <Image className={styles.logo} priority={true} src={logo} alt="logo"></Image>
        <div className={styles.error}>
            <div>
                <h1>4</h1>
                <Image className={styles.pokeball} src={pokeball} alt='pokebola'></Image>
                <h1>4</h1>
            </div>
            <h3>Página não encontrada</h3>
        </div>
    </ div>
    )
}