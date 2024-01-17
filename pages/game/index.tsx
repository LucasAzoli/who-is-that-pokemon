import { useEffect, useState } from 'react';
import { Data } from '../../types/data';
import { Pokemon } from '../../types/pokemon';
import Div from '../../components/div';
import styles from './game.module.css';
import Image from 'next/image';
import arrow from '../../public/arrowforward.svg';
import Link from 'next/link';

export default function Game() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemonNumber, setPokemonNumber] = useState<number>(0);
  const [current, setCurrent] = useState<number>(0);
  const [record, setRecord] = useState<number>(0);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemonsList, setPokemonsList] = useState<Pokemon[]>([]);
  const [filter, setFilter] = useState<boolean>(true);

  const [option, setOption] = useState<Pokemon>();

  const [endRound, setEndRound] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const r = localStorage.getItem('record');
    if (r != null) {
      if (parseInt(r) > 0) {
        setRecord(parseInt(r));
      } else {
        localStorage.setItem('record', '0');
      }
      
    }

    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then((response) => 
      response.json()
    )
    .then((data: Data) => {
      setPokemonsList(data.results);
      newQuiz(data.results)
    })
  }, [])

  const newQuiz = (data: Pokemon[]) => {
    setLoading(true);
    let pokemonsRandom: Pokemon[] = [];

    const numbers = Array(100).fill(0).map((_, index) => index + 1);
    numbers.sort(() => Math.random() - 0.5);

    for (let i = 0; i <4; i++) {
      pokemonsRandom.push(data[numbers[i]]);
    }

    setPokemons(pokemonsRandom);
    let number = randomNumberInRange(0, 3);
    setPokemonNumber(data.indexOf(pokemonsRandom[number]));
    setPokemon(pokemonsRandom[number]);

    setLoading(false);
  }

  const randomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random()*(max - min + 1)) + min;
  };

  const chooseOption = (option: Pokemon) => {
    setOption(option);
    setFilter(false);
    setEndRound(true);
    if (pokemonNumber == pokemonsList.indexOf(option)) {
      if (current + 1 > record) {
        setRecord(current + 1);
        localStorage.setItem("record", (current+1).toString());
      }
      setCurrent(current + 1);
    } else {
      setCurrent(0); 
    }
    setTimeout(() => {
      setFilter(true);
      newQuiz(pokemonsList);
      setEndRound(false);
    }, (2000))
  }

    return (
      <div className={styles.game}>
        {!loading ?
          <>
            <Link href='/' className={styles.arrow}><Div><Image src={arrow} width={67} height={67} alt="Seta circular" /></Div></Link>
            <div className={styles.quiz}>
              <div className={styles.pokemonImage}>
                <img className={filter ? styles.filter : styles.image} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonNumber + 1}.svg`} alt="" />
              </div>

              <Div>Who is that Pokémon ?</Div>
              
              
              <div className={styles.answers}>
                {pokemons.map((item) => 
                  <Div 
                  color={item.name == pokemon?.name && endRound ? '#8BC43F' : item.name != pokemon?.name && endRound && item.name == option?.name ? '#ED1C24' : ''}
                  button={true}
                  key={item.name}>
                    <button onClick={() => {chooseOption(item)}} key={item.name}>{item.name}</button>
                  </Div>
                )}
              </div>
              
            </div>
            <div className={styles.current}><Div> Current <br /> {current}</Div></div>
            <div className={styles.record}><Div> Record <br /> {record}</Div></div>
          </>
          : <p>loading...</p>
        }
        
      </div>
    )
}