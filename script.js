// Create variable containing episodes object
const allEpisodes = getAllEpisodes();
let allShows = getAllShows().sort((a, b) =>
  a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  );

// Create function to call makePagesForEpisodes(#.) on allEpisodes(#.) on first page load(#.)
function setup() {
  makePageForShows(allShows);
}

// Create variable link to shows dropdown
const showsDropdown = document.getElementById("showsDropdown");

// Create variable link to header
const header = document.getElementById("header");
// Create variable link to main <div>
const main = document.getElementById("main");
// Create variable link to container <div>
let episodesContainer = document.getElementById("episodesContainer");
// Create variable link to footer
const footer = document.getElementById("footer");

// Create input box and add live search functionality,
let searchFunctionality = (e) => {
  // const searchBox = document.createElement("input");
  // searchBox.setAttribute("id", "searchBox");
  searchBox.setAttribute("type", "search");
  searchBox.setAttribute("placeholder", "Search...");
  header.appendChild(searchBox);

  searchBox.addEventListener("input", (event) => {
    searchTerm = event.target.value.toLowerCase();
    let results = e.filter((episode) => {
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

// Populate shows dropdown menu and add single show selection functionality
function showsDropdownMenu(s) {
  for (let key of s) {
    let option = document.createElement("option");
    option.setAttribute("value", key.id);
    console.log(option.value);
    option.innerText = `${key["name"]}`;

    showsDropdown.appendChild(option);
  }

  showsDropdown.addEventListener("change", (show) => {
    let showID = show.target.value;

    let clear = document.getElementById("episodesContainer");
    clear.innerHTML = "";

    show.target.value === "showAllShows"
      ? makePageForShows(s)
      : fetchData(showID);
  });
}
showsDropdownMenu(allShows);

// Populate episodes dropdown menu and add single episode selection functionality ("episodesDropdown" created directly in html)
function episodesDropdownMenu(e) {
  episodesDropdown.innerHTML = "";

  for (let key of e) {
    let option = document.createElement("option");
    option.setAttribute("value", key.name);

    option.innerText = `S${key.season.toString().padStart(2, 0)}E${key.number
      .toString()
      .padStart(2, 0)} - ${key["name"]}`;

    episodesDropdown.appendChild(option);
  }

  episodesDropdown.addEventListener("change", (episode) => {
    let currentEpisode = e.filter((ep) => {
      return episode.target.value === ep.name;
    });

    let clear = document.getElementById("episodesContainer");
    clear.innerHTML = "";
    episode.target.value === "showAllEpisodes"
      ? makePageForEpisodes(e)
      : makePageForEpisodes(currentEpisode);
  });
}
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
// and append <a> to <p>,
credit.appendChild(tvmaze);
// and append <p> to footer
footer.appendChild(credit);

// Fetch data from API and call makePage, dropdown and searchbox functionality
function fetchData(show) {
  fetch("https://api.tvmaze.com/shows/" + show + "/episodes")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      makePageForEpisodes(data);
      episodesDropdownMenu(data);
      searchFunctionality(data);
    });
};

// Create function to display episode(s):
function makePageForShows(allEpisodes) {
  // Create variable link to shows dropdown,
  let episodesDropdownMenu = document.getElementById("episodesDropdown");
  // and hide from screen
  episodesDropdownMenu.style.display = "none";

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
    // and set text to display show name
    episodeTitle.innerText = `${episode["name"]}`
    episodeTitle.value = episode.id
    // and append to <article>
    thisEpisode.appendChild(episodeTitle);
    episodeTitle.addEventListener("click", () => {
      let clearShows = document.getElementById("episodesContainer");
      clearShows.innerHTML = "";
      fetchData(episodeTitle.value);
    })

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
    episodeSummary.innerHTML = episode["summary"];
    // and append to <article>
    thisEpisode.appendChild(episodeSummary);

    // Create a <p> element to display episode genre,
    let episodeGenre = document.createElement("p");
    // and set id,
    episodeGenre.setAttribute("id", "episodeGenre");
    // and set text to summary paragraph (cutting out "<p>" tags),
    episodeGenre.innerHTML = `Genre: ${episode["genres"]}`;
    // and append to <article>
    thisEpisode.appendChild(episodeGenre);

    // Create a <p> element to display episode rating,
    let episodeRating = document.createElement("p");
    // and set id,
    episodeRating.setAttribute("id", "episodeRating");
    // and set text to summary paragraph (cutting out "<p>" tags),
    episodeRating.innerHTML = `Rating: ${episode["rating"]["average"]}`;
    // and append to <article>
    thisEpisode.appendChild(episodeRating);

    // Create a <p> element to display episode runtime,
    let episodeRuntime = document.createElement("p");
    // and set id,
    episodeRuntime.setAttribute("id", "episodeRuntime");
    // and set text to summary paragraph (cutting out "<p>" tags),
    episodeRuntime.innerHTML = `Runtime: ${episode["runtime"]}`;
    // and append to <article>
    thisEpisode.appendChild(episodeRuntime);

    // Create a <p> element to display episode status,
    let episodeStatus = document.createElement("p");
    // and set id,
    episodeStatus.setAttribute("id", "episodeStatus");
    // and set text to summary paragraph (cutting out "<p>" tags),
    episodeStatus.innerHTML = `Status: ${episode["status"]}`;
    // and append to <article>
    thisEpisode.appendChild(episodeStatus);

    // Append <article> to container <div>(#.)
    episodesContainer.appendChild(thisEpisode);
  });
};

// Create function to display episode(s):
function makePageForEpisodes(allEpisodes) {
  // Create variable link to shows dropdown,
  let episodesDropdownMenu = document.getElementById("episodesDropdown");
  // and unhide
  episodesDropdownMenu.style.display = "flex";

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
    episodeSummary.innerHTML = episode["summary"];
    // and append to <article>
    thisEpisode.appendChild(episodeSummary);

    // Append <article> to container <div>(#.)
    episodesContainer.appendChild(thisEpisode);
  });
}

// Call live search function(#.)
searchFunctionality();

// Call setup function(#) on first page load
window.onload = setup;
