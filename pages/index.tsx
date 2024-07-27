import type { NextPage } from 'next'
import styles from './index.module.css';
import Div from '../components/div';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.png';

const Home: NextPage = () => {
  return (
    <div className={styles.menu}>
      <Image src={logo} alt="logo" priority={true}></Image>
      <div className={styles.options}>
        <Link href='/game'><Div button={true}>Start</Div></Link>
        <Link href='/about'><Div button={true}>About</Div></Link>
        <Link href='/settings'><Div button={true}>Options</Div></Link>
      </div>
    </ div>
  )
}

export default Home
