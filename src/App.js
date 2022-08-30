import './App.css';
import Pokeballs from './components/Pokeballs';
import PokemonCard from './components/PokemonCard';
import PokemonCatchCounter from "./components/PokemonCatchCounter"
import {useState, useEffect} from 'react' 


function App() {
  const[listCapture, setListCapture] = useState([])
  const[listFreeRandomPokemon, setListFreeRandomPokemon] = useState([])
  const[listPokeballs, setListPokeballs] = useState([])
  const[money, setMoney] = useState(500)


  function callFreePokemons() {
    
    const randomId = Math.floor(Math.random() * 100)
    const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`

    fetch(url)
    .then(response => response.json()
    .then(data => {
      setListFreeRandomPokemon([...listFreeRandomPokemon, data])
    }))
  }
  function capturedPokemons() {
    var storePokemons = JSON.parse(localStorage.getItem("capturedPokemons"))
    setListCapture(storePokemons)
  }
  useEffect(() => {
    numberOfPokeballs()
    capturedPokemons()
  }, [])

  useEffect(() => {
    if(listFreeRandomPokemon.length < 10) {
      callFreePokemons()
    }
  }, [listFreeRandomPokemon])

  function numberOfPokeballs() {
    const arrPokeballs = []
    if(money > 100) {
      const numberOfPokeballs = money / 100
      for(let i = 0; i < numberOfPokeballs; i++) {
        arrPokeballs.push(i)
      }
      setListPokeballs(arrPokeballs)
      setMoney(0)
    }
  }
  function getPoints(event) {
    const reference = event.target.parentNode.id
    let pokemonSelected = {}
    listFreeRandomPokemon.find((pokemon, index) => {
      if(pokemon.id === parseInt(reference) && listPokeballs.length > 0) {
        pokemonSelected = pokemon
        setMoney(money + pokemonSelected.base_experience)
        //delete the pokemons selected from the freepokemon
        console.log(index)
        listFreeRandomPokemon.splice(index, 1)
        listPokeballs.pop()
        setListCapture([...listCapture, pokemon])
        //send the selected pokemon to the local storage and display a list with the pokemon that are save in local storage
        localStorage.setItem('capturedPokemons', JSON.stringify([...listCapture, pokemon]))
      }
    
    })
    
   console.log('no pokeballs')
   
  }

 
  return (
    <div className="background_1">
      <div className='nav-bar'>
        {listPokeballs.map((pokeball) => {
          return(
            <Pokeballs />
          )
        })}
        <h1>Points</h1>
        <span>{money}</span>
        
      </div>
      <div className='catch-list'>
          {listCapture.map((captured) => {
            return(
              <PokemonCatchCounter image={captured.sprites.front_default}/>
            )
          })}
        </div>
      <div className='freepokemon-container'>
        {listFreeRandomPokemon.map((freePokemon) => {
          return(
            <PokemonCard name={freePokemon.name}  frontImage={freePokemon.sprites.front_default} getPoints={getPoints} idPokemon={freePokemon.id} exp={freePokemon.base_experience}/>
          )
        })}
      </div>
    </div>
  );
}

export default App;
