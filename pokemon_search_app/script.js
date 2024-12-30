const pokemon_field = document.querySelector("#search-input");
const submit_pokemon = document.querySelector("#search-button");
const poke_name = document.querySelector("#pokemon-name");
const poke_id = document.querySelector("#pokemon-id");
const weight = document.querySelector("#weight");
const height = document.querySelector("#height");
const sprites = document.querySelector("#sprite-placement");
const types = document.querySelector("#types");
const hp = document.querySelector("#hp");
const attack = document.querySelector("#attack");
const defense = document.querySelector("#defense");
const speed = document.querySelector("#speed");
const special_attack = document.querySelector("#special-attack");
const special_defense = document.querySelector("#special-defense");

const stats_array = [poke_name, poke_id, weight, height, sprites, types, hp, attack, defense, speed, special_attack, special_defense];


async function display_pokemon_data() {
  try {
    const pokemon_query = pokemon_field.value.toLowerCase();
    const fetched_json = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon_query}`);
    const fetched_data = await fetched_json.json();

    sprites.innerHTML = `<img id="sprite" src=${fetched_data.sprites.front_default}>`;
    poke_name.innerHTML = `${fetched_data.name.toUpperCase()}`;
    poke_id.innerHTML = `#${fetched_data.id}`;
    weight.innerHTML = `Weight: ${fetched_data.weight}`;
    height.innerHTML = `Height: ${fetched_data.height}`;

    hp.innerHTML = fetched_data.stats[0].base_stat;
    attack.innerHTML = fetched_data.stats[1].base_stat;
    defense.innerHTML = fetched_data.stats[2].base_stat;
    speed.innerHTML = fetched_data.stats[5].base_stat;
    special_attack.innerHTML = fetched_data.stats[3].base_stat;
    special_defense.innerHTML = fetched_data.stats[4].base_stat;

    types.innerHTML = fetched_data.types
      .map(obj => `<span>${obj.type.name}</span>`)
      .join('');

  }
  catch(error) {
    alert("Pokémon not found");
    console.log(`${error}`);
    reset_delay();
  }
}

function reset_delay() {
  for(stat of stats_array) {
    stat.innerHTML = `&nbsp;`;
  }
}

submit_pokemon.addEventListener('click', () => {
  display_pokemon_data();
});