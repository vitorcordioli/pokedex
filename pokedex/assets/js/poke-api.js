
const pokeApi = {}

function convertPokeApiDetail(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types //destructuring - pega o primeiro valor da variavel, mas se colocar, exemplo [type1, type2, type3] ele pega os valores na sequencia 

    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

//faz outro fetch para puxar a url de detalhes e transfroma ela em .json
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetail)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
    .then((response) => response.json()) //pega resultados da url e transforma em .json
    .then((jsonBody) => jsonBody.results) //filtra somente os resultados desse .json
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //mapeia o resultado de pokemons e utiliza da função de cima para já pegar as infromações em .json
    .then((detailRequest) => Promise.all(detailRequest)) //.all  obriga todas as promises terminarem para "continuar" o código
    .then((pokemonDetails) => pokemonDetails) //pega o resultado do .then anterior
}

