import { useEffect, useState } from 'react';
import { Data } from '../../types/data';
import { Pokemon } from '../../types/pokemon';
import Div from '../../components/div';
import styles from './game.module.css'

export default function Game() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemonNumber, setPokemonNumber] = useState(0);
  const [current, setCurrent] = useState(0);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemonsList, setPokemonsList] = useState<Pokemon[]>([]);

  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
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
    if (pokemonNumber == pokemonsList.indexOf(option)) {
      newQuiz(pokemonsList);
      setCurrent(current + 1);
    } else {
      setCurrent(0);
      newQuiz(pokemonsList);
    }
  }

    return (
      <div className={styles.game}>
        {!loading ? 
          <div className={styles.quiz}>
            <div className={styles.pokemonImage}>
              <img className={styles.image} width={300} height={300} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonNumber + 1}.svg`} alt="" />
            </div>
            
            {/* <Div ><h2>Number is: {current}</h2></Div>
            <Div ><h2>Number is: {pokemon?.name}</h2></Div>
            <Div >
              <button onClick={() => newQuiz(pokemonsList)}>
                Click Me Generate
              </button>
            </Div> */}

            <Div button={false} >Who is that Pokémon ?</Div>
            
            
            <div className={styles.answers}>{pokemons.map((item) => <Div button={true} key={item.name}><button onClick={() => {chooseOption(item)}} key={item.name}>{item.name}</button></Div>)}</div>
            
          </div>
          : <p>loading...</p>
        }
        
      </div>
    )
}