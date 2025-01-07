const container = document.querySelector(".container");
const api = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100";


function pokemonData() {
    container.textContent = "Loading data please wait...."
    try {
        fetch(api).then((response) => response.json())
            .then((data) => {
                setTimeout(() => {
                    let results = ""
                    const pokemons = data.results;
                    pokemons.forEach((items) => {
                        fetch(items.url).then((res) => res.json())
                            .then((details) => {
                                const img = details.sprites.other.showdown.front_default;
                                const name = details.name;
                                const ablility = details.abilities[0].ability.name;
                                console.log(ablility);
                                results +=
                                    `
                               <div class="card">
                                    <div class="card-inner">
                                    <div class="card-front">
                                    <img src="${img}" class="mt-5 mb-5 pt-5" alt="Pokemon" width="" height="" />
                                    </div>
                                    <div class="card-back">
                                    <h5>Name:${name}</h5>
                                    <p>Ability:  ${ablility}</p>
                                    </div>
                                    </div>
                               </div>                      
                            `
                                    ;
                                container.innerHTML = results;
                            });
                    });
                });
            }, 3000);
    } catch (error) {
        document.write("error");
        console.log(error);
    }
}

pokemonData();