
function PokemonCard(props) {
    const randomPositionY = Math.floor(Math.random() * 100)
 
  return (
    <span className="pokemon-card" onClick={props.getPoints} id={props.idPokemon} >
        <h3>{props.name}</h3>
        <img src={props.frontImage} id={props.exp}/>
    </span>
  );
}

export default PokemonCard;
