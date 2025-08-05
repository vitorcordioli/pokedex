
//ArrowFunction se tiver somente uma linha de cóodigo não precisa de chaves

//Interface da Promise foi baseada em um trycatch finally
/*try {
    
} catch (error) {
    
} finally {

}*/

/*function convertPokemonTypeToLi(pokemonType) {
    return pokemonType.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`) //mapeia o pokemonType e percorre o caminho de .type.name, pega o tipo e retorna em li
}*/
//na function ficava convertPokemonTypeToLi(pokemon.types).join('')

const pokemonOl = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const limit = 10
let offset = 0 
const maxRecords = 151

//pega as infromações da função do outro arquivo e faz uma function

function loadPokemonItens(offset, limit) {
    function convertPokemonLi(pokemon) {

        return `<li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    
                    <div class="detail">
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class=" type ${type} ">${type}</li>`).join('')} 
                    </ol>
                    
                    <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
                    </div>
                    
                    </li>`
    
    }
    
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        const newHtml = pokemonList.map(convertPokemonLi).join('') //declara a variavel newHtml, que recebe o resultado que veio do outro arquivo .js, mapeia ele e converte ele para html, por meio da função acima, depois junta todos os resultados com .join
        pokemonOl.innerHTML += newHtml //substitui o conteudo dentro de pokemonOl pelo conteudo do newHtml
    })
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {    
    offset += limit
    const atualRecord = offset + limit

    if (atualRecord >= maxRecords) {
        const newLimit =  maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }   
})