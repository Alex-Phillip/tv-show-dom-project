// Create variable containing episodes object
const allEpisodes = getAllEpisodes();

// Create function to call makePagesForEpisodes(#.) on allEpisodes(#.) on first page load(#.)   
function setup() {
  makePageForEpisodes(allEpisodes);
}

// Create variable link to header
const header = document.getElementById("header");
// Create variable link to main <div>
const main = document.getElementById("main");
// Create variable link to container <div>
let episodesContainer = document.getElementById("episodesContainer");
// Create variable link to footer
const footer = document.getElementById("footer");

// Create input box and add live search functionality,
let searchFunctionality = () => {
  const searchBox = document.createElement("input");
  searchBox.setAttribute("id", "searchBox");
  searchBox.setAttribute("type", "search");
  searchBox.setAttribute("placeholder", "Search...");
  header.appendChild(searchBox);

  searchBox.addEventListener("input", (event) => {
    searchTerm = event.target.value.toLowerCase();
    let results = allEpisodes.filter((episode) => {
      return (
        episode["name"].toLowerCase().includes(searchTerm) ||
        episode["summary"].toLowerCase().includes(searchTerm)
      );
    });

    let clearPage = document.getElementById("episodesContainer");
    clearPage.innerHTML = "";
    
    makePageForEpisodes(results);
  });
};

// Create dropdown menu single episode selection functionality
for (let key of allEpisodes) {
  let option = document.createElement("option");
  option.setAttribute("value", key.name);

  option.innerText = `S${key.season.toString().padStart(2, 0)}E${key.number
    .toString()
    .padStart(2, 0)} - ${key["name"]}`;

  episodesDropdown.appendChild(option);
}

episodesDropdown.addEventListener("change", (episode) => {
  let currentEpisode = allEpisodes.filter((e) => {
    return episode.target.value === e.name;
  });

  let clear = document.getElementById("episodesContainer");
  clear.innerHTML = "";
  episode.target.value === "show-all-episodes"
    ? makePageForEpisodes(allEpisodes)
    : makePageForEpisodes(currentEpisode);
});

// Create <p> element to dynamically display how many of the total episodes are shown(#.),
let howManyEpisodesDisplayed = document.createElement("p");
// and set id
howManyEpisodesDisplayed.setAttribute("id", "howManyEpisodesDisplayed");

// Create <p> element to give credit to TVMaze.com,
let credit = document.createElement("p");
credit.innerText = "All data sourced from ";
// create <a> element to link text to TVMaze.com (open in new tab),
let tvmaze = document.createElement("a");
tvmaze.innerText = "TVMaze.com";
tvmaze.href = "https://www.tvmaze.com/";
tvmaze.setAttribute("target", "_blank");
// and append to <p>,
credit.appendChild(tvmaze);
// and append <p> to footer
footer.appendChild(credit);

// Create function to display episode(s):
function makePageForEpisodes(allEpisodes) {
  // Set text content to display how many of the total episodes are on shown(#.),
  howManyEpisodesDisplayed.innerText = `Displaying ${allEpisodes.length} of 73 episode(s)`;
  // and append to header
  header.appendChild(howManyEpisodesDisplayed);

  // Iterate through the episodes object, and for each episode,
  allEpisodes.forEach((episode) => {

    // Create an <article> element to display episode information and image,
    let thisEpisode = document.createElement("article");
    // and set id
    thisEpisode.setAttribute("id", "episode");

    // Create a <h1> element to display episode title,
    let episodeTitle = document.createElement("h1");
    // and set id,
    episodeTitle.setAttribute("id", "episodeTitle");
    // and set text to display episode name, season and number (numbers padded with "0" to min. 2 digits)
    episode["season"] < 10
      ? (episodeTitle.innerText = `${episode["name"]} - S0${episode["season"]}E${episode["number"]}`)
      : (episodeTitle.innerText = `${episode["name"]} - S${episode["season"]}E${episode["number"]}`);
    episode["number"] < 10
      ? (episodeTitle.innerText = `${episode["name"]} - S0${episode["season"]}E0${episode["number"]}`)
      : (episodeTitle.innerText = `${episode["name"]} - S0${episode["season"]}E${episode["number"]}`);
    // and append to <article>
    thisEpisode.appendChild(episodeTitle);

    // Create an <img> element to display episode thumbnail,
    let thumb = document.createElement("img");
    // and set id,
    thumb.setAttribute("id", "thumb");
    // and set src to medium image,
    thumb.src = episode["image"]["medium"];
    // and append to <article>
    thisEpisode.appendChild(thumb);

    // Create a <p> element to display episode summary,
    let episodeSummary = document.createElement("p");
    // and set id,
    episodeSummary.setAttribute("id", "episodeSummary");
    // and set text to summary paragraph (cutting out "<p>" tags),
    episodeSummary.innerText = episode["summary"]
      .replace("<p>", "")
      .replace("</p>", "");
    // and append to <article>
    thisEpisode.appendChild(episodeSummary);

    // Append <article> to container <div>(#.)
    episodesContainer.appendChild(thisEpisode);
  });
};

// Call live search function(#.)
searchFunctionality();

// Call setup function(#) on first page load 
window.onload = setup;