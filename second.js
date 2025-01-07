const container = document.querySelector(".container");
const api = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100";

function pokemonData() {
    container.textContent = "Loading data please wait....";
    try {
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                let results = "";
                const pokemons = data.results;
                const promises = pokemons.map((items) =>
                    fetch(items.url)
                        .then((res) => res.json())
                        .then((details) => {
                            const img = details.sprites.other["official-artwork"].front_default;
                            const name = details.name;
                            const ability = details.abilities[0].ability.name;

                            results += `
                               <div class="card" data-aos="flip-right">
                                    <div class="card-inner">
                                        <div class="card-front">
                                            <img src="${img}" alt="${name}" />
                                            <span>${name}</span>
                                        </div>
                                        <div class="card-back">
                                            <h5>Name: ${name}</h5>
                                            <p>Ability: ${ability}</p>
                                        </div>
                                    </div>
                               </div>`;
                        })
                );

                Promise.all(promises).then(() => {
                    container.innerHTML = results;

                    AOS.refresh();
                });
            });
    } catch (error) {
        container.textContent = "An error occurred. Please try again.";
        console.error(error);
    }
}

pokemonData();
