//You can edit ALL of the code here

const allEpisodes = getAllEpisodes();

const header = document.createElement("div");
let howManyEpisodesDisplayed = document.createElement("p");
const main = document.createElement("div");
const episodesContainer = document.createElement("div");

function setup() {
  makePageForEpisodes(allEpisodes);
};

function makePageForEpisodes(episodeList) {
  // const rootElem = document.getElementById("root"); // ORIGINAL GIVEN CODE

  // Create header div and append to <html>
  header.setAttribute("id", "header");
  html.appendChild(header);
  // Create p element to show how many episodes are currently displayed and append to header
  howManyEpisodesDisplayed.setAttribute("id", "howManyEpisodesDisplayed");
  howManyEpisodesDisplayed.innerText = `Displaying ${episodeList.length} of 73 episode(s)`;
  header.appendChild(howManyEpisodesDisplayed);

  // Create container div for episode grid and append to <main>
  episodesContainer.setAttribute("id", "episodesContainer");
  main.appendChild(episodesContainer);

  // ForEach loop iterates through array of episodes and for each object in the array:
  episodeList.forEach((episode) => {
    // 1. Creates an article element
    let thisEpisode = document.createElement("article");
    thisEpisode.setAttribute("id", "episode");

    // 2a. Creates a h1 element
    let episodeTitle = document.createElement("h1");
    episodeTitle.setAttribute("id", "episodeTitle");
    // 2b. If statement to display episode name, season and number in <h1> with numbers padded to min. 2 digits
    episode["season"] < 10
      ? (episodeTitle.innerText = `${episode["name"]} - S0${episode["season"]}E${episode["number"]}`)
      : (episodeTitle.innerText = `${episode["name"]} - S${episode["season"]}E${episode["number"]}`);
    episode["number"] < 10
      ? (episodeTitle.innerText = `${episode["name"]} - S0${episode["season"]}E0${episode["number"]}`)
      : (episodeTitle.innerText = `${episode["name"]} - S0${episode["season"]}E${episode["number"]}`);
    // 2c. Appends <h1> to article
    thisEpisode.appendChild(episodeTitle);

    // 3a. Creates an img element to show episode thumb
    let thumb = document.createElement("img");
    thumb.setAttribute("id", "thumb");
    // 3b. Sets <img> src to episode medium image
    thumb.src = episode["image"]["medium"];
    // 3c. Appends <img> to article
    thisEpisode.appendChild(thumb);

    // 4a. Creates a p element to show episode summary
    let episodeSummary = document.createElement("p");
    episodeSummary.setAttribute("id", "episodeSummary");
    // 4b. Sets <p> text to summary paragraph
    episodeSummary.innerText = episode["summary"]
      .replace("<p>", "")
      .replace("</p>", "");
    // 4c. Appends <p> to article
    thisEpisode.appendChild(episodeSummary);

    // 5. Appends article to container div
    episodesContainer.appendChild(thisEpisode);
  });

  // Create main div and append to <html>
  main.setAttribute("id", "main");
  html.appendChild(main);
}

// Create search box and live search functionality
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

function createFooter() {
  // Create footer div and append to <html>
  const footer = document.createElement("div");
  footer.setAttribute("id", "footer");
  html.appendChild(footer);
  // Create p element to give credit to TVMaze.com and append to footer
  let credit = document.createElement("p");
  credit.innerText = "All data sourced from ";
  footer.appendChild(credit);
  // Create link element to link to TVMaze.com (open in new tab) and append to <p>
  let tvmaze = document.createElement("a");
  tvmaze.setAttribute("target", "_blank");
  tvmaze.innerText = "TVMaze.com";
  tvmaze.href = "https://www.tvmaze.com/";
  credit.appendChild(tvmaze);
}

searchFunctionality();

window.onload = setup;
