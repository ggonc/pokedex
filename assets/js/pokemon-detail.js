function back() {
    location.href = "index.html";
}

const pokemonDetail = document.getElementById('pokemon-detail')

function getPokemonDetail(pokemonId) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(response => response.json())
    .then(data => convertPokeApiDetailToPokemon(data))
    .catch(error => console.error(error));
}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types
    pokemon.types = types 
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.home.front_default;
    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    const [ability] = abilities
    pokemon.abilities = abilities;
    pokemon.ability = ability;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;

    return pokemon;
}

function loadPokemonDetail(id) {
    getPokemonDetail(id)
        .then(newPokemon => {
            console.log(newPokemon);
            const newHtml = `
            <section id="pokemon-detail" class="pokemon-detail ${newPokemon.type}">
            
                <!-- NAVIGATION -->
                <div class="navigation">
                    <button class="btn-return" onclick="back()">←</button>
                </div>

                <!-- MAIN INFO -->
                <div class="main-info">
                    <h1>${newPokemon.name}</h1>
                    <span>#${newPokemon.number}</span>
                    <ol class="types">
                        ${newPokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${newPokemon.photo}"
                        alt="${newPokemon.name}">
                </div>

                <!-- SECONDARY INFO -->
                <div class="secondary-info">
                    <span>About</span>
                    <div class="about-content">
                        <span class="about-info-title">Abilities</span>
                        <span class="about-info-content">${newPokemon.abilities.map((ability) => `${ability}`).join(', ')}</span>
                        <span class="about-info-title">Height</span>
                        <span class="about-info-content">${newPokemon.height}</span>
                        <span class="about-info-title">Weight</span>
                        <span class="about-info-content">${newPokemon.weight}</span>
                    </div>
                </div>
            </section>
            `;
            document.body.innerHTML += newHtml;
        })
        .catch(error => console.error(error));
}

loadPokemonDetail(1);

