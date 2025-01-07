const container = document.querySelector(".container");
const api = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100";

fetch(api).then((response) => response.json())
    .then((data) => {
        const pokemons = data.results;

        pokemons.forEach((items) => {
            // console.log(items);

            fetch(items.url).then((response) => response.json())
                .then((detail) => {
                    // console.log(detail);

                    const card = document.createElement("div");
                    card.classList.add("card");

                    const img = document.createElement("img");
                    const span = document.createElement("span");

                    img.src = detail.sprites.front_default;
                    span.textContent = detail.name;

                    container.append(card);
                    card.append(img);
                    card.append(span);
                });
        });
    });