const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('btnLoadMore')
const section = document.getElementById('content')

const maxRecords = 151
const limit = 3;
let offset = 0;

function loadPokemonItens (offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" onclick="viewPokemonDetail()">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">
                </div>
            </li>
        `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

// Click events
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function viewPokemonDetail() {
    location.href = "pokemon-detail.html";
}

function viewPokemonDetails() {
    //OPÇÃO 1: mudar o Body todo
    // pegar details
    // const newBody = `
    //     <div>
    //         <span>${pokemon.name}</span>
    //         <span>#${pokemon.number}</span>
    //         <ol class="types">
    //             ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
    //         </ol>
    //         <img src="${pokemon.photo}" 
    //         alt="${pokemon.name}">
    //         <div>
    //             <span>About</span>
    //             <table>
    //                 <tbody>
    //                     <tr>Species</tr>
    //                     <td>Seed</td>
    //                     <tr>Abilities</tr>
    //                     <td>Overgrow, Chlorophyl</td>
    //                     <tr>Gender</tr>
    //                     <td>Male</td>
    //                 </tbody>
    //             </table>
    //         </div>
    //     </div>
    // `;
        
        // body.innerHTML = newBody;
    section.innerHTML = `
        <div class="bodytest"></div>
    `
}
