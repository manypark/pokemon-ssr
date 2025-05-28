const TOTAL_POKEMONS = 10;
const TOTAL_PAGES = 10;
const TOTAL_NAME_POKEMONS = 20;

( async () => {

    const fs = require('fs');

    // Pokemons por Id
    const pokemonsId = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
    let fileContent = pokemonsId.map( id => `/pokemons/${id}` ).join('\n');

    // Paginas de pokemons
    const pokemonsPagesId = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);
    fileContent += '\n' + pokemonsPagesId.map( id => `/pokemons/pages/${id}` ).join('\n');

    // Por nombres por pokemon
    const pokemonNameList = await fetch('https://pokeapi.co/api/v2/pokemon?limit=' + TOTAL_NAME_POKEMONS).then( res => res.json() );
    fileContent += '\n' + pokemonNameList.results.map( pokemon => `/pokemons/${pokemon.name}`).join('\n');

    fs.writeFileSync( 'routes.txt', fileContent );

})();