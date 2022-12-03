async function getMovies() {
    const response = await fetch("./assets/js/movies.json");
    const moviesJson = await response.json();
    for(let movie of moviesJson.movies){
        document.querySelector(".cards-container")
            .appendChild(createCard(movie));
    }
} 

function createCard(movie) {
    let card = document.createElement("article");
    card.classList.add("card");
    
    let header = cardHeader(movie.poster.src, movie.poster.alt);
    let body = cardBody(movie.title,movie.releaseYear, movie.cast, movie.director, movie.plot, movie.genre);
    let footer = cardFooter(movie.trailer);

    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(footer);
    return card;
}


function cardHeader(posterSrc, posterAlt){
    let header = document.createElement("header");
    header.classList.add("card__header");

    let image = document.createElement("img");
    image.src = posterSrc;
    image.alt = posterAlt;
    
    header.appendChild(image);
    return header;
}

function cardBody(title, releaseYear, cast, director, plot, tags){
    let body = document.createElement("div");
    body.classList.add("card__body");

    let info = document.createElement("div");
    info.classList.add("card__info");

    let heading = createTextElement("h2", `${title} — ${releaseYear}`, ["card__heading"]);
    let castListing = createTextElement("p", cast, ["card__cast"]);
    let directorListing = createTextElement("p", `Directed by ${director}`, ["card__director"]);
    let plotListing = createTextElement("p", plot, ["card__plot"]);


    info.appendChild(heading);
    info.appendChild(castListing);
    info.appendChild(plotListing);
    info.appendChild(directorListing);

    let tagsList = document.createElement("ul");
    tagsList.classList.add("tags");

    for (let tag of tags){
        let tagsListItem = createTextElement("li", tag, ["tags__item"]);
        tagsList.appendChild(tagsListItem);
    }

    body.appendChild(info);
    body.appendChild(tagsList);
    return body;
}

function cardFooter(trailerLink) {
    let footer = document.createElement("footer");
    let link = createTextElement("a", "imdb", ["card__footer__link", "link"]);

    footer.classList.add("card__footer");
    link.setAttribute("href", trailerLink);
    link.setAttribute("target", "_blank");
    
    footer.appendChild(document.createTextNode("View trailer on "));
    footer.appendChild(link);
    return footer;
}

function createTextElement(htmlTag, text, cssClass) {
    let element = document.createElement(htmlTag);
    for (let el of cssClass){
        element.classList.add(el);
    }

    element.appendChild(document.createTextNode(text));
    return element;
}

getMovies().catch((error) => {
    console.error(error);
});