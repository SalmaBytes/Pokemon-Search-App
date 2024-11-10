// Elements
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const spriteContainer = document.getElementById("sprite-container");
const pokemonDetails = {
  name: document.getElementById("pokemon-name"),
  id: document.getElementById("pokemon-id"),
  weight: document.getElementById("weight"),
  height: document.getElementById("height"),
  types: document.getElementById("types"),
  hp: document.getElementById("hp"),
  attack: document.getElementById("attack"),
  defense: document.getElementById("defense"),
  specialAttack: document.getElementById("special-attack"),
  specialDefense: document.getElementById("special-defense"),
  speed: document.getElementById("speed")
};

// Fetch Pokémon data
const fetchPokemonData = async () => {
  try {
    const pokemonNameOrId = searchInput.value.trim().toLowerCase();
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`);
    if (!response.ok) throw new Error("Pokémon not found");
    return await response.json();
  } catch (error) {
    displayError(error.message);
  }
};

// Display error message
const displayError = (message) => {
  searchInput.value = "";
  spriteContainer.innerHTML = `<p class="error">${message}</p >`;
  resetDisplay();
};

// Update Display
const updateDisplay = (data) => {
  pokemonDetails.name.textContent = data.name.toUpperCase();
  pokemonDetails.id.textContent = `ID: ${data.id}`;
  pokemonDetails.weight.textContent = `Weight: ${data.weight}`;
  pokemonDetails.height.textContent = `Height: ${data.height}`;
  spriteContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">`;
  pokemonDetails.types.innerHTML = data.types.map(type => `<span class="type ${type.type.name}">${type.type.name}</span>`).join("");

  const stats = data.stats.reduce((acc, stat) => ({ ...acc, [stat.stat.name]: stat.base_stat }), {});
  pokemonDetails.hp.textContent = stats.hp;
  pokemonDetails.attack.textContent = stats.attack;
  pokemonDetails.defense.textContent = stats.defense;
  pokemonDetails.specialAttack.textContent = stats['special-attack'];
  pokemonDetails.specialDefense.textContent = stats['special-defense'];
  pokemonDetails.speed.textContent = stats.speed;
};

// Clear Display
const resetDisplay = () => {
  Object.values(pokemonDetails).forEach(el => el.textContent = '');
  spriteContainer.innerHTML = '';
};

// Form Submission
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!searchInput.value.trim()) return alert("Please enter a Pokémon name or ID");
  const data = await fetchPokemonData();
  if (data) updateDisplay(data);
});
