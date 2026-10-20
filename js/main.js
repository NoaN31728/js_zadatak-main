import {filmovi} from "./podaci.js";

const list = document.querySelector("#list");
const brojac = document.querySelector("#brojac");
const empty = document.querySelector("#empty");
const loading = document.querySelector("#loading");

function createCard(film) {
    const card = document.createElement("article");
    card.classList.add("kartica");
    card.dataset.id = film.id;

    if (film.year >= 2025) {
        card.classList.add("istaknuto");
    }

    const img = document.createElement("img");
    img.src = film.image;
    img.alt = film.name;

    const content = document.createElement("div");
    content.classList.add("kartica-sadrzaj");

    const title = document.createElement("h2");
    title.textContent = film.name;

    const year = document.createElement("p");
    year.textContent = `Godina: ${film.year}`;
    year.classList.add("vrijednost");

    const link = document.createElement("a");
    link.href = `https://www.themoviedb.org`;
    link.textContent = "Više informacija";
    link.target = "_blank";

    content.appendChild(title);
    content.appendChild(year);
    content.appendChild(link);
    card.appendChild(img);
    card.appendChild(content);

    return card;
}

function render(items) {
    list.innerHTML = "";

    const fragment = document.createDocumentFragment();
    for (const item of items) {
        fragment.append(createCard(item));
    }
    list.append(fragment);

    brojac.textContent = `Prikazano zapisa: ${items.length}`;
    loading.classList.add("hidden");
    empty.classList.toggle("hidden", items.length > 0);
}

const mains = filmovi
    .filter(film => film.category === "Horror")
    .sort((a, b) => a.year - b.year);

render(mains);

loading.remove